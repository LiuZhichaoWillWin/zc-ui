<script setup lang="ts">
import { computed } from "vue";
import { iconProps } from "./icons";

defineOptions({
  name: "zc-icon",
});

const props = defineProps(iconProps);

const style = computed(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>

<template>
  <i :style="style">
    <slot></slot>
  </i>
</template>

<style scoped></style>
