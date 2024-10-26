<script setup lang="ts">
import Message from "@zc-ui/components/message";
import { MessageType } from "@zc-ui/components/message/src/types";

const handleClick = (type: string) => {
	Message({
		type: type as MessageType,
		message: "shaoidhsaodhasiohdoisa",
	});
};
</script>

<template>
	<button @click="handleClick('success')">success</button>
	<button @click="handleClick('warning')">warning</button>
	<button @click="handleClick('error')">error</button>
</template>

<style scoped></style>
