<template>
    <div class="carousel">
        <!-- 首页轮播图结构 -->
        <el-carousel class="box-carousel" height="300px" motion-blur>
            <el-carousel-item v-for="(image, index) in images" :key="index">
                <img :src="image.src" :alt="image.alt">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import tagImage from '@/assets/tag-banner.jpg'
import searcgImage from '@/assets/search-banner.png'
const images = ref([
    {src: tagImage, alt: ''},
    {src: searcgImage, alt: ''}
])

</script>

<style scoped lang="scss">
.carousel {
    // display: flex;
    width: 100%;
    // justify-content: center;
    align-items: center;
    // border: 1px solid red;

    ::v-deep(.box-carousel) {
        border: 0;
        border-radius: 8px;
    }

    img {
        width: 100%;
        height: 300px;
    }
}
</style>