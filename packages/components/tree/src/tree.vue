<script setup lang="ts">
<<<<<<< HEAD
import { watch, ref, useSlots, provide, onBeforeMount } from "vue";
import { treeProps, TreeNodeOption, TreeProvide } from "./tree";
import { TreeNode } from "./tree-node";
import ZcTreeNode from "./tree-node.vue";

=======
import { watch, ref, useSlots, provide } from "vue";
import { treeProps, TreeNodeOption, TreeProvide } from "./tree";
import { TreeNode } from "./tree-node";
import ZcTreeNode from "./tree-node.vue";
// import ZcVirtualList from "../../virtual-list/index";
>>>>>>> d27c22f (first connit)
defineOptions({
	name: "zc-tree",
});

<<<<<<< HEAD
type Key = string | number;

type Tree = TreeNode[];

const props = defineProps(treeProps);

=======
const props = defineProps(treeProps);
>>>>>>> d27c22f (first connit)
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
<<<<<<< HEAD
const tree = ref<Tree>([]);
onBeforeMount(() => {
	tree.value = createTree(props.data, 0);
});

const createTree = (newRawTree: TreeNodeOption[], level: number) => {
=======
const tree = ref<TreeNode[]>([]);
tree.value = createTree(props.data, 1);
function createTree(newRawTree: TreeNodeOption[], level: number) {
>>>>>>> d27c22f (first connit)
	return newRawTree.map((node) => {
		const formatter = getFormatter(node);
		const treeNode: TreeNode = {
			key: formatter.getKey(),
			label: formatter.getLabel(),
			level: level,
			children: [],
			isLeaf: node.isLeaf,
<<<<<<< HEAD
			isLoading: false,
			onLoad: node.onLoad,
			loaded: node.onLoad ? false : true,
=======
			onLoad: node.onLoad,
>>>>>>> d27c22f (first connit)
			isExpanded: expandedKeys.value.has(node.key),
			raw: node,
		};
		if (node.children && node.children.length)
			treeNode.children = createTree(node.children, level + 1);
		return treeNode;
	});
<<<<<<< HEAD
};

// 树的建立和更新逻辑
const flattenTree = ref<TreeNode[]>([]);

let activeNodeIndex: number;

onBeforeMount(() => {
	initFlattenTree();
});

watch(expandedKeys.value, () => {
	updateFlattenTree(activeNodeIndex);
});

const initFlattenTree = () => {
	for (let i = 0; i < tree.value.length; i++) {
		const node = tree.value[i];
		flattenTree.value.push(node);
		if (expandedKeys.value.has(node.key)) {
			addTreeNodes(flattenTree.value.length - 1, node);
		}
	}
};

const updateFlattenTree = (index: number) => {
	const activeNode = flattenTree.value[index];
	if (expandedKeys.value.has(activeNode.key)) {
		addTreeNodes(index, activeNode);
	} else {
		deleteTreeNodes(index, activeNode);
	}
};

const addTreeNodes = (index: number, activeNode: TreeNode) => {
	flattenTree.value.splice(index + 1, 0, ...createFlattenTree(activeNode));
};

const deleteTreeNodes = (index: number, activeNode: TreeNode) => {
	flattenTree.value.splice(index + 1, activeNode.children.length);
};

const createFlattenTree = (node: TreeNode) => {
	const flattenTree = [];
	const stack = [];
	for (let i = node.children.length - 1; i >= 0; i--) {
		stack.push(node.children[i]);
	}
	while (stack.length) {
		const node = stack.pop() as TreeNode;
		flattenTree.push(node);
		if (expandedKeys.value.has(node.key)) {
			for (let i = node.children.length - 1; i >= 0; i--) {
				const child = node.children[i];
				stack.push(child);
			}
		}
	}
	return flattenTree;
};

// 树的展开和异步加载逻辑
const handleExpandClicked = async (node: TreeNode) => {
	await handleLoad(node);
	toggle(node);
};

const isloadingKeys = ref(new Set<string | number>([]));

async function handleLoad(node: TreeNode) {
	if (!node.onLoad || node.loaded || isloadingKeys.value.has(node.key)) return;
	node.isLoading = true;
	const children = await node.onLoad();
	node.raw.children = children;
	node.children = createTree(node.raw.children, node.level + 1);
	node.isLoading = false;
	node.loaded = true;
	isloadingKeys.value.delete(node.key);
}


function toggle(node: TreeNode) {
	const index = flattenTree.value.findIndex((item) => {
		return item.key === node.key;
	});
=======
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

>>>>>>> d27c22f (first connit)
	if (expandedKeys.value.has(node.key)) {
		node.isExpanded = false;
		collapse(node.key);
	} else {
		node.isExpanded = true;
		expand(node.key);
	}
<<<<<<< HEAD
	activeNodeIndex = index;
}

const expand = (key: Key) => {
	expandedKeys.value.add(key);
};

const collapse = (key: Key) => {
	expandedKeys.value.delete(key);
};


// 节点选择逻辑
const seletedKeys = ref(new Set(props.defaultSeletedKeys));
const handleTreeNodeClicked = (node: TreeNode) => {
	if (props.mutipleSelect) {
		multipleSelect(node);
	} else {
		singleSelect(node);
	}
};

const multipleSelect = (node: TreeNode) => {
	if (!seletedKeys.value.has(node.key)) {
		select(node);
	} else {
		withdrawSelect(node);
	}
};

const select = (node: TreeNode) => {
	seletedKeys.value.add(node.key);
};
const withdrawSelect = (node: TreeNode) => {
	seletedKeys.value.delete(node.key);
};

const singleSelect = (node: TreeNode) => {
	seletedKeys.value.clear();
	seletedKeys.value.add(node.key);
};

const slots = useSlots();
provide<TreeProvide>("treeSlots", { slots: slots });
=======
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
>>>>>>> d27c22f (first connit)
</script>

<template>
	<div>
<<<<<<< HEAD
		<!-- 每个元素必须有一个独一无二的key -->
		<transition-group name="zc-tree" tag="div">
			<template v-for="(node, index) in flattenTree" :key="node.key">
=======
		<!-- v-if="!props.useVirttualList" -->
		<transition-group >
			<template v-for="node in flattenTree" :key="node.key">
>>>>>>> d27c22f (first connit)
				<zc-tree-node
					:node="node"
					@on-expand-clicked="handleExpandClicked"
					@on-tree-node-clicked="handleTreeNodeClicked"
					:class="{ 'zc-tree-node__selected': seletedKeys.has(node.key) }"
<<<<<<< HEAD
					:style="{ zIndex: index }"
=======
>>>>>>> d27c22f (first connit)
				>
				</zc-tree-node>
			</template>
		</transition-group>
<<<<<<< HEAD
=======
		<!-- <zc-virtual-list v-else-if="slots.default"
			:data="tree"
			:item-height="props.virtualListOption.itemHeight"
		>
			<template #default="{ item }">
				{{ slots.default(item) }}
			</template>
		</zc-virtual-list> -->
>>>>>>> d27c22f (first connit)
	</div>
</template>

<style scoped>
<<<<<<< HEAD
.zc-tree-node__selected {
	background-color: #f5f7fa;
}

.zc-tree-move {
	transition: 0.5s all ease;
}

.zc-tree-enter-from,
.zc-tree-leave-to {
	opacity: 0;
}
.zc-tree-enter-active {
	transition: all 0.5s ease-in;
}
.zc-tree-leave-active {
	position: absolute;
	transition: all 0.5s ease-out;
=======
.v-move {
	transition: 0.25s all ease;
}
.zc-tree-node__selected {
	background-color: blanchedalmond;
>>>>>>> d27c22f (first connit)
}
</style>
