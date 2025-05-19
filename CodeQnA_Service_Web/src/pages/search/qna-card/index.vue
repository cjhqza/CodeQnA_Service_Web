<template>
    <div class="qna-card">
        <el-card class="box-card" shadow="hover">
            <div class="content">
                <div class="top">
                    <div class="top-top">
                        <div class="baseInfo">
                            <el-tag class="type" type="success" effect="plain" v-if="props.qnaInfo.type === 0"
                                round>问答贴</el-tag>
                            <el-tag class="type" type="danger" effect="plain" v-else round>文章</el-tag>
                            <div class="title" :title="props.qnaInfo.title" @click="goKnowledge(props.qnaInfo.id)">{{ props.qnaInfo.title }}</div>
                        </div>
                        <div class="author" @click="goUser(props.qnaInfo.userId)">{{ props.qnaInfo.userName }}</div>
                    </div>
                    <div class="top-bottom">
                        <div class="tags">
                            <el-tag v-for="tagBaseInfo in props.qnaInfo.tagBaseInfoList" :key="tagBaseInfo.id" class="tag-atrr">
                                {{ tagBaseInfo.tagName }}
                            </el-tag>
                        </div>
                        <div class="createTime">{{ props.qnaInfo.createTime }}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="read">
                        <span>阅读数 {{ props.qnaInfo.knowledgeRecordsInfo.readCount }}</span>
                    </div>
                    <div class="reply">
                        <span>答复数 {{ props.qnaInfo.knowledgeRecordsInfo.responseCount }}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter();

// 接受父组件传递过来的props -> 已有问答贴的数据
let props = defineProps(['qnaInfo']);

const goKnowledge = (knocode: number) => {
    $router.push({ path: '/knowledge', query: { knocode: knocode } });
}

const goUser = (usercode: number) => {
    $router.push({path: '/user/release', query: { usercode: usercode }});
}

</script>

<style scoped lang="scss">
.qna-card {
    ::v-deep(.el-card__body) {
        padding: 10px 20px;
    }

    .box-card {
        width: 100%;
        border: 1px solid #CCC;
        margin-bottom: 10px;
        padding: 0;

        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            // border: 1px solid red;

            .top {
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #DDD;
                padding-bottom: 8px;

                .top-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .baseInfo {
                        display: flex;
                        align-items: center;

                        .type {
                            margin-right: 10px;
                        }

                        .title {
                            // border: 1px solid red;
                            // height: 24px;
                            padding: 4px 0;
                            font-size: 20px;
                            font-weight: 700;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-width: 300px;
                            cursor: pointer;
                        }
                    }

                    .author {
                        color: #55a6fe;
                        cursor: pointer;
                    }
                }

                .top-bottom {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    align-items: center;
                    height: 40px;

                    .tags {
                        .tag-atrr {
                            margin-right: 8px;
                            cursor: pointer;
                        }
                    }

                    .createTime {
                        font-size: 15px;
                        color: #777;
                    }
                }
            }

            .bottom {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-top: 8px;
                // border: 1px solid red;

                .read,
                .reply {
                    font-size: 12px;
                    color: #A0A0A0;
                    
                }

                .read {
                    margin-right: 10px;
                }
            }

        }
    }
}
</style>