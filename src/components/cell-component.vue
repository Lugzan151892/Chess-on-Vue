<template lang="">
    <div 
    @dragstart="store.startDrag($event, cell)"
    @drop="store.onDrop($event, cell)"
    @dragover.prevent
    @dragenter.prevent
    class="cell" 
    :class="{black: cell.color === 'black', white: cell.color === 'white', reverse: store.isRotate, attack: cell.figure && cell.isAvailable}" 
    >
        <img v-if="cell.figure" class="image" v-show="cell.figure" :src="cell.figure.url" alt="">
        <div v-show="!cell.figure && cell.isAvailable" class="green_circle"></div>
        <slot></slot>
    </div>
</template>
<script setup>
import { useBoardStore } from '../stores/board.js';
const store = useBoardStore();

defineProps({
    cell: Object,
    url: String
});

</script>
<style lang="css" scoped>
    .cell {
        width: 80px;
        height: 80px;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 1s ease;
    }
    .reverse {
        transform: rotateX(180deg);
    }
    .black {
        background-color: #808BA0;
    }
    .white {
        background-color: #DBDBDD;
    }
    .attack {
        background-color: rgb(142, 231, 130);
    }
    .image {        
        height: 70px;
        width: 70px;
        transition: all 0.5s ease;
    }
    .green_circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: green;
    }
    .image:hover {
        cursor: grab;
        height: 80px;
        width: 80px;
    }
</style>
