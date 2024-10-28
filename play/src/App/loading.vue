<script setup lang="ts">
import vLoading from '@zc-ui/components/loading/index';
import { ref } from 'vue';
const loading  = ref<boolean>(false);
</script>

<template>
	<div class="wrapper">
		<button @click="loading = !loading">hahahah</button>
		<div v-loading="{
			isLoading: loading,
			text: 'loding.......',
			fullscreen: true
		}"
		>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	width: 400px;
	height: 400px;
	background-color: rebeccapurple;
	& > div {
		width: 200px;
		height: 200px;
		background-color: saddlebrown;
	}
}
</style>
