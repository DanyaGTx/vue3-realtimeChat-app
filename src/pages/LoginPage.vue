<template>
    <h1>Login</h1>
    <div class="mb-[30px]">
        <el-input class="max-w-[300px]" v-model="email" placeholder="Your Email" />
    </div>
    <div class="mb-[30px]">
        <el-input class="max-w-[300px]" v-model="password" placeholder="Your Password" show-password/>
    </div>
    <p v-if="errorMsg">{{errorMsg}}</p>
    <el-button @click="login">Login</el-button>
    <el-button @click="signInWithGoogle">Sign in with Google</el-button>
</template>
<script setup>
import "element-plus/es/components/message/style/css";
import { ElButton } from "element-plus";
import {ref} from "vue";
import { getAuth , GoogleAuthProvider, signInWithEmailAndPassword , signInWithPopup } from "firebase/auth";

import {useRouter} from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMsg = ref();
const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully login", data);
            router.push({name: "home"});
        })
        .catch((error) => {
            console.log(error.code);
            switch(error.code){
            case "auth/invalid-email":
                errorMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errorMsg.value = "No account with that email was found";
                break;
            case "auth/wrond-password":
                errorMsg.value = "Incorrect password";
                break;
            default:
                errorMsg.value = "Email or password was incorrect";
                break;
            }
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(),provider)
        .then((result) => {
            console.log(result.user);
            router.push({name: "chat"});
        })
        .catch((error) => {
            console.log(error.message);
        });
};
</script>