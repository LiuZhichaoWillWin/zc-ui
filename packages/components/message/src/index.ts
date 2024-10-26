import { App, createApp, ref, watch } from "vue";
import MessageComponent from "./message.vue";
import { MessageOptions } from "./message";

type MessageInstance = InstanceType<typeof MessageComponent>;

const store = ref<MessageInstance[]>([]);

const Message = async (options: MessageOptions) => {
	const [comp, app] = createMessage(options);
	showMessage(comp);

	hiddenMessage(comp, app, options.duration || 3000);
};

function createMessage(options: MessageOptions) {
	const app = createApp(MessageComponent, options);
	const oFrg = document.createDocumentFragment() as unknown as Element;
	const compInstance = app.mount(oFrg) as MessageInstance;

	document.body.appendChild(oFrg);

	watch(store.value, () => {
		const index = store.value.findIndex((item) => {
			return item === compInstance;
		});
		compInstance.setTop(index);
		compInstance.setZIndex(index);
	});

	store.value.push(compInstance);

	return [compInstance, app] as [MessageInstance, App];
}

function showMessage(comp: MessageInstance) {
	return new Promise<boolean>((resolve, reject) => {
		comp.setVisible(true);
		resolve(true);
	});
}

function hiddenMessage(comp: MessageInstance, app: App, duration: number) {
	const timer = setTimeout(async () => {
		clearTimeout(timer);
		comp.setVisible(false);
		await deleteMessage(comp);
		unmountMessage(app);
	}, duration);
}

async function deleteMessage(comp: MessageInstance) {
	return new Promise((resolve) => {
		const index = store.value.findIndex((item) => {
			return item === comp;
		});
		store.value.splice(index, 1);
		resolve(true);
	});
}

function unmountMessage(app: App) {
	app.unmount();
}

export default Message;
