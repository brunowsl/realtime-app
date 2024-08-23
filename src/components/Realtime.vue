<script setup lang="ts">
import { onMounted, ref } from 'vue';

let message = ref('');

onMounted(() => {
    const sse = new EventSource('http://localhost:8080/emitter/stream');
    sse.onmessage = (event) => {
        console.log(event);
        message.value = event.data;
    };
    sse.onerror = (event) => {
        sse.close();
    };
});
</script>

<template>
    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
        <h1>Realtime</h1>
        <div>
            {{ message }}
            <div style="width: 200px; height: 10px; background-color: grey;">
                <div :style="{ width: Number.parseInt(message) + '%', height: '10px', backgroundColor: 'red' }">
                </div>
            </div>
        </div>
    </div>
</template>