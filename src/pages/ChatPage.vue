<template>
  <div>
    <div class="max-w-[400px] m-auto text-left text-[20px] border-red-300 border-2 p-3">
    <h1>Instruction how to use this chat!</h1>
    <p>1.Drop the link to your friend</p>
    <p>2.Enjoy!</p>
  </div>
  <div class="max-w-[1800px] h-[750px] flex justify-center items-end mt-[10px]">
    <form class="w-full" @submit.prevent="sendMessage">
      <div class="max-w-[600px] m-auto">
        <div class="h-[700px] overflow-auto flex flex-col-reverse">
          <div v-for="(message, index) in messages" :key="index" class="text-[30px] mb-[10px] text-left">
            <span>{{message.uid}}:</span>
            {{ message.text }}
          </div>
        </div>
        <div class="flex">
          <input
            class="w-full border-2 border-red-600 pl-[10px] h-[50px] text-[30px]"
            v-model="message"
            type="text"
          />
          <button class="ml-[10px] bg-black w-[80px] text-white">Enter</button>
          <button @click="cleanChat" class="ml-[10px] bg-black w-[80px] text-white">Clear chat</button>
        </div>
      </div>
    </form>
  </div>
  </div>
  
</template>

<script setup>
import AgoraRTM from "agora-rtm-sdk";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const uid = ref("");

const userName = ref("");

const APP_ID = "523e9672c81d4f028af1fcdb4ac53734";
const CHANNEL = "wdj";
const client = AgoraRTM.createInstance(APP_ID);
let channel;
const message = ref("");
const messages = ref([]);
const appendMessage = async (message) => {
    messages.value.unshift(message);
};

const getUserEmail = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = userName.value;
            console.log(user.email);
        } else {
            console.log("no user");
        }
    });
};

const getUserName = () => {
    if(JSON.parse(localStorage.getItem("userName"))) {
        userName.value = JSON.parse(localStorage.getItem("userName"))._value;
    } else {
        do {
            userName.value = prompt("Введите ваше на латинице");
        } while(!userName.value.match(/^[a-z\s]+$/i));
        localStorage.setItem("userName",JSON.stringify(userName));    
    }
};

const getMessagesFromStorage = () => {
    if(JSON.parse(localStorage.getItem("messages"))) { 
        messages.value = JSON.parse(localStorage.getItem("messages"))._value;
    }
};

const cleanChat = () => {
    localStorage.removeItem("messages");
    message.value = "";
    messages.value = [];
};

onMounted(async () => {
    await getUserName();
    await getUserEmail();
    await client.login({ uid: uid.value, token: null });
    channel = await client.createChannel(CHANNEL);
    await channel.join();
    channel.on("ChannelMessage", (message, peerId) => {
        appendMessage({ text: message.text, uid: peerId });
    });
    await getMessagesFromStorage();
});
const sendMessage = () => {
    if (message.value.trim()) {
        channel.sendMessage({ text: message.value, type: "text" });
        appendMessage({ text: message.value, uid: uid.value });
        localStorage.setItem("messages", JSON.stringify(messages));
        message.value = "";
    }
};

</script>
