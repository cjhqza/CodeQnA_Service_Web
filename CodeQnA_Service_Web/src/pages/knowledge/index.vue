<template>
    <div class="knowledge">
        <div class="left">
            <div class="qnaBox">
                <div class="qnaBox-top">
                    <el-tag class="type" size="large" type="success" effect="plain" v-if="knowledgeInfo.type === 0"
                        round>问答贴</el-tag>
                    <el-tag size="large" class="type" type="danger" effect="plain" v-else round>文章</el-tag>
                    <div class="title">{{ knowledgeInfo.title }}</div>
                </div>
                <div class="tags">
                    <el-tag class="tag" v-for="tagBaseInfo in knowledgeInfo.tagBaseInfoList" :key="tagBaseInfo.id">
                        {{ tagBaseInfo.tagName }}
                    </el-tag>
                </div>
                <div class="baseInfo">
                    <div class="autAndTime">
                        <div class="author" @click="goUser(knowledgeInfo.userId)">
                            <img class="head" :src="knowledgeInfo.headImgUrl" alt="">
                            {{ knowledgeInfo.userName }}
                        </div>
                        <div class="time">发布于{{ knowledgeInfo.createTime }}</div>
                    </div>
                    <div class="number">
                        <span class="numInfo">阅读数 {{ knowledgeInfo.knowledgeRecordsInfo.readCount }}</span>
                        <span class="numInfo">答复数 {{ knowledgeInfo.knowledgeRecordsInfo.responseCount }}</span>
                    </div>
                </div>
                <div class="content" v-html="knowledgeInfo.content"></div>
                <div class="func">
                    <div class="func-one">
                        <el-button @click="appreciate" class="appreciate"
                            :class="{ 'active-appreciate': knowledgeInfo.knowledgeRecordsInfo.isAppreciate }">赞赏</el-button>
                        <el-button @click="follow" class="follow"
                            :class="{ 'active-follow': knowledgeInfo.knowledgeRecordsInfo.isFollow }">收藏</el-button>
                    </div>
                    <div class="func-two">
                        <span class="response" @click="openResponseDialog(knowledgeInfo.id)">撰写答复</span>
                        <span class="report" @click="openReportDialog(1, knowledgeInfo.id)">举报</span>
                    </div>
                </div>
            </div>

            <div class="respBox">
                <div class="resp-top">
                    <div class="resp-num">
                        {{ knowledgeInfo.knowledgeRecordsInfo.responseCount }}个答复
                    </div>
                    <div class="options">
                        <el-radio-group v-model="category" @change="getComment" size="small" class="tag-radio-group">
                            <el-radio-button label="得票" value="more" />
                            <el-radio-button label="最新" value="latest" />
                        </el-radio-group>
                    </div>
                </div>
                <div class="resp-bottom">
                    <div class="resp-show" v-if="commentInfoList.length > 0">
                        <div class="resp-cmt" v-for="(comment, index1) in commentInfoList" :key="index1">
                            <div class="resp-autAndTime">
                                <div class="resp-author">
                                    <img class="resp-head" :src="comment.userHeadImgUrl" alt="">
                                    {{ comment.userName }}
                                </div>
                                <div class="resp-time">答复于{{ comment.createTime }}</div>
                            </div>
                            <div class="resp-cnt" v-html="comment.content"></div>
                            <div class="resp-func">
                                <div class="resp-func-one">
                                    <el-button @click="appreciateComment(comment.id, index1, -1)"
                                        class="comment-appreciate"
                                        :class="{ 'active-appreciate': comment.isAppreciate }">有用 {{
                                            comment.appreciateCount }}</el-button>
                                </div>
                                <div class="resp-func-two">
                                    <span class="resp-response"
                                        @click="openCommentDialog(knowledgeInfo.id, comment.id, comment.ancestorId, comment.userName)">回复</span>
                                    <span class="resp-report" @click="openReportDialog(2, comment.id)">举报</span>
                                </div>
                            </div>
                            <div class="resp-subshow" v-if="comment.children.length > 0">
                                <div class="resp-subcmt" v-for="(subcomment, index2) in comment.children" :key="index2">
                                    <div class="resp-subcnt">
                                        <span class="resp-subcnt-left-author">{{ subcomment.userName }}</span>
                                        <span>：</span>
                                        <span class="resp-suncnt-right-author">@{{ subcomment.toUserName
                                        }}&nbsp;</span>
                                        <span class="resp-subcnt-content">{{ subcomment.content }}</span>
                                    </div>
                                    <div class="resp-subfunc">
                                        <div class="resp-subfunc-left">
                                            <svg @click="appreciateComment(comment.id, index1, index2)"
                                                v-if="!subcomment.isAppreciate" t="1745402406546"
                                                class="resp-subfunc-left-icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="2359" width="16" height="16">
                                                <path
                                                    d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                                                    fill="#5D5D5D" p-id="2360"></path>
                                                <path
                                                    d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                                                    fill="#5D5D5D" p-id="2361"></path>
                                                <path
                                                    d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                                                    fill="#5D5D5D" p-id="2362"></path>
                                            </svg>
                                            <svg @click="appreciateComment(comment.id, index1, index2)" v-else
                                                t="1747016934903" class="resp-subfunc-left-icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2390" width="16"
                                                height="16">
                                                <path
                                                    d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                                                    fill="#fe1313" p-id="2391"></path>
                                                <path
                                                    d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                                                    fill="#fe1313" p-id="2392"></path>
                                                <path
                                                    d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                                                    fill="#fe1313" p-id="2393"></path>
                                            </svg>
                                            <span class="resp-subfunc-left-count">{{ subcomment.appreciateCount
                                                }}</span>
                                            <div class="resp-subfunc-left-time">回复于{{ subcomment.createTime }}</div>
                                        </div>
                                        <div class="resp-subfunc-right">
                                            <span class="resp-subfunc-right-response"
                                                @click="openCommentDialog(knowledgeInfo.id, subcomment.id, subcomment.ancestorId, subcomment.userName)">回复</span>
                                            <span class="resp-subfunc-right-report"
                                                @click="openReportDialog(2, subcomment.id)">举报</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-empty v-else description="暂无回答"></el-empty>
                </div>
            </div>
        </div>
        <div class="right">
            <CodeqnaTip />
        </div>

        <ResponseBox v-if="userStore.responseBoxVisiable" :commentTarget="commentTarget" @loadData="loadData" />
        <CommentBox v-if="userStore.commentBoxVisiable" :commentTarget="commentTarget" @loadData="loadData" />
        <ReportBox v-if="userStore.reportBoxVisiable" :reportTarget="reportTarget" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user/index';
