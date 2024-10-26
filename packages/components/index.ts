import { Plugin, App } from "vue";

<<<<<<< HEAD
import Icon from "./icons/index";
import Tree from "./tree/index";
import VirtualList from "./virtual-list";
import Calendar from "./calendar";
import MessageBox from "./message-box";

const components = [Icon, Tree, VirtualList, Calendar,  MessageBox];
=======
import ZcIcon from "./icons/index";
import ZcTree from "./tree/index";
import ZcVirtualList from "./virtual-list";
import ZcCalendar from "./calendar";
import ZcMessage from "./message";

const components = [ZcIcon, ZcTree, ZcVirtualList, ZcCalendar, ZcMessage];
>>>>>>> d27c22f (first connit)

const ZCUI: Plugin = {
	install(app: App) {
		components.forEach((comp) => {
			app.component(comp.name as string, comp);
		});
	},
};


export default ZCUI;
