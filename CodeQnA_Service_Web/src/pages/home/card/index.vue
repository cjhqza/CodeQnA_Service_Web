<template>
    <div class="card">
        <el-card class="box-card" shadow="hover">
            <div class="content">
                <div class="left">
                    <div class="top">
                        <div class="title" :title="props.knowledgeInfo.title" @click="goKnowledge(props.knowledgeInfo.id)">{{ props.knowledgeInfo.title }}</div>
                        <div class="author" @click="goUser(props.knowledgeInfo.userId)">{{ props.knowledgeInfo.userName }}</div>
                    </div>
                    <div class="bottom">
                        <div class="tags">
                            <el-tag v-for="(tag, index) in props.knowledgeInfo.tagBaseInfoList" :key="index" class="tag-atrr">
                                {{ tag.tagName }}
                            </el-tag>
                        </div>
                        <div class="createTime">{{ formattedCreateTime }}</div>
                    </div>
                </div>
                <div class="right">
                    <el-button @click="appreciate()" class="appreciate" :class="{ 'active-appreciate': props.knowledgeInfo.knowledgeRecordsInfo.isAppreciate }">赞赏</el-button>
                    <el-button @click="follow()" class="follow" :class="{ 'active-follow': props.knowledgeInfo.knowledgeRecordsInfo.isFollow }">收藏</el-button>
                    <div :class="['read', {'has-read': props.knowledgeInfo.knowledgeRecordsInfo.readCount > 0}]">
                        <div class="record">阅读数</div>
                        <div>{{ props.knowledgeInfo.knowledgeRecordsInfo.readCount }}</div>
                    </div>
                    <div :class="['reply', {'has-reply': props.knowledgeInfo.knowledgeRecordsInfo.responseCount > 0}]">
                        <div class="record">答复数</div>
                        <div>{{ props.knowledgeInfo.knowledgeRecordsInfo.responseCount }}</div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { reqAppreciate, reqFollow } from '@/api/knowledge';
import { CommonResponseData } from '@/api/knowledge/type';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router'

let $router = useRouter();

let userStore = useUserStore();
// 接受父组件传递过来的props -> 已有问答贴的数据
let props = defineProps(['knowledgeInfo', 'index']);
// 传递实现调用父组件对应方法
let emit = defineEmits(['updateAppreciate', 'updateFollow'])

// 赞赏按钮功能实现
const appreciate = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result : CommonResponseData = await reqAppreciate(props.knowledgeInfo.id);
        if (result.code === 200) {
            emit('updateAppreciate', props.index);
        } else {
            ElMessage.error(result.message);
        }
    }
}

// 关注/收藏按钮功能实现
const follow = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result : CommonResponseData = await reqFollow(props.knowledgeInfo.id);
        if (result.code === 200) {
            emit('updateFollow', props.index);
        } else {
            ElMessage.error(result.message);
        }
    }
}

const formattedCreateTime = computed(() => {
    return props.knowledgeInfo.createTime.split(' ')[0]; // 或 substring(0, 10)
});

const goKnowledge = (knocode: number) => {
    $router.push({ path: '/knowledge', query: { knocode: knocode } });
}

const goUser = (usercode: number) => {
    $router.push({path: '/user/release', query: { usercode: usercode }});
}

</script>

<style scoped lang="scss">
.card {
    width: 100%;

    ::v-deep(.el-card__body) {
        padding: 10px 20px;
    }

    .box-card {
        width: 100%;
        border: 0.5px solid #CCC;
        margin-bottom: 10px;

        .content {
            display: flex;
            justify-content: space-between;
            // border: 1px solid red;

            .left {
                width: 60%;
                height: 82px;
                display: flex;
                flex-direction: column;
                // border: 1px solid red;

                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 40px;

                    // border: 1px solid red;
                    .title {
                        font-size: 20px;
                        font-weight: 700;
                        height: 25px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 350px;
                        cursor: pointer;
                        // border: 1px solid red;
                    }

                    .author {
                        color: #55a6fe;
                        cursor: pointer;
                    }
                }

                .bottom {
                    margin-top: 2px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 40px;
                    // border: 1px solid red;

                    .tags {
                        display: flex;
                        // max-width: 70%;
                        // border: 1px solid green;
                        .tag-atrr {
                            margin-right: 8px;
                            cursor: pointer;
                        }
                    }

                    .createTime {
                        font-size: 15px;
                        color: #A0A0A0;
                    }
                }
            }

            .right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                ::v-deep(.el-button) {
                    width: 60px;
                    height: 60px;
                    font-weight: 700;
                    color: #808080;
                    margin-left: 15px;
                }

                .appreciate.active-appreciate {
                    color: #fff;
                    background-color: #ff6262;
                }

                .follow.active-follow {
                    color: #fff;
                    background-color: #00b13e;
                }

                .read, .reply {
                    width: 60px;
                    height: 60px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #808080;
                    margin-left: 15px;
                    border: 1px solid #DDD;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .record {
                        margin-bottom: 4px;
                    }

                    // border: 1px solid red;
                }

                .read.has-read {
                    border: 1px solid #ffad49;
                    color: #ffad49;
                }

                .reply.has-reply {
                    border: 1px solid #3bb7ff;
                    color: #3bb7ff;
                }

            }
        }
    }
}
</style>