import { reqAppreciate, reqFollow, reqKnowledgeInfoById } from '@/api/knowledge';
import { CommonResponseData, KnowledgeInfo, KnowledgeResponseData } from '@/api/knowledge/type';
import { ElMessage } from 'element-plus';
import { reqAppreciateComment, reqCommentInfoByKnowledgeIdAndCategory } from '@/api/comment';
import { CommentInfoList, CommentInfoResponseData } from '@/api/comment/type';
// 获取路由器
let $router = useRouter();
// 获取当前的路由信息
let $route = useRoute();
let userStore = useUserStore();

const category = ref<string>('more')

const knowledgeInfo = ref<KnowledgeInfo>({
    'id': -1,
    'type': -1,
    'userId': -1,
    'userName': '',
    'headImgUrl': '',
    'title': '',
    'content': '',
    'tagBaseInfoList': [],
    'createTime': '',
    'knowledgeRecordsInfo': {
        'readCount': -1,
        'responseCount': -1,
        'isAppreciate': false,
        'isFollow': false,
    },
});

const commentInfoList = ref<CommentInfoList>([])

const reportTarget = {
    'targetType': -1,
    'targetId': -1
}

const commentTarget = {
    'knowledgeId': -1,
    'parentId': 0,
    'ancestorId': 0,
    'commentUserName': '',
}

// onMounted(async () => {
//     // 获取知识信息数据
//     await getKnowledge();
//     // 获取答复评论数据
//     await getComment();
// })

