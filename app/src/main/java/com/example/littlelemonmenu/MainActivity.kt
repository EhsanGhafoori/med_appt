package com.example.littlelemonmenu

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.weight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    MenuScreen()
                }
            }
        }
    }
}

@Composable
fun MenuScreen(viewModel: MenuViewModel = viewModel()) {
    val databaseMenuItems by viewModel.databaseMenuItems.collectAsStateWithLifecycle(emptyList())

    var orderMenuItems by remember { mutableStateOf(false) }
    var searchPhrase by remember { mutableStateOf("") }
    var selectedCategories by remember {
        mutableStateOf(setOf("Appetizers", "Salads", "Beverages"))
    }

    val sortedMenuItems =
        if (orderMenuItems) databaseMenuItems.sortedBy { it.title } else databaseMenuItems

    val menuItems =
        if (searchPhrase.isNotEmpty()) {
            sortedMenuItems.filter { it.title.contains(searchPhrase, ignoreCase = true) }
        } else {
            sortedMenuItems
        }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(
            text = "Little Lemon",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .background(Color(0xFFF4CE14))
                .padding(horizontal = 16.dp, vertical = 8.dp),
        )

        Button(onClick = { orderMenuItems = true }) {
            Text("Tap to Order By Name")
        }

        OutlinedTextField(
            value = searchPhrase,
            onValueChange = { searchPhrase = it },
            label = { Text("Search") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 50.dp),
            singleLine = true,
        )

        Text(
            text = "Filter by category (tap to include / exclude)",
            style = MaterialTheme.typography.labelLarge,
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            listOf("Appetizers", "Salads", "Beverages").forEach { cat ->
                FilterChip(
                    selected = cat in selectedCategories,
                    onClick = {
                        selectedCategories =
                            if (cat in selectedCategories) selectedCategories - cat else selectedCategories + cat
                    },
                    label = { Text(cat) },
                )
            }
        }

        MenuItemsList(
            menuItems = menuItems,
            selectedCategories = selectedCategories,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
        )
    }
}
