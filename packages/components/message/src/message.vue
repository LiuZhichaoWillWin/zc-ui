<script setup lang="ts">
<<<<<<< HEAD
import { ref, reactive, toRefs, computed } from 'vue';
=======
import { ref, reactive, toRefs, computed, onMounted, provide } from 'vue';
>>>>>>> d27c22f (first connit)
import { MessageProps } from "./message";
import { MessageType, types } from "./types";

defineOptions({
  name: 'zc-message'
});

const props = withDefaults(defineProps<MessageProps>(), {
	type: types.MESSAGE as MessageType,
	message: "",
});

const typeClass = computed(() => {
	return props.type;
});

const state = reactive({
	visible: false,
});

const setVisible = (isVisible: boolean) => {
	state.visible = isVisible;
};

const top = ref<string>("0px");
const setTop = (index: number) => {
	top.value = index * (40 + 2 * 10) + "px";
};

const zIndex = ref<string>("");
const setZIndex = (index: number) => {
  zIndex.value = 9999 - index + '';
}

const style = computed(() => ({
	top: top.value,
  left: window.innerWidth / 2 + 'px',
  zIndex: zIndex.value
}));

defineExpose({
	setVisible,
  setZIndex,
	setTop,
});

const { visible } = toRefs(state);
</script>

<template>
	<transition name="zc-message">
		<div :class="['zc-message', typeClass]" :style="style" v-if="visible">
			<span>{{ props.message }}</span>
		</div>
	</transition>
</template>

<style scoped>
.zc-message-enter-from,
.zc-message-leave-to {
	margin-top: -40px;
}
.zc-message-enter-active {
	transition: all 0.3s ease-in;
}
.zc-message-leave-active {
	transition: all 0.3s ease-out;
}
.zc-message {
	position: fixed;
  transform: translate(-50%, 0);
	padding: 10px;
  background-clip: content-box;
	height: 40px;
	line-height: 40px;
	text-align: center;
  & > span {
    padding: 10px;
  }
	&.error {
		color: #f56c6c;
		background-color: #fef0f0;
	}
	&.success {
		color: #67c23a;
		background-color: #f0f9eb;
	}
	&.warning {
		color: #e6a23c;
		background-color: #fdf6ec;
	}
}
</style>
