<script setup lang="ts">
import { ref } from "vue";

const date = new Date(2023, 10);
const calendar = ref();
</script>

<template>
	<div>
		<zc-calendar :value="date" ref="calendar"> </zc-calendar>
	</div>
</template>

<style scoped></style>
