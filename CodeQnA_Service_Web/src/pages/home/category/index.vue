<template>
    <div class="category">
        <div class="left">问答分类</div>
        <ul class="choice">
            <li v-for="(item, index) in sorts" :key="index" :class="{ active: activeSort === item.value }" @click="changesort(item.value)">{{ item.label }}</li>
        </ul>
        <el-button type="primary" @click="goPostCreation('/createPost')">提问题</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 控制分类高亮响应式数据
let activeSort = ref<string>('latest');

// 获取路由器
let $router = useRouter();

const sorts = [
    { label: '最近的', value: 'latest' },
    { label: '热门的', value: 'popular' },
    { label: '高质量的', value: 'quality' },
    { label: '关注高的', value: 'follow' },
    { label: '待求解的', value: 'unsolved' },
    { label: '感兴趣的', value: 'interest' },
]

// 分类
const changesort = (category: string) => {
    activeSort.value = category;
    // 触发自定义事件，将分类选项传回父组件
    $emit('getCategory', category);
}

// 提问题按钮
const goPostCreation = (path: string) => {
    $router.push({ path });
}

let $emit = defineEmits(['getCategory'])

</script>

<style scoped lang="scss">
.category {
    width: 100%;
    margin-top: 25px;
    margin-bottom: 20px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        font-size: 20px;
        font-weight: 900;
    }
    ul {
        display: flex;
        li {
            cursor: pointer;
            font-size: 18px;
            margin-right: 20px;

            &.active {
                color: #55a6fe;
            }
        }
    }
}
</style>