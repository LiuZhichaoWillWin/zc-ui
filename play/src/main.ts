import { createApp } from "vue";
<<<<<<< HEAD
import App from "./App/tree.vue";
=======
import App from "./App/message.vue";
>>>>>>> d27c22f (first connit)
import ZCUI from "@zc-ui/components/index";
const app = createApp(App);
app.use(ZCUI);
app.mount("#app");
