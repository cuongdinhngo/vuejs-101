<script setup>
import { ref } from 'vue';
const name = ref('Cuong Ngo');
console.log('MyName component ...');
console.log(name.value);
</script>

<template>
    <div>
        <h1>Hello! My name is {{ name }}</h1>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const name = ref('Your Name');
    return { name };
  }
};
</script>