<script setup lang="ts">
<<<<<<< HEAD
const data = Array.from({ length: 100 }, (_, index) => ({
=======
const data = Array.from({ length: 10000 }, (_, index) => ({
>>>>>>> d27c22f (first connit)
	label: `Item ${index + 1}`,
	key: `key-${index + 1}`,
	isLeaf: false,
	children: Array.from({ length: 3 }, (_, childIndex) => ({
		label: `Child ${childIndex + 1} of Item ${index + 1}`,
		key: `child-key-${index + 1}-${childIndex + 1}`,
		isLeaf: true,
	})),
}));
<<<<<<< HEAD
data.push({
	label: "101",
	key: "nb",
	isLeaf: false,
	children: [],
	onLoad: () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{
						label: "102",
						key: "sb",
						isLeaf: true,
					},
				]);
			}, 3000);
		});
	},
});
=======
>>>>>>> d27c22f (first connit)
</script>

<template>
	<div class="wrapper">
<<<<<<< HEAD
		<zc-tree :data="data" :default-expanded-keys="['key-1', 'key-5']">
=======
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
>>>>>>> d27c22f (first connit)
		</zc-tree>
	</div>
</template>

<style scoped>
.wrapper {
	width: 300px;
}
</style>
