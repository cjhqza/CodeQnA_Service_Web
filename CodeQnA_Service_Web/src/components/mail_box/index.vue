<template>
    <div class="mailBox">
        <el-dialog v-model="userStore.mailBoxVisiable" title="CodeQnA 收件箱" ref="dialog">
            <div class="container" v-if="simpleReportList.length > 0">
                <div class="mail">
                    <el-card class="mail-item" v-for="(item, index) in simpleReportList" :key="index" :class="{ active: activeFlag == item.id }"
                        @click="getDetailContent(item.id, item.feedback)">
                        <div class="baseInfo">
                            <div class="content">举报回执：{{ item.feedback }}</div>
                            <div class="time">{{ item.processTime }}</div>
                        </div>
                    </el-card>
                </div>
                <div class="detail">
                    {{ content }}
                </div>
            </div>
            <el-empty v-else description="暂无收到任何信件"></el-empty>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRoute } from 'vue-router';
import { reqReportReceipt } from '@/api/report';
import { SimpleReportResponseData, SimpleReportVoList } from '@/api/report/type';

let $route = useRoute();

let userStore = useUserStore();

const simpleReportList = ref<SimpleReportVoList>([]);

let activeFlag = ref<number>(0);

const content = ref('')

const fetchData = async () => {
    if (userStore.userBaseInfo.token) {
        let result : SimpleReportResponseData = await reqReportReceipt(userStore.userBaseInfo.id);
        if (result.code === 200) {
            simpleReportList.value = result.data;
        }
    }
}

watch(
    () => $route,
    () => {
        fetchData();
    },
    {immediate: true},
)

const getDetailContent = (id: number, ctn: string) => {
    activeFlag.value = id;
    content.value = ctn;
}

</script>

<style lang="scss" scoped>
.mailBox {
    ::v-deep(.el-dialog) {
        display: flex;
        flex-direction: column;
        padding: 0;
        width: 800px;
        height: 500px;
        border-radius: 5px;
    }

    ::v-deep(.el-dialog__header) {
        width: 100%;
        height: 50px;
        padding: 15px 5px;
        display: flex;
        align-items: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: rgb(3, 99, 172);
    }

    ::v-deep(.el-dialog__title) {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
    }

    ::v-deep(.el-dialog__body) {
        flex: 1;
        background-color: #F5F7F8;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        // border: 1px solid red;
    }

    .container {
        display: flex;
        width: 100%;
        height: 450px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        // border: 1px solid red;

        .mail {
            width: 30%;
            // height: 450px;
            border-right: 1px solid #CCC;
            border-bottom-left-radius: 5px;
            overflow: auto;
            // border: 1px solid blue;

            ::v-deep(.el-card__body) {
                padding: 8px;
            }

            .mail-item {
                border: 0;
                // border: 1px solid red;
                border-bottom: 1px solid #BBB;
                border-radius: 0;
                cursor: pointer;

                &.active {
                    background-color: rgb(1, 123, 215);
                    color: #fff;
                }

                .baseInfo {
                    display: flex;
                    flex-direction: column;
                    padding: 5px;

                    .content {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 15px;
                        font-weight: 500;
                        margin-bottom: 8px;
                    }

                    .time {
                        display: flex;
                        justify-content: end;
                        font-size: 12px;
                    }
                }
            }

            .mail-item:hover {
                background-color: rgb(162, 214, 254);
            }

        }

        .detail {
            flex: 1;
            height: 100%;
            padding: 10px 20px;
            font-size: 18px;
            color: #222;
            line-height: 25px;
            border-bottom-right-radius: 5px;
            overflow: auto;
            // border: 1px solid green;
        }
    }

    .el-empty {
        height: 100%;
    }
}
</style>