<template>
  <h1 class="mb-8">Register</h1>
  <div class="mb-[30px]">
    <el-input
      class="max-w-[300px]"
      v-model="userName"
      placeholder="Your Name"
    />
  </div>
  <div class="mb-[30px]">
    <el-input class="max-w-[300px]" v-model="email" placeholder="Your Email" />
  </div>
  <div class="mb-[30px]">
    <el-input
      class="max-w-[300px]"
      v-model="password"
      placeholder="Your Password"
      show-password
    />
  </div>
  <el-button @click="register">Register</el-button>
</template>

<script setup>
import "element-plus/es/components/message/style/css";
import { ElButton } from "element-plus";
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const userName = ref("");

const register = () => {
    if (userName.value.trim() && userName.value.match(/^[a-z\s]+$/i)) {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
                localStorage.setItem("userName", JSON.stringify(userName));
                console.log("Successfully registered", data);
                router.push({ name: "chat" });
            })
            .catch((error) => {
                console.log(error.code);
                alert(error.message);
            });
    } else {
        alert("Введите имя на латинице");
    }
};
</script>
