# Contribution Guidelines
## Sign all of your Git Commits

Whenever you make a commit, it is required to be signed. If you do not, you will have to re-write the git history to get all commits signed before they can be merged, which can be quite a pain.

Use the "-s" or "--signoff" flags to sign a commit.

Example calls:
* `git commit -s -m "Adding a test file to new_branch"`
* `git commit --signoff -m "Adding a test file to new_branch"`

Why? Sign-off is a line at the end of the commit message which certifies who is the author of the commit. Its main purpose is to improve tracking of who did what, especially with patches.

Example commit in git history:

```
Add tests for the payment processor.

Signed-off-by: Humpty Dumpty <humpty.dumpty@example.com>
```

What to do if you forget to sign off on a commit?

To sign old commits: `git rebase --exec 'git commit --amend --no-edit --signoff' -i <commit-hash>`

where commit hash is one before your first commit in history

If you forget to signoff on a commit, you'll likely receive the following message:

"Commit message must be signed off with your user name and email.
To sign off your commit, add the -s flag to the git commit command."

---

## Contribution Instructions

To contribute your Plug-in's information to this repository, reference the [README](./README.md) file and follow the instructions for [Installing Dependencies](./README.md#Installing) and [Contributing to the Web Help](./README.md#Using---Contributing-to-the-Web-Help).