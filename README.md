# Little Lemon Menu (Android / Kotlin)

Course-style capstone: load menu JSON from a **REST** endpoint with **Retrofit**, store rows in **Room** (SQLite on device), show items with **sort by name**, **search**, and **category filters** (Appetizers, Salads, Beverages).

## Final assessment (four build parts)

| Part | What to do | Where in this project |
|------|------------|------------------------|
| 1. Set up the app | Run in Android Studio | Whole `LittleLemonMenu` module |
| 2. Sort & filter menu | Order-by-name button, search field, category chips | `MainActivity.kt`, `MenuItemsList.kt` |
| 3. SQLite + display | Persist menu & read for UI | `AppDatabase.kt`, `MenuDao.kt`, `MenuViewModel.kt` |
| 4. Query REST API | GET JSON, save to DB | `MenuApi.kt`, `MenuRepository.kt` |

Step-by-step submission notes: **`FINAL_ASSESSMENT_GUIDE.txt`** in this folder.

## Sorting & search (Module 5 exercise)

In `MainActivity.kt`:

- `orderMenuItems` + **Tap to Order By Name** → `databaseMenuItems.sortedBy { it.title }`
- `searchPhrase` + **OutlinedTextField** (“Search”) → filters by title
- `menuItems` is the list passed into `MenuItemsList` after sort + search; category chips further narrow what is shown.

## Remote JSON

- Bundled copy: `app/src/main/assets/menu.json`
- Same file at repo root: `menu.json` (for GitHub raw URL)
- Retrofit base URL: `https://raw.githubusercontent.com/EhsanGhafoori/LittleLemonMenu/main/`  
  After you push this repository, the app can load `menu.json` over the network. Until then, the repository falls back to assets.

## Project location

This Android project lives at **`D:\Documents\Projects\courses\LittleLemonMenu`** (not inside the StayHealthy / `test1` web project).

## Zip for peer upload

Delete `build` folders, then zip the whole `LittleLemonMenu` folder (Windows: Send to → Compressed folder).

## Open in Android Studio

File → Open → select `LittleLemonMenu` → Sync Gradle → Run on emulator or device.
