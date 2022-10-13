<template>
  <div class="max-w-[400px] m-auto text-center text-[20px]">
      <h1>Instruction how to use this chat!</h1>
      <p>1.Drop the link to your friend</p>
      <p>2.Enjoy!</p>
  </div>
  <div class="max-w-[1800px] h-[800px] flex justify-center items-end">
    
    <form class="w-full" @submit.prevent="sendMessage">
      <div class="max-w-[600px] m-auto">
        <div>
          <div v-for="(message,index) in messages" :key="index" class="text-[30px] mb-[10px]">
            <span v-if="message.uid === uid">You:</span>
            <span v-else>Friend:</span>
            {{message.text}}
          </div>
        </div>
        <div class="flex">
          <input class="w-full border-2 border-red-600 pl-[10px] h-[50px] text-[30px]" v-model="message" type="text">
          <button class="ml-[10px] bg-black w-[80px] text-white">Enter</button>
        </div>
      </div>
    </form>
  </div>
  
</template>

<script setup>
import AgoraRTM from "agora-rtm-sdk";
import {v4 as uuidv4} from "uuid";
import {ref, onMounted} from "vue";
const uid = uuidv4();
const APP_ID = "523e9672c81d4f028af1fcdb4ac53734";
const CHANNEL = "wdj";

const client = AgoraRTM.createInstance(APP_ID);
let channel;

const message = ref("");
const messages = ref([]);

const appendMessage = async (message) => {
    messages.value.push(message);
};

onMounted(async () => {
    await client.login({uid, token: null});
    channel = await client.createChannel(CHANNEL);
    await channel.join();
    channel.on("ChannelMessage", (message,peerId) => {
        appendMessage({text: message.text, uid: peerId});
    });
});

const sendMessage = () => {
    if(message.value.trim()){
        channel.sendMessage({text: message.value, type: "text"});
        appendMessage({text: message.value, uid});
        message.value = "";
        console.log("sent");
        
    } 
    
};

</script>

