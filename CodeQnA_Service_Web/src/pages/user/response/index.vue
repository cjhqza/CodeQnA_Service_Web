<template>
    <div class="response">
        <el-card class="parent-box" shadow="never">
            <template #header>
                <div class="card-header">
                    <span class="title">个人发布</span>
                    <el-radio-group v-model="radio1" size="large" class="user-radio-group">
                        <el-radio-button label="全部" value="all" />
                        <el-radio-button label="问答贴" value="post" />
                        <el-radio-button label="文章" value="article" />
                    </el-radio-group>
                </div>
            </template>
            <div v-if="hasKnowledgeArr.length > 0">
                <Card class="item" v-for="(item, index) in hasKnowledgeArr" :key="index" :knowledgeInfo="item" />
                <div class="pagination">
                    <el-pagination class="search-pagination" :page-sizes="[5, 10, 15, 20]" layout="prev, pager, next, jumper, ->, sizes, total" :total="50"/>
                </div>
            </div>
            <el-empty v-else description="暂无数据"></el-empty>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import Card from './card/index.vue'
import { ref } from 'vue';

const radio1 = ref<string>('all')

// 存储已有的问答帖的数据
let hasKnowledgeArr = ref([
    { type: 0, title: '计算机语言有哪些aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa？', username: '小A', tags: ['计算机编程', 'JAVA', 'Python'], createTime: '2024-07-12', isAppreicate: false, isFollow: false, readNum: 0, replyNum: 0 },
    { type: 1, title: '计算机语言有哪些？', username: '小B', tags: ['计算机编程', '编程语言'], createTime: '2024-07-12', isAppreicate: false, isFollow: false, readNum: 0, replyNum: 0 }, 
    { type: 1, title: '计算机语言有哪些？', username: '小C', tags: ['计算机编程', 'C', 'C++', '编译器', 'JVM', '大数据'], createTime: '2024-07-12', isAppreicate: false, isFollow: false, readNum: 0, replyNum: 0 }, 
    { type: 0, title: '计算机语言有哪些？', username: '小D', tags: ['计算机编程', 'Go', '算法'], createTime: '2024-07-12', isAppreicate: false, isFollow: false, readNum: 0, replyNum: 0 },]);

</script>

<style scoped lang="scss">
.response {
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