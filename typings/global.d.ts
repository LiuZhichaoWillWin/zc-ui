<<<<<<< HEAD
import Canlendar from "@zc-ui/components/calendar";
import Message from "@zc-ui/components/message";
import Icon from "@zc-ui/components/icons";
import Tree from "@zc-ui/components/tree";
import VirtualList from "@zc-ui/components/virtual-list";
import { MessageComponent } from "@zc-ui/components/message/index";
import MessageBox from "@zc-ui/components/message-box";

declare module "vue" {
	export interface GlobalComponents {
		ZcCalendar: typeof Canlendar;
		ZcMessage: typeof Message;
		ZcIcon: typeof Icon;
		ZcTree: typeof Tree;
		ZcVirtualList: typeof VirtualList;
		ZcMessageComponent: typeof MessageComponent;
		ZcMessageBox: typeof MessageBox;
	}
}

=======
import { ComponentCustomProperties } from "vue";
import ZcCanlendar from "@zc-ui/components/calendar";
import ZcMessage from "@zc-ui/components/message";
import ZcIcon from '@zc-ui/components/icons';
import ZcTree from "@zc-ui/components/tree";
import ZcVirtualList from "@zc-ui/components/virtual-list";

declare module "vue" {
	export interface GlobalComponents {
		ZcCalendar: typeof ZcCanlendar;
		ZcMessage: typeof ZcMessage;
		ZcIcon: typeof ZcIcon;
		ZcTree: typeof ZcTree;
		ZcVirtualList: typeof ZcVirtualList;
	}
}


>>>>>>> d27c22f (first connit)
export {};
