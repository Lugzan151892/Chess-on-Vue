<template lang="">
    <div>
        <div  class="board" :class="{reverse: store.isRotate}">
            <CellComponent            
                v-for="cell in store.board"
                :key="cell.id"
                :cell="cell"
            >        
            </CellComponent>
        </div>    
        <div class="turn"><p class="turn_text">Номер хода:</p> <span>{{store.currentTurn}}</span></div>
        <PopupComponent v-show="store.isAlert">
            <h2 class="title" v-if="store.isWhiteTurn" v-show="store.isAlert">Ход белых</h2>
            <h2 class="title" v-if="!store.isWhiteTurn" v-show="store.isAlert">Ход черных</h2>
            <h2 class="title" v-if="store.isCheck" v-show="store.isAlert">Шах!</h2>
        </PopupComponent>
        <FiguresPopup>
                <img class="figure" :key="figure.id" v-for="figure in store.killedFigures" :src='figure.url' :alt='figure.name'>
        </FiguresPopup>
    </div>
</template>
<script setup>
import CellComponent from './cell-component.vue';
import { useBoardStore } from '../stores/board.js';
import { onMounted } from 'vue';
import PopupComponent from './popup-component.vue';
import FiguresPopup from './figures-popup.vue';

const store = useBoardStore();

onMounted(() => {    
    store.getStartingState();
    store.updateBoard(store.boardState[store.currentTurn]);
});


</script>
<style lang="css" scoped>
    .board {
        display: flex;
        flex-wrap: wrap;
        width: calc(80px * 8);
        height: calc(80px * 8);
        transition: all 1s ease;
    }
    .reverse {
        transform: rotate(180deg);
    }
    .title {
        font-size: 30px;
        color: red;
        padding: 10px 40px;
    }
    .turn {
        display: flex;
        font-size: 20px;
        margin: 10px 0;
    }
    .figure {
        width: 50px;
        height: 50px;
    }
    .turn_text {
        margin-right: 10px;
        /* font-size: 24px; */
    }
</style>
