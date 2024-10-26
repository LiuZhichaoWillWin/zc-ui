<script setup lang="ts">
const data = Array.from({ length: 10000 }, (_, index) => ({
	label: `Item ${index + 1}`,
	key: `key-${index + 1}`,
	isLeaf: false,
	children: Array.from({ length: 3 }, (_, childIndex) => ({
		label: `Child ${childIndex + 1} of Item ${index + 1}`,
		key: `child-key-${index + 1}-${childIndex + 1}`,
		isLeaf: true,
	})),
}));
</script>

<template>
	<div class="wrapper">
		<zc-tree
			:data="data"
			:use-virttual-list="true"
			:virtual-list-option="{
				itemHeight: 40,
			}"
		>
			<template #default="node">
				<div>{{ node.key }}-{{ node.label }}</div>
			</template>
		</zc-tree>
	</div>
</template>

<style scoped>
.wrapper {
	width: 300px;
}
</style>
