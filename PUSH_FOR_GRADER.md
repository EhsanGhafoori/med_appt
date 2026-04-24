# Push this project to the repo names the autograder expects

Your code already lives on **`stayhealthy`**. Some Coursera checks require **different repo names** for different questions.

## 1) `med_appt` (many `.jsx` / `index.html` URL questions)

On GitHub: create an **empty public** repo named **`med_appt`** (no README, no .gitignore wizard files).

Windows (PowerShell), from this folder after creating the repo on GitHub:

```powershell
.\push-grader-repos.ps1
```

Or manually:

```bash
cd stayhealthy
git remote add med_appt https://github.com/EhsanGhafoori/med_appt.git
git push -u med_appt main
```

(Use `git push -u med_appt main --force` only if you intentionally replace what is there.)

## 2) `grihf-frontend_capstone_starter_code` (README URL — Task 4)

Create an **empty public** repo with this **exact** name (copy/paste to avoid typos):

`grihf-frontend_capstone_starter_code`

```bash
git remote add grihf https://github.com/EhsanGhafoori/grihf-frontend_capstone_starter_code.git
git push -u grihf main
```

## 3) Keep `stayhealthy` (optional)

```bash
git push -u origin main
```

After pushing, use the URLs in **`ALL_SUBMISSION_ANSWERS.txt`**.
