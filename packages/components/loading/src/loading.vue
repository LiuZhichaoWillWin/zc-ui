<script setup lang="ts">
import { onMounted, ref } from "vue";

const isLoading = defineModel("isLoading", {
	default: false,
});
const setLoading = (newIsLoading: boolean) => {
	isLoading.value = newIsLoading;
};

const text = defineModel("text", {
	default: "",
});
const setText = (newText: string) => {
	text.value = newText;
};

const fulllscreen = defineModel("fullscreen", {
	default: false,
});
const setFullscrren = (newFullscreen: boolean) => {
	fulllscreen.value = newFullscreen;
};

const oLoadingBox = ref<HTMLDivElement | null>(null);
onMounted(() => {
	if (!oLoadingBox.value) return;
});

defineExpose({
	setLoading,
	setText,
	setFullscrren,
});
</script>

<template>
	<transition name="zc-loading">
		<div
			:class="[
				'zc-loading__box',
				{ 'zc-loading__box--fullscreen': fulllscreen },
			]"
			ref="oLoadingBox"
			v-if="isLoading"
		>
			<i></i>
			<span>{{ text }}</span>
		</div>
	</transition>
</template>

<style scoped>
.zc-loading__box {
	position: absolute;
	inset: 0;
	font-size: large;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(1, 1, 1, 0.2);
	&.zc-loading__box--fullscreen {
		position: fixed;
	}
}
.zc-loading-enter-from,
.zc-loading-leave-to {
	opacity: 0;
}
.zc-loading-enter-active {
	transition: all 0.3s ease-in;
}
.zc-loading-leave-active {
	transition: all 0.3s ease-out;
}
</style>
