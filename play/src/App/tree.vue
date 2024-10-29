<script setup lang="ts">
const data = Array.from({ length: 100 }, (_, index) => ({
	label: `Item ${index + 1}`,
	key: `key-${index + 1}`,
	isLeaf: false,
	children: Array.from({ length: 3 }, (_, childIndex) => ({
		label: `Child ${childIndex + 1} of Item ${index + 1}`,
		key: `child-key-${index + 1}-${childIndex + 1}`,
		isLeaf: true,
	})),
}));
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
</script>

<template>
	<div class="wrapper">
		<zc-tree :data="data" :default-expanded-keys="['key-1', 'key-5']">
		</zc-tree>
	</div>
</template>

<style scoped>
.wrapper {
	width: 300px;
}
</style>
