import { Component, Plugin, createApp } from 'vue';
import { App } from 'vue';

export const withInstall = (comp: Component): Component => {
  (comp as Plugin).install = function (app: App) {
    app.component(comp.name as string, comp);
  }
  return comp;
}