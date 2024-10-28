<script setup lang="ts">
import MessageBox from "@zc-ui/components/message-box";
import Message from "@zc-ui/components/message";
const beforeClose = (action, instance, done) => {
	setTimeout(() => {
		done();
	}, 1000);
};
const handleClick = () => {
	MessageBox({
		title: "ggagaga",
		text: "hasoihdioas",
		beforeClose: beforeClose,
	})
		.then((action) => {
			Message({
				type: "success",
				message: action,
			});
		})
		.catch((action) => {
			Message({
				type: "warning",
				message: action,
			});
		});
};
</script>
<template>
	<button @click="handleClick">sadhisaodas</button>
</template>

<style scoped></style>
