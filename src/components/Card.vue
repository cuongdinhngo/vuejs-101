<template>
    <div class="card">
        <div class="card-title" v-if="$slots.title">
            <slot name="title"></slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
        <div class="card-actions" v-if="$slots.actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup>
// No props or logic needed for now
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-2px);
}
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.card-body {
  margin-bottom: 10px;
}
.card-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>