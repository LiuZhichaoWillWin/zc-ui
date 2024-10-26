<script setup lang="ts">
import { watch, ref, useSlots, provide } from "vue";
import { treeProps, TreeNodeOption, TreeProvide } from "./tree";
import { TreeNode } from "./tree-node";
import ZcTreeNode from "./tree-node.vue";
// import ZcVirtualList from "../../virtual-list/index";
defineOptions({
	name: "zc-tree",
});

const props = defineProps(treeProps);
const expandedKeys = ref(new Set(props.defaultExpandedKeys));

// 获得格式化器,根据用户传递的字段拿到key,label和children
function getFormatter(node: TreeNodeOption) {
	const key = props.keyField ?? "key";
	const label = props.labelField ?? "label";
	const children = props.childrenField ?? "chilren";
	return {
		getKey() {
			return node[key] as string | number;
		},
		getLabel() {
			return node[label] as string;
		},
		getChildren() {
			return node[children] as TreeNodeOption[];
		},
	};
}
// 建树
const tree = ref<TreeNode[]>([]);
tree.value = createTree(props.data, 1);
function createTree(newRawTree: TreeNodeOption[], level: number) {
	return newRawTree.map((node) => {
		const formatter = getFormatter(node);
		const treeNode: TreeNode = {
			key: formatter.getKey(),
			label: formatter.getLabel(),
			level: level,
			children: [],
			isLeaf: node.isLeaf,
			onLoad: node.onLoad,
			isExpanded: expandedKeys.value.has(node.key),
			raw: node,
		};
		if (node.children && node.children.length)
			treeNode.children = createTree(node.children, level + 1);
		return treeNode;
	});
}

// 监听expandedKeys, 进行扁平化
const flattenTree = ref<TreeNode[]>([]);
watch(
	expandedKeys.value,
	() => {
		flattenTree.value.length = 0;
		const stack: TreeNode[] = [];
		for (let i = tree.value.length - 1; i >= 0; i--) {
			stack.push(tree.value[i]);
		}
		while (stack.length) {
			const pop = stack.pop() as TreeNode;
			flattenTree.value.push(pop);
			if (pop.children.length > 0 && expandedKeys.value.has(pop.key)) {
				for (let i = pop.children.length - 1; i >= 0; i--) {
					stack.push(pop.children[i]);
				}
			}
		}
	},
	{ immediate: true }
);

/**
 * 点击图标触发的函数
 */
const handleExpandClicked = async (node: TreeNode) => {
	// 先异步加载子树, 再切换状态
	await handleLoad(node);
	toggle(node);
};
// 切换树的状态
function toggle(node: TreeNode) {
	// 展开树节点
	const expand = (key: string | number) => {
		expandedKeys.value.add(key);
	};
	// 关闭树节点
	const collapse = (key: string | number) => {
		expandedKeys.value.delete(key);
	};

	if (expandedKeys.value.has(node.key)) {
		node.isExpanded = false;
		collapse(node.key);
	} else {
		node.isExpanded = true;
		expand(node.key);
	}
}
// 树节点孩纸异步加载
const isloadingKeys = ref(new Set<string | number>([]));
async function handleLoad(node: TreeNode) {
	if (!node.onLoad || node.loaded || isloadingKeys.value.has(node.key)) return;
	const children = await node.onLoad();
	node.raw.children = children;
	node.children = createTree(node.raw.children, node.level + 1);
	node.loaded = true;
	isloadingKeys.value.delete(node.key);
}

/**
 * 拿到插槽函数，提供给TreeContent组件
 */
const slots = useSlots();
provide<TreeProvide>("treeSlots", { slots: slots });

/**
 * 节点选择
 */
const seletedKeys = ref(new Set(props.defaultSeletedKeys));
function handleTreeNodeClicked(node: TreeNode) {
	console.log(props.mutipleSelect);
	// 多选
	if (props.mutipleSelect) {
		multipleSelect();
		// 单选
	} else {
		singleSelect();
	}

	function multipleSelect() {
		if (!seletedKeys.value.has(node.key)) {
			select(node);
		} else {
			withdrawSelect(node);
		}

		function select(node: TreeNode) {
			seletedKeys.value.add(node.key);
		}
		function withdrawSelect(node: TreeNode) {
			seletedKeys.value.delete(node.key);
		}
	}

	function singleSelect() {
		seletedKeys.value.clear();
		seletedKeys.value.add(node.key);
	}
}
</script>

<template>
	<div>
		<!-- v-if="!props.useVirttualList" -->
		<transition-group >
			<template v-for="node in flattenTree" :key="node.key">
				<zc-tree-node
					:node="node"
					@on-expand-clicked="handleExpandClicked"
					@on-tree-node-clicked="handleTreeNodeClicked"
					:class="{ 'zc-tree-node__selected': seletedKeys.has(node.key) }"
				>
				</zc-tree-node>
			</template>
		</transition-group>
		<!-- <zc-virtual-list v-else-if="slots.default"
			:data="tree"
			:item-height="props.virtualListOption.itemHeight"
		>
			<template #default="{ item }">
				{{ slots.default(item) }}
			</template>
		</zc-virtual-list> -->
	</div>
</template>

<style scoped>
.v-move {
	transition: 0.25s all ease;
}
.zc-tree-node__selected {
	background-color: blanchedalmond;
}
</style>
