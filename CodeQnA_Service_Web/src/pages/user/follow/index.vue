<template>
    <div class="follow">
        <el-card class="parent-box" shadow="never">
            <template #header>
                <div class="card-header">
                    <span class="title">个人发布</span>
                    <el-radio-group v-model="type" @change="fetchData" size="large" class="user-radio-group">
                        <el-radio-button label="全部" value="2" />
                        <el-radio-button label="问答贴" value="0" />
                        <el-radio-button label="文章" value="1" />
                    </el-radio-group>
                </div>
            </template>
            <div v-if="knowledgeInfoList.length > 0">
                <Card class="item" v-for="(item, index) in knowledgeInfoList" :key="index" :knowledgeInfo="item" @loadData="loadData" />
                <div class="pagination">
                    <el-pagination v-model:current-page="knowledgeUserDto.pageNum"
                        v-model:page-size="knowledgeUserDto.pageSize" :page-sizes="[5, 10, 15, 20]" :background="true"
                        layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                        @current-change="currentChange" @size-change="sizeChange" />
                </div>
            </div>
            <el-empty v-else description="暂无数据"></el-empty>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { KnowledgeInfoArr, KnowledgeUserDto, PageInfoResponseData } from '@/api/knowledge/type';
import Card from './card/index.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { reqKnowledgeInfoListByUserIdByFollow } from '@/api/knowledge';

let $route = useRoute();

const type = ref<string>('2')

const knowledgeUserDto = ref<KnowledgeUserDto>({
    'userId': 0,
    'type': 2,
    'pageNum': 1,
    'pageSize': 5,
})
// 总个数
let total = ref<number>(0)

const knowledgeInfoList = ref<KnowledgeInfoArr>([]);

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    knowledgeUserDto.value.type = Number(type.value)
    knowledgeUserDto.value.userId = Number($route.query.usercode)
    let result : PageInfoResponseData = await reqKnowledgeInfoListByUserIdByFollow(knowledgeUserDto.value);
    if (result.code === 200) {
        knowledgeInfoList.value = result.data.list;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }

}

const currentChange = () => {
    fetchData();
}

const sizeChange = () => {
    fetchData();
}

const loadData = () => {
    fetchData();
}

</script>

<style scoped lang="scss">
.follow {
    .parent-box {
        border: 1px solid #BBB;
        // height: 700px;

        ::v-deep(.el-card__header) {
            padding: 10px;

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .title {
                    color: #555;
                    font-size: 20px;
                    font-weight: 700;
                }
            }
        }

        ::v-deep(.el-card__body) {
            padding: 0;
        }

        .pagination {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            // border: 1px solid red;
        }
    }
}
</style>