const getKnowledge = async () => {
    let result: KnowledgeResponseData = await reqKnowledgeInfoById(Number($route.query.knocode));
    if (result.code === 200) {
        knowledgeInfo.value = result.data;
    } else {
        ElMessage.error(result.message);
    }
}

const getComment = async () => {
    let result: CommentInfoResponseData = await reqCommentInfoByKnowledgeIdAndCategory(Number($route.query.knocode), category.value);
    if (result.code === 200) {
        commentInfoList.value = result.data;
    }
}

watch(() => userStore.userBaseInfo,
    async () => {
        // 获取知识信息数据
        await getKnowledge();
        // 获取答复评论数据
        await getComment();
    },
    { immediate: true },
)

const appreciate = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result: CommonResponseData = await reqAppreciate(knowledgeInfo.value.id);
        if (result.code === 200) {
            knowledgeInfo.value.knowledgeRecordsInfo.isAppreciate = !knowledgeInfo.value.knowledgeRecordsInfo.isAppreciate;
        } else {
            ElMessage.error(result.message);
        }
    }
}

const appreciateComment = async (commentId: number, index1: number, index2: number) => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result: CommonResponseData = await reqAppreciateComment(commentId);
        if (result.code === 200) {
            if (index2 === -1) {
                let flag: boolean = commentInfoList.value[index1].isAppreciate
                if (flag) {
                    commentInfoList.value[index1].appreciateCount -= 1;
                } else {
                    commentInfoList.value[index1].appreciateCount += 1;
                }
                commentInfoList.value[index1].isAppreciate = !flag;
            } else {
                let flag: boolean = commentInfoList.value[index1].children[index2].isAppreciate;
                if (flag) {
                    commentInfoList.value[index1].children[index2].appreciateCount -= 1;
                } else {
                    commentInfoList.value[index1].children[index2].appreciateCount += 1;
                }
                commentInfoList.value[index1].children[index2].isAppreciate = !flag;
            }
        } else {
            ElMessage.error(result.message);
        }
    }
}

const follow = async () => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        let result: CommonResponseData = await reqFollow(knowledgeInfo.value.id);
        if (result.code === 200) {
            knowledgeInfo.value.knowledgeRecordsInfo.isFollow = !knowledgeInfo.value.knowledgeRecordsInfo.isFollow;
        } else {
            ElMessage.error(result.message);
        }
    }
}

const openResponseDialog = (knoId: number) => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        commentTarget.knowledgeId = knoId;
        commentTarget.parentId = 0;
        commentTarget.ancestorId = 0;
        userStore.responseBoxVisiable = true;
    }
}

const openCommentDialog = (knoId: number, parId: number, ancId: number, userName: string) => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        commentTarget.knowledgeId = knoId;
        commentTarget.parentId = parId;
        commentTarget.ancestorId = ancId === 0 ? parId : ancId;
        commentTarget.commentUserName = userName;
        userStore.commentBoxVisiable = true;
    }
}

const openReportDialog = (type: number, id: number) => {
    if (!userStore.userBaseInfo.token) {
        userStore.loginVisiable = true;
    } else {
        reportTarget.targetType = type;
        reportTarget.targetId = id;
        userStore.reportBoxVisiable = true;
    }
}

const goUser = (usercode: number) => {
    $router.push({path: '/user/release', query: { usercode: usercode }});
}

const loadData = async () => {
    await getKnowledge();
    await getComment();
}
</script>

