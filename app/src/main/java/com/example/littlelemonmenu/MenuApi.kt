package com.example.littlelemonmenu

import retrofit2.http.GET

/** Fetches the same JSON shape as `assets/menu.json`. Base URL = folder that hosts `menu.json` (e.g. GitHub raw). */
interface MenuApi {
    @GET("menu.json")
    suspend fun getMenu(): List<MenuItemDto>
}
