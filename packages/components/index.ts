import { Plugin, App } from "vue";

import Icon from "./icons/index";
import Tree from "./tree/index";
import VirtualList from "./virtual-list";
import Calendar from "./calendar";
import MessageBox from "./message-box";

const components = [Icon, Tree, VirtualList, Calendar,  MessageBox];

const ZCUI: Plugin = {
	install(app: App) {
		components.forEach((comp) => {
			app.component(comp.name as string, comp);
		});
	},
};


export default ZCUI;
