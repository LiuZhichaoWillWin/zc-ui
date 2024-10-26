import { Plugin, App } from "vue";

import ZcIcon from "./icons/index";
import ZcTree from "./tree/index";
import ZcVirtualList from "./virtual-list";
import ZcCalendar from "./calendar";
import ZcMessage from "./message";

const components = [ZcIcon, ZcTree, ZcVirtualList, ZcCalendar, ZcMessage];

const ZCUI: Plugin = {
	install(app: App) {
		components.forEach((comp) => {
			app.component(comp.name as string, comp);
		});
	},
};


export default ZCUI;
