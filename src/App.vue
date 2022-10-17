<template>
    <nav class="flex gap-6 justify-center items-center mt-[15px] mb-[10px]">
        <router-link :to="{name: 'home'}">Home</router-link>
        <router-link :to="{name: 'chat'}">Chat</router-link>
        <router-link v-if="!isLoggedIn" :to="{name: 'login'}">Login</router-link>
        <router-link v-if="!isLoggedIn" :to="{name: 'register'}">Registration</router-link>
        <el-button v-if="isLoggedIn" @click="handleSignOut">Sign out</el-button>
    </nav>
    <div class="max-w-[800px] m-auto text-center">
        <router-view  />
    </div >
</template>

<script setup>
import { ElButton } from "element-plus";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

import { onMounted , ref } from "vue";
import router from "./router";

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user) { 
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push({name: "home"});
    }); 
};
</script>

