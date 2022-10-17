import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../pages/ChatPage.vue";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes: [
        { path: "/chat", name: "chat", component: ChatPage, meta: { requiresAuth: true  } },
        { path: "/login", name: "login", component: LoginPage },
        { path: "/home", name: "home", alias: "/", component: HomePage },
        { path: "/register", name: "register", component: RegisterPage }
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve , reject) => {
        const removeListener = onAuthStateChanged(getAuth(), (user) => {
            removeListener();
            resolve(user);
        },
        reject
        );
    });
};

router.beforeEach(async(to,from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        } else {
            alert("Login please");
            next("/");
        }
    } else {
        next();
    }
});

export default router;