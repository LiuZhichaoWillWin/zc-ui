<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { virtualListProps } from "./virtual-list";

defineOptions({
	name: "zc-virtual-list",
});

const props = defineProps(virtualListProps);
const viewHeight = computed(() => props.itemHeight * props.visibleSize);
const contentHeight = computed(() => props.itemHeight * props.data.length);
const startIndex = ref(0);
const endIndex = ref(props.visibleSize);
// 真正展示的元素
const visibleItems = ref<object>([]);
const viewBox = ref<null | HTMLElement>();

function handleScroll() {
	const num = (viewBox.value as HTMLElement).scrollTop / props.itemHeight;
	const isInteger = Number.isInteger(num);
	startIndex.value = Math.floor(num);
	calculateEndIndex(isInteger);
	updateVisbleItems();
	// 计算最后一个元素的索引
	function calculateEndIndex(startIndexIsInteger: boolean) {
		if (startIndexIsInteger) {
			endIndex.value = startIndex.value + props.visibleSize;
		} else {
			endIndex.value = startIndex.value + props.visibleSize + 1;
		}
	}
}
// 计算真正展示的元素
function updateVisbleItems() {
	visibleItems.value = props.data.slice(startIndex.value, endIndex.value);
}
// 初始化展示元素
onMounted(() => {
	updateVisbleItems();
});
</script>

<template>
	<div
		:style="{
			height: viewHeight + 'px',
			overflow: 'auto',
			position: 'relative',
			border: '2px dotted blue',
			padding: '3px',
		}"
		@scroll="handleScroll"
		ref="viewBox"
	>
		<div :style="{ height: contentHeight + 'px' }"></div>
		<div
			:style="{
				position: 'absolute',
				top: `${itemHeight * startIndex + 3}px`,
			}"
		>
			<template v-for="item in visibleItems" :key="item.key">
				<slot :item="item"></slot>
			</template>
		</div>
	</div>
</template>

<style scoped></style>
