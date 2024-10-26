<script setup lang="ts">
import Message from "@zc-ui/components/message";
import { MessageType } from "@zc-ui/components/message/src/types";

const handleClick = (type: string) => {
	Message({
		type: type as MessageType,
<<<<<<< HEAD
		// message: "shaoidhsaodhasiohdoisa",
		duration: 3000
=======
		message: "shaoidhsaodhasiohdoisa",
>>>>>>> d27c22f (first connit)
	});
};
</script>

<template>
	<button @click="handleClick('success')">success</button>
	<button @click="handleClick('warning')">warning</button>
	<button @click="handleClick('error')">error</button>
</template>

<style scoped></style>
