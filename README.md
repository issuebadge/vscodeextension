# IssueBadge - Bulk Certificate Issuing from Vscode

[![IssueBadge Demo](https://img.youtube.com/vi/0FO5qSq1EtM/0.jpg)](https://youtu.be/0FO5qSq1EtM)

Issue digital badges and certificates directly from your VS Code editor in minutes.

---

## Prerequisites

- An IssueBadge account
- The IssueBadge VS Code extension installed
- Your API key from IssueBadge

---

## Setup Steps

1) Sign up
- Visit: https://issuebadge.com
- Create your account and log in

2) Create a Badge
- From your IssueBadge dashboard, create a new badge/certificate
- Customize name, description, criteria, visual design, and issuer info

3) Get API Key
- In IssueBadge, go to Settings → API Key
- Generate and copy your API key

4) Install the VS Code Extension
- Extension: IssueBadge
- Marketplace link: https://marketplace.visualstudio.com/items?itemName=issuebadge.issuebadge

---

## Using IssueBadge in VS Code

Open the Command Palette:
- Windows/Linux: Ctrl+Shift+P
- macOS: Cmd+Shift+P

Available commands:
- issuebadge: Set Api Key
- issuebadge: Refresh Badge
- issuebadge: Send Badge

Step-by-step:
1) Set your API key
   - Run: issuebadge: Set Api Key
   - Paste the API key you copied from IssueBadge

2) Load your badges
   - Run: issuebadge: Refresh Badge
   - This fetches all badges tied to your account

3) Issue a badge
   - Run: issuebadge: Send Badge
   - Enter recipient name and email when prompted
   - The badge/certificate will be sent immediately

Pro tip:
- Keep your badges organized on IssueBadge (e.g., “Course Completion”, “Sprint Hero”, “Open Source Contributor”)

---

## Quick Commands (for reference)

```text
Ctrl+Shift+P (Cmd+Shift+P on macOS)

issuebadge: Set Api Key
issuebadge: Refresh Badge
issuebadge: Send Badge


VS Code User Stories (Emotional Use Cases)
The Mentor’s Moment
You’ve just finished a weekly pair-programming session with a junior dev who finally cracked test-driven development. Right there in VS Code, you trigger issuebadge: Send Badge and award a “TDD Breakthrough” badge. The email lands in their inbox before the meeting ends—tangible recognition that boosts confidence and keeps them motivated for the next sprint.
The Hackathon Night Owl
It’s 2 AM, the team just shipped a prototype. You’re merging the last PR and want to recognize the contributors. Using issuebadge: Refresh Badge and Send Badge, you award “Hackathon Finisher” badges to everyone who pushed code. No emails later, no forms—just instant appreciation while the adrenaline is still high.
The Classroom in a Repo
As a bootcamp instructor, you manage assignments through a GitHub repo and grade them in VS Code. For each milestone, you issue a “Module Completion” badge right from the editor. Students get immediate confirmation emails, and your class culture shifts toward celebration of progress, not just grades.



FAQ
Q: What happens to the recipient’s email?

We store it to deliver the badge and enable future verification. On the free tier, we keep it as part of the issuance record.
On paid plans, you control the handling:
Encryption option: We can encrypt emails in the database using a per-account salt so only your account can access the clear-text.
Deletion option: Ask us to delete recipient emails after delivery and verification; we’ll retain only anonymized issuance records if desired.
Retention controls: Configure how long emails are retained. We support flexible policies.
Access control: Only authorized users on your account can view recipient data.
Q: Can I revoke or reissue a badge?

Yes, manage badges in the IssueBadge dashboard. Revocations and reissues are supported.
Q: Do recipients need an IssueBadge account?

No. Recipients receive a link via email to view and verify their badge/certificate.
Q: Can I customize the badge design?

Yes. Use the IssueBadge dashboard to customize visuals, issuer info, metadata, and criteria.
Q: Does the VS Code extension require internet?

Yes. It needs network access to fetch badges and issue them using your API key.


Troubleshooting
“No badges found” after Refresh:

Ensure you have created at least one badge on https://issuebadge.com
Confirm your API key is valid and correctly set via issuebadge: Set Api Key
“Unauthorized” or “API key invalid”:

Regenerate the key in IssueBadge → Settings → API Key
Paste the new key via issuebadge: Set Api Key
Badge email not received:

Ask the recipient to check spam/junk
Verify the email address format when issuing
Confirm sending limits or status in your IssueBadge dashboard
Privacy and Data Controls (Paid Plans)
Encryption with salt per account for recipient emails
Configurable retention and deletion policies
Option to purge emails post-issuance upon request
Role-based access control for your team
Audit logs available upon request
Contact support via your IssueBadge dashboard for custom policies.


Helpful Links
Sign up: https://issuebadge.com
VS Code extension: https://marketplace.visualstudio.com/items?itemName=issuebadge.issuebadge
Demo video: https://youtu.be/0FO5qSq1EtM

