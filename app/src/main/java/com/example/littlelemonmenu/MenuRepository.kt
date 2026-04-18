package com.example.littlelemonmenu

import android.app.Application
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Loads menu JSON via Retrofit (network), then persists to Room.
 * Falls back to bundled assets/menu.json when the remote file is unavailable (e.g. before first GitHub push).
 */
class MenuRepository(private val application: Application) {

    private val dao = AppDatabase.get(application).menuDao()

    private val api: MenuApi by lazy {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BASIC
        }
        val client = OkHttpClient.Builder().addInterceptor(logging).build()
        Retrofit.Builder()
            .baseUrl(REMOTE_MENU_BASE_URL)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(MenuApi::class.java)
    }

    suspend fun refreshFromNetwork() {
        try {
            val remote = api.getMenu().map { it.toEntity() }
            dao.replaceAll(remote)
        } catch (_: Exception) {
            val local = loadFromAssets()
            dao.replaceAll(local)
        }
    }

    private fun loadFromAssets(): List<MenuItemEntity> {
        val json = application.assets.open("menu.json").bufferedReader().use { it.readText() }
        val type = object : TypeToken<List<MenuItemDto>>() {}.type
        val list: List<MenuItemDto> = Gson().fromJson(json, type)
        return list.map { it.toEntity() }
    }

    companion object {
        /** After you push this repo, this URL serves the same JSON as assets/menu.json */
        const val REMOTE_MENU_BASE_URL =
            "https://raw.githubusercontent.com/EhsanGhafoori/LittleLemonMenu/main/"
    }
}
