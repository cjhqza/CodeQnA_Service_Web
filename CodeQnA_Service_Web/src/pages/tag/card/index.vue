<template>
    <div class="card">
        <el-card class="box-card" shadow="hover">
            <div class="top">
                <el-tag size="large" class="tag-name">{{ props.tagSearchInfo.dtTag.tagName }}</el-tag>
                <el-button type="primary" v-if="!props.tagSearchInfo.isFollow" @click="follow">关注</el-button>
                <el-button type="primary" v-else @click="follow">取消关注</el-button>
            </div>
            <div class="mid" :title="props.tagSearchInfo.dtTag.tagIntro">
                {{ props.tagSearchInfo.dtTag.tagIntro }}
            </div>
            <div class="bottom">
                <div class="left">
                    问答贴: {{ props.tagSearchInfo.postNum }} 则
                </div>
                <div class="right">
                    文章: {{ props.tagSearchInfo.articleNum }} 篇
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqFollow } from '@/api/tag';
import { CommonResponseData } from '@/api/tag/type';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
// 接受父组件传递过来的props -> 已有标签的数据
let props = defineProps(['tagSearchInfo', 'index']);
// 传递实现调用父组件对应方法
let emit = defineEmits(['updateFollow'])

// 关注按钮功能实现
const follow = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result : CommonResponseData = await reqFollow(props.tagSearchInfo.dtTag.id);
        if (result.code === 200) {
            emit('updateFollow', props.index);
        } else {
            ElMessage.error(result.message);
        }
    }
}

</script>

<style scoped lang="scss">
.card {
    .box-card {
        .top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .tag-name {
                font-size: 16px;
            }
        }

        .mid {
            height: 100px;
            margin-bottom: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 20px;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            // border: 1px solid blue;
        }

        .bottom {
            display: flex;
            justify-content: center;
            font-size: 14px;
            color: #999;

            .left {
                margin-right: 20px;
            }
        }
    }
}
</style>