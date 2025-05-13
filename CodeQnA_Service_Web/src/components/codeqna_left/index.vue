<template>
    <div class="left">
        <Articles />
        <div class="separator"></div>
        <Bloggers />
    </div>
</template>

<script setup lang="ts">
import Articles from './articles/index.vue'
import Bloggers from './bloggers/index.vue'

</script>

<style scoped lang="scss">
.left {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    // border: 1px solid red;
    border-right: 1px solid #CCC;
    
    width: 220px;
    margin: 0;

    .separator {
        width: 80%;
        height: 2px;
        background: linear-gradient(to right,
                rgba(0, 0, 0, 0.2) 30%,
                rgba(0, 0, 0, 0.4) 70%,
                rgba(0, 0, 0, 0.2) 100%
            );
    }
}
</style>