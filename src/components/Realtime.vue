<script setup lang="ts">
import { onMounted, ref } from 'vue';

let message = ref('');
let timer = ref();

onMounted(() => {
    const sse = new EventSource('http://localhost:8080/demonstrativo/stream?demonstrativoId=1');

    sse.onmessage = (event) => {
        timer.value = event.data;
        console.log(timer.value);
    };
    sse.onerror = (event) => {
        sse.close();
    };
});

const criar = () => {
    const sse = new EventSource('http://localhost:8080/demonstrativo/stream?demonstrativoId=1');

    fetch('http://localhost:8080/avaliacao/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })



    sse.onmessage = (event) => {
        message.value = event.data;
    };
    sse.onerror = (event) => {
        sse.close();
    };
}

</script>

<template>
    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
        <h1>Realtime</h1>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            {{ new Date(timer).toLocaleTimeString() }}
        </div>

        <div>
            <div>
                {{ message }}
                <div style="width: 200px; height: 10px; background-color: grey;">
                    <div :style="{ width: Number.parseInt(message) + '%', height: '10px', backgroundColor: 'red' }">
                    </div>
                </div>
            </div>
            <button @click="criar">criar</button>
        </div>
    </div>
</template>