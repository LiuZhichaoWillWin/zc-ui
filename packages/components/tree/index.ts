import Tree from "./src/tree.vue";
import TreeNode from "./src/tree-node.vue";
export default Tree;

declare module "vue" {
	export interface GlobalComponents {
		ZcTree: typeof Tree;
		ZcTreeNode: typeof TreeNode;
	}
}
