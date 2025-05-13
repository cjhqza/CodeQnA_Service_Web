<template>
    <div class="reportBox">
        <el-dialog v-model="userStore.reportBoxVisiable" title="CodeQnA 举报提交" ref="dialog">
            <!-- 对话框身体部分结构 -->
            <el-form-item label="举报类型">
                <el-input :value="findTargetByComputed" disabled />
            </el-form-item>
            <div class="report-border">
                <el-input type="textarea" resize="none" style="border: 0" :rows="5" v-model="reportDto.reportReason"
                    placeholder="请输入举报原因..." />
            </div>
            <div class="tip">使用提示：请如实描述当前被举报对象的不良或违规等行为，我们会认真核实举报信息内容，检测到恶意举报行为也会严惩不贷！</div>
            <template #footer>
                <el-button type="danger" size="default" @click="submit">提交举报</el-button>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { CommonResponseData, ReportDto } from '@/api/report/type';
import { reqSubmitReport } from '@/api/report';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

const reportDto = ref<ReportDto>({
    'targetType': -1,
    'targetId': -1,
    'reporterId': -1,
    'reportReason': '',
});

let props = defineProps(['reportTarget']);

onMounted(() => {
    reportDto.value.targetType = props.reportTarget.targetType;
    reportDto.value.targetId = props.reportTarget.targetId;
})

const findTargetByComputed = computed(() => {
    if (reportDto.value.targetType === 0) {
        return '用户';
    }
    return reportDto.value.targetType === 1 ? '知识' : '评论';
})

// 提交举报按钮功能
const submit = async () => {
    let result : CommonResponseData = await reqSubmitReport(reportDto.value);
    if (result.code === 200) {
        userStore.reportBoxVisiable = false;
        ElMessage.success("提交成功");
    } else {
        ElMessage.error(result.message);
    }
}

// 关闭窗口按钮的回调
const closeDialog = () => {
    userStore.reportBoxVisiable = false;
}
</script>

<style lang="scss" scoped>
.reportBox {

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

    .report-border {
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

    .report-border::before {
        content: '举报原因填写';
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