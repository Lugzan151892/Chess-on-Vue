<template lang="">
    <div>
        <Teleport to="body">        
            <div v-show="store.isAlert" class="modal">
                <slot></slot>
            </div>
        </Teleport>
    </div>
</template>
<script setup>
import { useBoardStore } from '../stores/board';
const store = useBoardStore();

</script>
<style lang="css" scoped>
.modal {
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid red;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}
</style>
