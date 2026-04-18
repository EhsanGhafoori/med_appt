package com.example.littlelemonmenu

data class MenuItemDto(
    val id: Int,
    val title: String,
    val price: Double,
    val category: String,
) {
    fun toEntity(): MenuItemEntity =
        MenuItemEntity(id = id, title = title, price = price, category = category)
}
