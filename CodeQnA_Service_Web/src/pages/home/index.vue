<template>
    <div class="home">
        <div class="left">
            <FeaturedArticle />
            <InterestedArticle />
        </div>
        <div class="mid">
            <!-- 轮播图 -->
            <Carousel />
            <!-- 问答贴选项区 -->
            <Category @getCategory="getCategory"/>
            <!-- 展示问答贴结构 -->
            <div class="questions" v-if="knowledgeInfoArr.length > 0">
                <Card class="item" v-for="(item, index) in knowledgeInfoArr" :key="index" :knowledgeInfo="item" :index="index" @updateAppreciate="updateAppreciate" @updateFollow="updateFollow"/>
            </div>
            <el-empty v-else description="暂无数据"></el-empty>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
              :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
              @current-change="currentChange" @size-change="sizeChange" />
        </div>
        <div class="right">
            <CodeqnaTip />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useUserStore from '@/store/modules/user'
// 引入精彩文章组件
import FeaturedArticle from './featuredArticle/index.vue'
// 引入兴趣推文组件
import InterestedArticle from './interestedArticle/index.vue'
// 引入首页轮播图组件
import Carousel from './carousel/index.vue'
// 引入目录组件
import Category from './category/index.vue'
// 引入问答卡片组件
import Card from './card/index.vue'
import { reqPostInfoByPage, reqPostInfoByPageForInterest } from '@/api/home'
import { KnowledgeInfoArr, PageInfoResponseData } from '@/api/home/type'

// 分页器页码
let pageNum = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(5);
// 存储已有的医院的总个数
let total = ref<number>(0);
// 分类选项
let categoryCode = ref<string>('latest');

// 存储已有的问答帖的数据
let knowledgeInfoArr = ref<KnowledgeInfoArr>([]);

let userStore = useUserStore();

// 挂载
// onMounted(() => {
//     getKnowledgeInfoBasedCategory();
// })

// 获取当前分类选项的数据
const getKnowledgeInfoBasedCategory = async () => {
    let result: PageInfoResponseData = await reqPostInfoByPage(pageNum.value, pageSize.value, categoryCode.value);
    if (result.code === 200) {
        knowledgeInfoArr.value = result.data.list;
        total.value = result.data.total;
    }
}

// 监听登录状态变化
watch(
    () => userStore.userBaseInfo,
    () => {
        getKnowledgeInfoBasedCategory();
    },
    {immediate: true},
)

// 获取可能感兴趣的数据（要求登录）
const getKnowledgeInfoBasedInterest = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result: PageInfoResponseData = await reqPostInfoByPageForInterest(pageNum.value, pageSize.value);
        if (result.code === 200) {
            knowledgeInfoArr.value = result.data.list;
            total.value = result.data.total;
        }
    }
}

// 分页器页码发生变化时
const currentChange = () => {
    getKnowledgeInfoBasedCategory()
}

// 分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
    getKnowledgeInfoBasedCategory()
}

// 获取子组件返回数据
const getCategory = (category: string) => {
    if (category === 'interest') {
        getKnowledgeInfoBasedInterest();
    } else {
        categoryCode.value = category;
        // console.log(category);
        pageNum.value = 1;
        getKnowledgeInfoBasedCategory();
    }
}

// 更新赞赏状态
const updateAppreciate = (index: number) => {
    knowledgeInfoArr.value[index].knowledgeRecordsInfo.isAppreciate = !knowledgeInfoArr.value[index].knowledgeRecordsInfo.isAppreciate;
}

// 更新收藏状态
const updateFollow = (index: number) => {
    knowledgeInfoArr.value[index].knowledgeRecordsInfo.isFollow = !knowledgeInfoArr.value[index].knowledgeRecordsInfo.isFollow;
}

</script>

<style scoped lang="scss">
.home {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 20px 0;
    // border: 1px solid blue;

    .left {
        width: 18%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // border: 1px solid green;
    }

    .mid {
        width: 60%;
        display: flex;
        flex-direction: column;
        // border: 1px solid red;
        padding: 0 20px;
        .questions {
            margin-top: 10px;
        }
    }

    .right {
        width: 22%;
        // border: 1px solid green;
    }
}
</style>