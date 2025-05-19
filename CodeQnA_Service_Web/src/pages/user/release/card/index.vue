<template>
    <div class="card">
        <el-card class="child-box" shadow="never">
            <div class="content">
                <div class="left">
                    <div class="top">
                        <div class="top-left">
                            <el-tag class="type" type="success" effect="plain" v-if="props.knowledgeInfo.type === 0"
                                round>问答贴</el-tag>
                            <el-tag class="type" type="danger" effect="plain" v-else round>文章</el-tag>
                            <div class="title" :title="props.knowledgeInfo.title" @click="goKnowledge(props.knowledgeInfo.id)">{{ props.knowledgeInfo.title }}</div>
                        </div>
                        <div class="author" @click="goUser(props.knowledgeInfo.userId)">{{ props.knowledgeInfo.userName }}</div>
                    </div>
                    <div class="bottom">
                        <div class="tags"> <el-tag v-for="(tag, index) in props.knowledgeInfo.tagBaseInfoList" :key="index"
                                class="tag-atrr"> {{ tag.tagName }} </el-tag> </div>
                        <div class="createTime">{{ props.knowledgeInfo.createTime }}</div>
                    </div>
                </div>
                <div class="right">
                    <el-button class="check-btn" @click="goKnowledge(props.knowledgeInfo.id)">查看</el-button>
                    <el-button class="delete-btn" v-if="userStore.userBaseInfo.id === Number($route.query.usercode)" @click="changeStatus">撤贴</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqCancelKnowledge } from '@/api/knowledge';
import { CommonResponseData } from '@/api/knowledge/type';
import useUserStore from '@/store/modules/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

let $router = useRouter();

let $route = useRoute();

let userStore = useUserStore();

let props = defineProps(['knowledgeInfo']);

let emit = defineEmits(['loadData']);

const changeStatus = () => {
    ElMessageBox.confirm('该贴将从该平台下架，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
      let result : CommonResponseData = await reqCancelKnowledge(props.knowledgeInfo.id);
      if (result.code === 200) {
          ElMessage.success('撤贴成功');
          emit('loadData');
      } else {
          ElMessage.error(result.message);
      }
  })
}

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
    // border: 1px solid blue;

    .child-box {
        width: 100%;
        height: 100px;
        border: 0;
        border-bottom: 1px solid #BBB;
        border-radius: 0;

        // border: 1px solid green;

        .content {
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;

            // border: 1px solid red;            
            .left {
                width: 80%;
                // height: 82px;
                display: flex;
                flex-direction: column;
                // border: 1px solid red;

                .top {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    height: 40px;

                    .top-left {
                        display: flex;

                        .type {
                            margin-right: 10px;
                        }

                        .title {
                            font-size: 20px;
                            font-weight: 700;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-width: 350px;
                            cursor: pointer;
                        }
                    }

                    // border: 1px solid red;                    

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
                        .tag-atrr {
                            margin-right: 8px;
                            cursor: pointer;
                        }
                    }

                    .createTime {
                        color: #A0A0A0;
                    }
                }
            }

            .right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 30px;
                // border: 1px solid red;

                ::v-deep(.el-button) {
                    // border: 0;
                    font-size: 14px;
                    font-weight: 500;
                    color: #555;
                }

                .check-btn {
                    background-color: #e5f2fe;
                }

                .delete-btn {
                    background-color: #fde0e0;
                }
            }
        }
    }
}
</style>