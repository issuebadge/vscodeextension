import * as vscode from 'vscode';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const BASE = 'https://app.issuebadge.com/api/v1';
const KEY_STORAGE = 'issuebadge.apiKey';

let badgeCache: { id: string; name: string }[] = [];

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('issueBadge.setApiKey', () => setApiKey(context)),
    vscode.commands.registerCommand('issueBadge.getBadges', () => getBadges(context)),
    vscode.commands.registerCommand('issueBadge.sendBadge', () => sendBadge(context))
  );
}

async function getApiKey(ctx: vscode.ExtensionContext): Promise<string | undefined> {
  return ctx.globalState.get<string>(KEY_STORAGE);
}

async function setApiKey(ctx: vscode.ExtensionContext) {
  const key = await vscode.window.showInputBox({
    prompt: 'Enter your IssueBadge API key',
    ignoreFocusOut: true,
    password: true
  });

  if (!key) {
    vscode.window.showErrorMessage('API key not entered');
    return;
  }

  const resp = await fetch(`${BASE}/validate-key`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}` }
  });

  const json = await resp.json();

  if (json.success) {
    await ctx.globalState.update(KEY_STORAGE, key);
    vscode.window.showInformationMessage(`✅ API key is valid: Welcome ${json.user.name}`);
  } else {
    vscode.window.showErrorMessage(`❌ Invalid API key: ${json.message}`);
  }
}

async function getBadges(ctx: vscode.ExtensionContext) {
  const key = await getApiKey(ctx);
  if (!key) {
    vscode.window.showErrorMessage('✨ Please set your API key first');
    return;
  }

  const resp = await fetch(`${BASE}/badge/getall`, {
    headers: { Authorization: `Bearer ${key}` }
  });

  const json = await resp.json();

  if (!json.success) {
    vscode.window.showErrorMessage(`❌ Failed to fetch badges: ${json.message}`);
    return;
  }

  badgeCache = json.data.map((b: any) => ({ id: b.id, name: b.name }));
  vscode.window.showInformationMessage(`🏅 ${badgeCache.length} badges loaded`);
}

async function sendBadge(ctx: vscode.ExtensionContext) {
  const key = await getApiKey(ctx);
  if (!key) {
    vscode.window.showErrorMessage('✨ Please set your API key first');
    return;
  }

  if (badgeCache.length === 0) {
    await getBadges(ctx);
    if (badgeCache.length === 0) {
      vscode.window.showErrorMessage('No badges available');
      return;
    }
  }

  const pick = await vscode.window.showQuickPick(
    badgeCache.map(b => ({ label: b.name, description: b.id })),
    { placeHolder: 'Select a badge to send' }
  );

  if (!pick) return;

  const name = await vscode.window.showInputBox({ prompt: 'Recipient name' });
  if (!name) return;

  const email = await vscode.window.showInputBox({ prompt: 'Recipient email' });
  if (!email) return;

  const payload = {
    name,
    badge_id: pick.description,
    email,
    idempotency_key: uuidv4()
  };

  const resp = await fetch(`${BASE}/badge/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const json = await resp.json();

  if (json.success) {
    vscode.window.showInformationMessage(`✅ Badge sent to ${name} (${email})`);
  } else {
    vscode.window.showErrorMessage(`❌ Send failed: ${json.message}`);
  }
}
