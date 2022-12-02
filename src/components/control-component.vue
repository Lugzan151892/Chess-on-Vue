<template lang="">
    <div class="buttons">
        <div>
            <ButtonComponent class="button" @click="store.previousStep" >Ход назад</ButtonComponent>
            <ButtonComponent class="button" @click="store.restartGame" >Начать сначала</ButtonComponent>
            <ButtonComponent class="button" @click="store.nextStep" >Ход вперед</ButtonComponent>
        </div>        
            <ButtonComponent @click="store.rotateBoard" >Развернуть доску</ButtonComponent>
    </div>
</template>
<script setup>
import ButtonComponent from './UI/button-component.vue';
import { useBoardStore } from '../stores/board.js';
const store = useBoardStore();

</script>
<style scoped lang="css">
.buttons{
    display: flex;
    flex-direction: column;
}
.button:nth-child(2) {
    margin: 0 15px;
}
</style>
