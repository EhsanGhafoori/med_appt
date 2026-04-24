# Push current branch to GitHub mirrors the Coursera autograder expects.
# Prerequisite: create EMPTY public repos on GitHub (no README/license):
#   - med_appt
#   - grihf-frontend_capstone_starter_code
# Then run from repo root:  .\push-grader-repos.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Add-RemoteIfMissing($name, $url) {
    $existing = git remote 2>$null
    if ($existing -contains $name) {
        Write-Host "Remote '$name' already exists."
    } else {
        git remote add $name $url
        Write-Host "Added remote '$name'."
    }
}

Add-RemoteIfMissing "med_appt" "https://github.com/EhsanGhafoori/med_appt.git"
Add-RemoteIfMissing "grihf" "https://github.com/EhsanGhafoori/grihf-frontend_capstone_starter_code.git"

Write-Host "Pushing main -> med_appt ..."
git push -u med_appt main

Write-Host "Pushing main -> grihf ..."
git push -u grihf main

Write-Host "Done. Verify in browser (incognito):"
Write-Host "  https://github.com/EhsanGhafoori/med_appt/blob/main/src/Navbar.jsx"
Write-Host "  https://github.com/EhsanGhafoori/grihf-frontend_capstone_starter_code/blob/main/README.md"
