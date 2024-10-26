<script setup lang="ts">
import { computed } from "vue";
import { treeNodeProps, treeNodeEmits } from "./tree-node";
import ZcIcon from "@zc-ui/components/icons";
import ZcTreeNodeContent from "./tree-node-content.vue";
defineOptions({
	name: "zc-tree-node",
});
const props = defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);

// 根据层级,确定节点的左外边距
const marginleft = computed(() => {
	const margin = props.node?.level ? props.node.level * 40 : 0;
	return margin;
});

// 点击图标
function onExpandClicked(e: MouseEvent) {
	e.stopPropagation();
	emits("onExpandClicked", props.node);
}
// 点击节点身体
function onTreeNodeClicked() {
	emits("onTreeNodeClicked", props.node);
}
</script>

<template>
	<div
		class="zc-tree-node"
		:style="{ marginLeft: marginleft + 'px' }"
		@click="onTreeNodeClicked"
	>
		<zc-icon
			v-if="!props.node?.isLeaf"
			@click="onExpandClicked"
			class="zc-tree-node__icon"
			:class="{ 'zc-tree-node--expanded': props.node.isExpanded }"
		>
			<svg
				t="1729352074400"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="8733"
				width="16"
				height="16"
			>
				<path
					d="M758.982626 520.67252c-5.938246 0-11.876492-2.272763-16.422018-6.817266L277.710464 49.005111c-9.090029-9.089006-9.090029-23.814382 0-32.904411 9.089006-9.090029 23.814382-9.090029 32.904411 0l464.850144 464.850144c9.090029 9.090029 9.090029 23.815405 0 32.905434C770.920516 518.40078 764.951571 520.67252 758.982626 520.67252z"
					fill="#606060"
					p-id="8734"
				></path>
				<path
					d="M265.106402 1014.594793c-5.953595 0-11.908214-2.302439-16.452717-6.846942-9.090029-9.090029-9.090029-23.814382 0-32.904411l493.907946-493.892597c9.090029-9.090029 23.814382-9.090029 32.904411 0s9.090029 23.815405 0 32.905434L281.558096 1007.747851C277.013593 1012.292354 271.058974 1014.594793 265.106402 1014.594793z"
					fill="#606060"
					p-id="8735"
				></path>
			</svg>
		</zc-icon>
		<zc-tree-node-content :node="props.node"></zc-tree-node-content>
		<span>{{ props.node?.label }}</span>
	</div>
</template>

<style scoped>
.zc-tree-node {
	display: flex;
	align-items: center;
	position: relative;
	&:hover {
		cursor: pointer;
	}
}
.zc-tree-node__icon {
	position: absolute;
	left: -25px;
	padding: 5px;
	transition: 0.2s transform ease-in;
	&:hover {
		cursor: pointer;
	}
}
.zc-tree-node__label {
	margin-left: 40px;
}
.zc-tree-node--expanded {
	transform: rotate(90deg);
}
</style>
