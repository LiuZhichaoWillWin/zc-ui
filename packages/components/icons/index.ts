import Icon from "./src/icon.vue";

// 用于直接导入到文件中，不需要install
export default Icon;
export * from "./src/icons";
export type ZCIconInstance = InstanceType<typeof Icon>;
<<<<<<< HEAD
=======

declare module "vue" {
  export interface GlobalComponents {
    zcIcon: typeof Icon;
  }
}
>>>>>>> d27c22f (first connit)
