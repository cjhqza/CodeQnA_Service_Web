<template>
    <div class="sugBox">
        <el-dialog v-model="userStore.sugBoxVisiable" title="CodeQnA 意见箱" ref="dialog">
            <!-- 对话框身体部分结构 -->
            <el-input v-model="aprvSugDto.title" placeholder="意见简要标题" clearable />
            <div class="suggestion-border">
                <el-input type="textarea" resize="none" style="border: 0" :rows="5" v-model="aprvSugDto.content"
                    placeholder="请输入您对本平台的意见或建议..." />
            </div>
            <div class="tip">使用提示：请简要清晰地描述您的建议或问题，我们会认真评估每一条反馈，优质建议将获采纳致谢！</div>
            <template #footer>
                <el-button type="success" size="default" @click="submitSug">发送意见</el-button>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { AprvSugDto, CommonResponseData } from '@/api/report/type';
import { reqSubmitSuggestion } from '@/api/report';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

const aprvSugDto = ref<AprvSugDto>({
    'userId': 0,
    'title': '',
    'content': '',
})

const submitSug = async () => {
    aprvSugDto.value.userId = userStore.userBaseInfo.id;
    let result : CommonResponseData = await reqSubmitSuggestion(aprvSugDto.value);
    if (result.code === 200) {
        ElMessage.success('提交成功');
        userStore.sugBoxVisiable = false;
    } else {
        ElMessage.error(result.message);
    }
}

// 关闭窗口按钮的回调
const closeDialog = () => {
    userStore.sugBoxVisiable = false;
}
</script>

<style lang="scss" scoped>
.sugBox {

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

    .suggestion-border {
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

    .suggestion-border::before {
        content: '意见填写';
        position: absolute;
        top: -8px;
        left: 10%;
        transform: translateX(-50%);
        background: #fff;
        padding: 0 5px;
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