<script setup>
import { ref, computed } from 'vue';
import ShoppingCartItem from './ShoppingCartItem.vue';

const itemList = ref([]);
const itemName = ref('');
const itemQuantity = ref('');

const addItem = () => {
    console.log('adding new item ...');
    if (itemName.value) {
        itemList.value.push({
            name: itemName.value,
            quantity: itemQuantity.value
        });
        itemName.value = '';
        itemQuantity.value = '';
    }
};

const toggleBought = (index) => {
  itemList.value[index].bought = !itemList.value[index].bought;
};

const deleteItem = (index) => {
  itemList.value.splice(index, 1);
};

const totalItems = computed(() => itemList.value.length);
const boughtCount = computed(() => itemList.value.filter(item => item.bought).length);
const unboughtCount = computed(() => itemList.value.filter(item => !item.bought).length);
</script>

<template>
    <div>
        <h3>Shopping Cart</h3>
        <form @submit.prevent="addItem">
            <input v-model.trim="itemName" placeholder="Item name" required>
            <input v-model.number="itemQuantity" placeholder="Item quantity" type="number" min="1" required>
            <button type="submit">Add</button>
        </form>
        <div>
            <p>Total Items: {{ totalItems }}</p>
            <p>Bought: {{ boughtCount }} / Unbought: {{ unboughtCount }}</p>
        </div>
        <ul>
            <ShoppingCartItem
                v-for="(item, index) in itemList"
                :key="item.name"
                :name="item.name"
                :quantity="item.quantity"
                :bought="item.bought"
                @toggle-bought="toggleBought(index)"
                @delete="deleteItem(index)"
            />
        </ul>
    </div>
</template>

<style scoped>
button { margin: 10px; padding: 5px 10px; }
ul { list-style-type: none; }
form { margin: 10px 0; }
input { padding: 5px; margin-right: 5px; }
</style>