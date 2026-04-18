package com.example.littlelemonmenu

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class MenuViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = MenuRepository(application)

    val databaseMenuItems: Flow<List<MenuItemEntity>> =
        AppDatabase.get(application).menuDao().observeAll()

    init {
        viewModelScope.launch {
            repository.refreshFromNetwork()
        }
    }
}