<style scoped lang="scss">
.knowledge {
    // position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    // border: 1px solid red;

    .left {
        width: 56%;
        padding-right: 20px;
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-direction: column;
        // border: 1px solid red;

        .qnaBox {
            width: 100%;
            padding: 10px 15px;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #BBB;

            .qnaBox-top {
                display: flex;
                align-items: center;
                margin-bottom: 15px;

                .type {
                    margin-right: 15px;
                }

                .title {
                    font-size: 30px;
                    font-weight: 500;
                }
            }


            .tags {
                display: flex;

                .tag {
                    margin-right: 5px;
                }
            }

            .baseInfo {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .autAndTime {
                    display: flex;
                    align-items: center;
                    padding: 15px 0;

                    .author {
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        margin-right: 15px;

                        .head {
                            border-radius: 50%;
                            width: 30px;
                            margin-right: 5px;
                        }
                    }

                    .time {
                        font-size: 12px;
                        color: #555;
                    }
                }

                .number {
                    .numInfo {
                        font-size: 14px;
                        color: #333;
                        margin-left: 15px;
                    }
                }
            }


            .content {
                margin-bottom: 15px;
            }

            .func {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;

                .func-one {
                    .appreciate.active-appreciate {
                        color: #fff;
                        background-color: #ff6262;
                    }

                    .follow.active-follow {
                        color: #fff;
                        background-color: #00b13e;
                    }
                }

                .func-two {
                    font-size: 14px;
                    color: #555;

                    .response {
                        cursor: pointer;
                    }

                    .report {
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }
            }
        }

        .respBox {
            margin-top: 20px;
            width: 100%;
            background-color: #fff;
            border: 1px solid #BBB;
            border-radius: 5px;

            .resp-top {
                padding: 5px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #CCC;
            }

            .resp-bottom {
                .resp-show {
                    display: flex;
                    flex-direction: column;

                    .resp-cmt {
                        display: flex;
                        flex-direction: column;
                        border-bottom: 1px solid #CCC;
                        padding: 5px 10px;

                        .resp-autAndTime {
                            display: flex;
                            align-items: center;
                            padding: 15px 0;

                            .resp-author {
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                margin-right: 15px;

                                .resp-head {
                                    border-radius: 50%;
                                    width: 30px;
                                    margin-right: 5px;
                                }
                            }

                            .resp-time {
                                font-size: 12px;
                                color: #555;
                            }
                        }

                        .resp-cnt {
                            margin-bottom: 15px;
                        }

                        .resp-func {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 10px 0;

                            .resp-func-one {
                                .comment-appreciate.active-appreciate {
                                    color: #fff;
                                    background-color: #19b2ff;
                                }
                            }

                            .resp-func-two {
                                font-size: 14px;
                                color: #555;

                                .resp-response {
                                    cursor: pointer;
                                }

                                .resp-report {
                                    margin-left: 15px;
                                    cursor: pointer;
                                }
                            }
                        }

                        .resp-subshow {
                            // height: 50px;
                            background-color: rgb(249, 249, 249);
                            border-radius: 5px;
                            border: 0;
                            display: flex;
                            flex-direction: column;

                            .resp-subcmt {
                                display: flex;
                                flex-direction: column;
                                padding: 10px 5px;

                                .resp-subcnt {
                                    color: #333;
                                    font-size: 14px;
                                    padding: 5px 0;
                                    line-height: 18px;

                                    .resp-subcnt-left-author {
                                        cursor: pointer;
                                        font-weight: 500;
                                        color: #0db6fe;
                                    }

                                    .resp-suncnt-right-author {
                                        cursor: pointer;
                                        font-weight: 400;
                                        color: #0db6fe;
                                    }
                                }

                                .resp-subfunc {
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    color: #555;

                                    .resp-subfunc-left {
                                        display: flex;
                                        align-items: center;

                                        .resp-subfunc-left-icon {
                                            cursor: pointer;
                                            margin-right: 5px;
                                        }

                                        .resp-subfunc-left-count {
                                            color: #555;
                                            font-size: 14px;
                                            margin-right: 10px;
                                        }

                                        .resp-subfunc-left-time {
                                            font-size: 13px;

                                        }
                                    }

                                    .resp-subfunc-right {
                                        display: flex;
                                        font-size: 13px;

                                        .resp-subfunc-right-response {
                                            cursor: pointer;
                                        }

                                        .resp-subfunc-right-report {
                                            margin-left: 5px;
                                            cursor: pointer;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    .resp-cmt:last-child {
                        border-bottom: 0;
                    }
                }

            }
        }
    }

    .right {
        width: 22%;
        // border: 1px solid blue;
    }
}

</style>