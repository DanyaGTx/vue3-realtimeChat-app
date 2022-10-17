import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyALJWxyYbeq08n-ewOZsEJZCIKFuc0oXL4",
    authDomain: "vue-realtime-chat-24c33.firebaseapp.com",
    projectId: "vue-realtime-chat-24c33",
    storageBucket: "vue-realtime-chat-24c33.appspot.com",
    messagingSenderId: "747510418412",
    appId: "1:747510418412:web:ba7db24e50b2977afccec9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(ElementPlus).mount("#app");
