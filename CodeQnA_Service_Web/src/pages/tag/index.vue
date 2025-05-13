<template>
    <div class="tag">
        <div class="left">
            <div class="title">标签关注</div>
            <div class="intro">每个问帖和文章都会有与某个标签相关联，你可以选定个别标签进行关注以此获得更多相似的内容。</div>
            <div class="func">
                <el-input v-model="tagSearchDto.input" @keyup.enter="fetchData" size="large" style="width: 500px;" placeholder="标签搜索" class="tag-input"
                    clearable></el-input>
                <el-radio-group v-model="tagSearchDto.category" @change="fetchData" size="large" class="tag-radio-group">
                    <el-radio-button label="热门" value="hot" />
                    <el-radio-button label="篇数多" value="most" />
                </el-radio-group>
            </div>
            <div class="tags" v-if="tagSearchInfoArr.length > 0">
                <Card class="item" v-for="(item, index) in tagSearchInfoArr" :key="index" :tagSearchInfo="item" :index="index" @updateFollow="updateFollow"/>
            </div>
            <el-empty v-else description="暂无数据"></el-empty>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="tagSearchDto.pageNum" v-model:page-size="tagSearchDto.pageSize" :page-sizes="[4, 8, 12, 24]"
              :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
              @current-change="currentChange" @size-change="sizeChange" />
        </div>
        <div class="right">
            <CodeqnaTip />
        </div>
        </div>
</template>

<script setup lang="ts">
import Card from './card/index.vue';
import { ref, watch } from 'vue';
import { TagSearchDto, TagSearchInfoArr, TagSearchPageInfoResponseData } from '@/api/tag/type';
import { reqTagBaseInfoListByTagSearchInfo } from '@/api/tag';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();

const tagSearchDto = ref<TagSearchDto>({
    'input': '',
    'category': 'hot',
    'pageNum': 1,
    'pageSize': 8,
});

let total = ref<number>(0);

// 存储已有的问答帖的数据
let tagSearchInfoArr = ref<TagSearchInfoArr>([]);

// 挂载
// onMounted(() => {
//     fetchData();
// })

const fetchData = async () => {
    let result: TagSearchPageInfoResponseData = await reqTagBaseInfoListByTagSearchInfo(tagSearchDto.value);
    if (result.code === 200) {
        tagSearchInfoArr.value = result.data.list;
        total.value = result.data.total;
    } 
}

watch(
    () => userStore.userBaseInfo,
    () => {
        fetchData();
    },
    {immediate: true},
)

// 分页器页码发生变化时
const currentChange = () => {
    fetchData();
}

// 分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
    fetchData();
}

const updateFollow = (index: number) => {
    tagSearchInfoArr.value[index].isFollow = !tagSearchInfoArr.value[index].isFollow;
}

</script>

<style scoped lang="scss">
.tag {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    // border: 1px solid red;

    .left {
        width: 78%;
        display: flex;
        flex-direction: column;
        padding-right: 20px;
        // border: 1px solid blue;

        .title {
            font-size: 25px;
            font-weight: 900;
        }
    
        .intro {
            color: #AAA;
            margin-top: 20px;
            margin-bottom: 30px;
        }
    
        .func {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }
    
        .tags {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 14px; // 设置卡片之间的间距
    
            .item {
                width: 24%;
                border: 1px solid #CCC;
                border-radius: 5px;
            }
        }
    }
    // border: 1px solid blue;

    .right {
        width: 22%;
    }

}
</style>