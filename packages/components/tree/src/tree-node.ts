import { TreeNodeOption } from "./tree";

// 格式化树节点
export interface TreeNode extends TreeNodeOption {
  level: number;
  children: TreeNode[];
  isLeaf: boolean;
  isExpanded: boolean;
<<<<<<< HEAD
  isLoading?: boolean;
=======
>>>>>>> d27c22f (first connit)
  loaded?: boolean;
  raw: TreeNodeOption;
}

// 树节点的Props
export const treeNodeProps = {
  node: {
    type: Object as () => TreeNode,
    default: () => {},
    required: true,
  },
};
// 树节点的emits
export const treeNodeEmits = {
 onExpandClicked: (node: TreeNode) => node,
 onTreeNodeClicked: (node: TreeNode) => node
};
