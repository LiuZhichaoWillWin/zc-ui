import VirtualList from './src/virtual-list.vue';
export default VirtualList;
declare module 'vue' {
  export interface GlobalComponents {
    ZcVirtualList: typeof VirtualList
  }
}