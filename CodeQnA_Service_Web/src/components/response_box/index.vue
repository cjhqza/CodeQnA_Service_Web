<template>
    <div class="responseBox" @click.self="closeDialog">
        <div class="modal-content">
            <div class="header">CodeQnA 撰写回答</div>
            <div class="response-border">
                <QuillEditor :content="commentDto.content" @updateContent="updateContent" />
            </div>
            <div class="tip">使用提示：撰写的答复内容建议是撰写者经过验证的有效的解决方案，请不要发表毫无意义的内容。</div>
            <div class="footer">
                <el-button type="success" size="default" @click="submitComment">发布答复</el-button>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </div>
        </div>

        <!-- <el-dialog v-model="userStore.responseBoxVisiable" title="CodeQnA 撰写回答" ref="dialog">
                <div class="response-border">
                    <QuillEditor />
                    <div class="tip">使用提示：撰写的答复内容建议是撰写者经过验证的有效的解决方案，请不要发表毫无意义的内容。</div>
                </div>
                <template #footer>
                    <el-button type="success" size="default">发布答复</el-button>
                    <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
                </template>
        </el-dialog> -->
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { CommentDto, CommonResponseData } from '@/api/comment/type';
import useUserStore from '@/store/modules/user';
import { reqSubmitComment } from '@/api/comment';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

let commentDto = ref<CommentDto>({
    'knowledgeId': -1,
    'parentId': 0,
    'ancestorId': 0,
    'userId': -1,
    'content': '',
})

let props = defineProps(['commentTarget'])
let emit = defineEmits(['loadData'])

onMounted(() => {
    commentDto.value.knowledgeId = props.commentTarget.knowledgeId;
})

const closeDialog = () => {
    userStore.responseBoxVisiable = false;
}

const updateContent = (content: string) => {
    commentDto.value.content = content;
}

const submitComment = async () => {
    let result : CommonResponseData = await reqSubmitComment(commentDto.value);
    if (result.code === 200) {
        userStore.responseBoxVisiable = false;
        ElMessage.success('发表成功');
        emit('loadData');
    } else {
        ElMessage.error(result.message);
    }
}
</script>

<style lang="scss" scoped>
.responseBox {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    // border: 1px solid red;

    .modal-content {
        background: #fcfcfc;
        width: 50%;
        height: 100vh;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        padding: 10px 5px;
        z-index: 1001;
        overflow-y: auto;

        .header {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 20px;
        }

        .response-border {
            display: flex;
            flex-direction: column;
            height: 400px;
            // border: 1px solid red;
        }

        .tip {
            margin-top: 80px;
            text-align: center;
            font-size: 14px;
            line-height: 16px;
            color: #AAA;
        }

        .footer {
            display: flex;
            justify-content: center;
            padding: 10px 0;
        }
    }


    // ::v-deep(.el-dialog) {
    //     padding: 0;
    //     width: 1050px;
    //     // height: 400px;
    //     border-radius: 5px;
    // }

    // ::v-deep(.el-dialog__header) {
    //     display: flex;
    //     align-items: center;
    //     background-color: rgb(3, 99, 172);
    //     border-top-left-radius: 5px;
    //     border-top-right-radius: 5px;
    //     padding: 15px 5px;
    // }

    // ::v-deep(.el-dialog__title) {
    //     font-size: 20px;
    //     color: #fff;
    //     font-weight: 700;
    // }

    // ::v-deep(.el-dialog__body) {
    //     width: 100%;
    //     // min-height: 500px;
    //     padding: 10px 20px;
    // }

    // .response-border {
    //     display: flex;
    //     flex-direction: column;
    //     height: 480px;
    //     .tip {
    //         margin-top: 60px;
    //         text-align: center;
    //         font-size: 14px;
    //         line-height: 16px;
    //         color: #AAA;
    //     }
    // }


    // ::v-deep(.el-dialog__footer) {
    //     display: flex;
    //     justify-content: center;
    //     padding: 10px 0;
    // }
}
</style>