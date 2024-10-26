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


export {};
