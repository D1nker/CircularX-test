<script setup>
const times = ref(2)
const props = defineProps({
  count: {
    type: Number,
    required: true,
    default: 1
  }
});

const result = computed(() => props.count * times.value)
defineExpose(props)
</script>

<template>
  <div>{{ count }} x {{ times }} = {{ result }}</div>
  <button @click="times += 1">
    x1
  </button>
</template>
