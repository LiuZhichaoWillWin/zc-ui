<script lang="ts">
import { inject, defineComponent, h, PropType } from "vue";
import { TreeNode } from "./tree-node";
import { TreeProvide } from "./tree";

export default defineComponent({
	name: "zc-tree-content",
	props: {
		node: {
			type: Object as PropType<TreeNode>,
			required: true,
		},
	},
	setup(props) {
		const { slots } = inject<TreeProvide>("treeSlots") as TreeProvide;
		return () =>
		// return a vnode
			h(
				"div",
				null,
				slots.default
					? slots.default(props.node)
					: h("span", null, props.node.label)
			);
	},
});
</script>
