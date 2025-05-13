<template>
    <div class="commentBox">
        <el-dialog v-model="userStore.commentBoxVisiable" title="CodeQnA 评论回复" ref="dialog">
            <el-form-item label="评论对象">
                <el-input :value="props.commentTarget.commentUserName" disabled />
            </el-form-item>
            <div class="comment-border">
                <el-input type="textarea" resize="none" style="border: 0" :rows="5" v-model="commentDto.content"
                    placeholder="请输入评论内容..." />
            </div>
            <div class="tip">使用提示：评论只支持文本输入内容，同时用户需要发表友善的评论，禁止辱骂、嘲讽等内容！</div>
            <template #footer>
                <el-button type="success" size="default" @click="submitComment">发表评论</el-button>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { CommentDto, CommonResponseData } from '@/api/comment/type';
import { reqSubmitComment } from '@/api/comment';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

let props = defineProps(['commentTarget']);
let emit = defineEmits(['loadData']);

const commentDto = ref<CommentDto>({
    'knowledgeId': -1,
    'parentId': 0,
    'ancestorId': 0,
    'userId': -1,
    'content': '',
})

onMounted(() => {
    commentDto.value.knowledgeId = props.commentTarget.knowledgeId;
    commentDto.value.parentId = props.commentTarget.parentId;
    commentDto.value.ancestorId = props.commentTarget.ancestorId;
})

// 提交评论
const submitComment = async () => {
    let result : CommonResponseData = await reqSubmitComment(commentDto.value);
    if (result.code === 200) {
        userStore.commentBoxVisiable = false;
        ElMessage.success('发表成功');
        emit('loadData');
    } else {
        ElMessage.error(result.message);
    }
}

const closeDialog = () => {
    userStore.commentBoxVisiable = false;
}
</script>

<style lang="scss" scoped>
.commentBox {

    ::v-deep(.el-dialog) {
        padding: 0;
        width: 500px;
        // height: 400px;
        border-radius: 5px;
    }

    ::v-deep(.el-dialog__header) {
        display: flex;
        align-items: center;
        background-color: rgb(3, 99, 172);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 15px 5px;
    }

    ::v-deep(.el-dialog__title) {
        font-size: 20px;
        color: #fff;
        font-weight: 700;
    }

    ::v-deep(.el-dialog__body) {
        width: 100%;
        padding: 10px 20px;
    }

    .comment-border {
        margin: 25px 0;
        width: 100%;
        padding: 10px 5px;
        position: relative;
        font-size: 15px;
        color: #aaa;
        font-weight: 500;
        text-align: center;
        border: 2px solid #ebeef5;
        border-radius: 8px;

        :deep(textarea) {
            border: none;
            box-shadow: none;
        }
    }

    .tip {
        font-size: 14px;
        line-height: 16px;
        color: #AAA;
    }

    ::v-deep(.el-dialog__footer) {
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }
}
</style>