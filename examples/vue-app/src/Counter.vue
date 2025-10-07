<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
});

const count = ref(props.initialCount);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>

<template>
  <div>
    <h1>Counter: {{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>
