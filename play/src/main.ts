import { createApp } from "vue";
import App from "./App/message.vue";
import ZCUI from "@zc-ui/components/index";
const app = createApp(App);
app.use(ZCUI);
app.mount("#app");
