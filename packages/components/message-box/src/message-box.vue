<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { MessageBoxPropps } from "./message-box";

defineOptions({
	name: "zc-message-box",
});

const props = withDefaults(defineProps<MessageBoxPropps>(), {
	title: "标题",
	text: "文本",
	beforeClose: null,
});

const state = reactive({
	visible: false,
	action: ""
});

const setVisible = (isVisible: boolean) => {
	state.visible = isVisible;
};

const handleSurroundingsClicked = () => {
	state.action = "cancel";
};

const handleContentBoxClicked = (event: MouseEvent) => {
	event.stopPropagation();
};

const handleConfirmBtnClicked = () => {
	state.action = "confirm";
};

defineExpose({
	setVisible,
	state,
	beforeClose: props.beforeClose,
});

const { visible } = toRefs(state);
const { title, text } = toRefs(props);
</script>

<template>
	<transition name="zc-message-box">
		<div :class="['zc-message-box']" v-if="visible" @click="handleSurroundingsClicked">
			<div class="zc-message-box__content" @click="handleContentBoxClicked">
				<h3>{{ title }}</h3>
				<p>{{ text }}</p>
				<button @click="handleConfirmBtnClicked">OK</button>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.zc-message-box {
	position: absolute;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	.zc-message-box__content {
		box-sizing: border-box;
		min-width: 400px;
		min-height: 50px;
		border-radius: 5px;
		padding: 10px;
		background-color: #f7fbff;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		& > p {
			all: unset;
		}
		& > h3 {
			margin: 0;
		}
		& > button {
			all: unset;
			color: #f7fbff;
			background-color: #409eff;
			border-radius: 5px;
			align-self: flex-end;
			text-align: center;
			padding: 5px 17px;
			cursor: pointer;
			&:hover {
				opacity: 0.7;
			}
		}
	}
}

.zc-message-box-enter-from,
.zc-message-box-leave-to {
	opacity: 0;
}
.zc-message-box-enter-active {
	transition: all .3s ease-in;
}
.zc-message-box-leave-active {
	transition: all .3s ease-out;
}
</style>
