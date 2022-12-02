<template lang="">
    <div>
        <Teleport to="body"> 
            <div class="figures">
                <h2 class="figures_title">Съеденные фигуры</h2>
                <div class="figures_container">
                    <slot></slot>
                </div>            
            </div>
        </Teleport>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>
    .figures {
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translate(0, -50%);
        width: 200px;
        height: 700px;
        border: 1px solid red;
    }
    .figures_title{
        text-align: center;
        border-bottom: 1px solid red;
        padding: 10px 0;
    }
    .figures_container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
