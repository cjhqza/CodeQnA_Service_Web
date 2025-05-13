<template>
    <div class="createPost">
        <div class="left">
            <div class="title" @click="createDraft">问答发布</div>
            <div class="intro">快速发布你的技术问题或解决方案，通过清晰描述和精准标签，让内容更容易被搜索和理解。</div>
            <div class="draft">
                <div class="draftTitle">
                    <span>您保存的草稿</span>
                </div>
                <div class="options">
                    <ul v-if="draftList.length > 0">
                        <li class="draftItem" v-for="(draft, index) in draftList" :key="index"
                            :class="{ active: activeFlag == draft.dtKnowledge.id }" @click="selectDraft(draft)">
                            <span class="knowledgeTitle" :title="draft.dtKnowledge.title">{{ draft.dtKnowledge.title
                            }}</span>
                            <span class="time">{{ draft.dtKnowledge.createTime }}</span>
                        </li>
                    </ul>
                    <el-empty v-else description="暂无保存的草稿"></el-empty>
                </div>
            </div>
        </div>
        <div class="right">
            <el-input class="inputTitle" v-model="knowledgeDraftDto.dtKnowledge.title"
                placeholder="请输入标题...(要求不超过30字)"></el-input>
            <QuillEditor :content="knowledgeDraftDto.dtKnowledge.content" @updateContent="updateContent" />
            <div class="tag-selector">
                <div class="left-title">问答标签: </div>
                <span class="default" v-if="knowledgeDraftDto.tagBaseInfoList.length === 0">请点击右方按钮选择相关标签</span>
                <el-tag class="tag-selected" v-else v-for="(tag, index) in knowledgeDraftDto.tagBaseInfoList"
                    :key="index">{{ tag.tagName
                    }}</el-tag>
                <el-popover placement="right" :width="500" trigger="click" class="search-popover">
                    <template #reference>
                        <el-button type="primary" size="small">+添加关联标签</el-button>
                    </template>
                    <div class="tags-popover">
                        <div class="popover-top">标签</div>
                        <div class="popover-bottom" v-if="tagList.length > 0">
                            <el-tabs tab-position="left" style="height: 300px;" class="search-tabs">
                                <el-tab-pane v-for="(tags, index1) in tagList" :key="index1">
                                    <template #label>
                                        <div class="popover-left">{{ tags.tagName }}</div>
                                    </template>
                                    <div class="popover-tip">添加标签</div>
                                    <div class="popover-right">
                                        <el-tag class="popover-tag" :effect="isTagSelected(tags) ? 'dark' : 'light'"
                                            @click="changeTagEffect(index1, -1)">{{
                                                tags.tagName }}</el-tag>
                                        <el-tag class="popover-tag" :effect="isTagSelected(tag) ? 'dark' : 'light'"
                                            v-for="(tag, index2) in tags.children" :key="index2"
                                            @click="changeTagEffect(index1, index2)">
                                            {{ tag.tagName }}
                                        </el-tag>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-popover>
                <el-tooltip content="最多选择5个标签" placement="top">
                    <svg t="1743865872631" class="tooltip-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3197" width="15" height="15">
                        <path
                            d="M512 47.476364c-256.651636 0-465.454545 208.802909-465.454545 465.454545 0 256.698182 208.802909 465.501091 465.454545 465.501091s465.454545-208.802909 465.454545-465.501091-208.802909-465.454545-465.454545-465.454545z m0 861.137454c-218.158545 0-395.636364-177.477818-395.636364-395.682909 0-218.158545 177.477818-395.636364 395.636364-395.636364 218.158545 0 395.636364 177.477818 395.636364 395.636364 0 218.158545-177.477818 395.682909-395.636364 395.682909zM687.522909 418.443636a173.474909 173.474909 0 0 1-138.379636 169.704728v52.130909a34.909091 34.909091 0 0 1-69.818182 0v-83.456a34.909091 34.909091 0 0 1 34.909091-34.909091c57.064727 0 103.470545-46.405818 103.470545-103.470546s-46.405818-103.470545-103.470545-103.470545-103.517091 46.405818-103.517091 103.470545a34.909091 34.909091 0 0 1-69.818182 0 173.474909 173.474909 0 0 1 173.288727-173.288727 173.521455 173.521455 0 0 1 173.335273 173.288727zM512 715.217455a48.081455 48.081455 0 1 0 0 96.116363 48.081455 48.081455 0 0 0 0-96.116363z"
                            fill="#55a6fe" p-id="3198"></path>
                    </svg>
                </el-tooltip>
            </div>
            <div class="bottom">
                <div class="prompt">
                    <div class="unsaveDraft" v-if="!knowledgeDraftDto.dtKnowledge.createTime">当前草稿未有进行任何保存</div>
                    <div class="saveDraft" v-else>草稿于{{ knowledgeDraftDto.dtKnowledge.updateTime }}已保存</div>
                </div>
                <div class="btns">
                    <el-button type="info" class="save" @click="saveDraft">保存草稿</el-button>
                    <el-button class="publish" @click="publish">发布问答</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { reqTagTree } from '@/api/tag';
import { DtTag, DtTagList, TagTreeResponseData } from '@/api/tag/type';
import { CommonResponseData, KnowledgeDraftInfo, KnowledgeDraftInfoList, KnowledgeDraftInfoResponseData, KnowledgeIdResponseData, TagBaseInfo } from '@/api/creation/type';
import { reqAddDraftKnowledge, reqDraftKnowledge, reqPublishKnowledge, reqSaveDraftKnowledge } from '@/api/creation';

let activeFlag = ref<number>(-1);

const draftList = ref<KnowledgeDraftInfoList>([])

const knowledgeDraftDto = ref<KnowledgeDraftInfo>({
    'dtKnowledge': {
        'id': -1,
        'type': 0,
        'userId': -1,
        'title': '',
        'content': '',
        'status': -1,
        'createTime': '',
        'updateTime': '',
    },
    'tagBaseInfoList': []
});

// 定义标签数据
const tagList = ref<DtTagList>([])

// 挂载
onMounted(async () => {
    await getTagTree();
    await getDraft();
})

const getTagTree = async () => {
    let result: TagTreeResponseData = await reqTagTree();
    if (result.code === 200) {
        tagList.value = result.data
    }
}

const getDraft = async () => {
    let result: KnowledgeDraftInfoResponseData = await reqDraftKnowledge(0);
    if (result.code === 200) {
        draftList.value = result.data;
    }
}

// 判断某个标签是否被选中
const isTagSelected = (tag: any): boolean => {
    return knowledgeDraftDto.value.tagBaseInfoList.some(
        (selectedTag) => selectedTag.id === tag.id
    );
};

const changeTagEffect = (index1: number, index2: number) => {
    let tag: DtTag = {} as DtTag;
    if (index2 === -1) {
        tag = tagList.value[index1];
    } else {
        tag = tagList.value[index1].children[index2];
    }

    const idx = knowledgeDraftDto.value.tagBaseInfoList.findIndex(
        (selectedTag) => selectedTag.id === tag.id
    );

    if (idx >= 0) {
        knowledgeDraftDto.value.tagBaseInfoList.splice(idx, 1)
    } else {
        if (knowledgeDraftDto.value.tagBaseInfoList.length === 5) {
            ElMessage.warning('最多只能选择5个标签');
            return;
        }

        knowledgeDraftDto.value.tagBaseInfoList.push({ id: tag.id, tagName: tag.tagName } as TagBaseInfo)
    }
}

const selectDraft = (draft: KnowledgeDraftInfo) => {
    knowledgeDraftDto.value = {
        dtKnowledge: { ...draft.dtKnowledge },
        tagBaseInfoList: [...draft.tagBaseInfoList],
    }
    activeFlag.value = draft.dtKnowledge.id;
}

const updateContent = (content: string) => {
    knowledgeDraftDto.value.dtKnowledge.content = content;
}

// 保存草稿
const saveDraft = async () => {
    if (knowledgeDraftDto.value.dtKnowledge.id === -1) {
        // 新建草稿
        let result: KnowledgeIdResponseData = await reqAddDraftKnowledge(knowledgeDraftDto.value);
        if (result.code === 200) {
            ElMessage.success('保存成功');
            activeFlag.value = result.data
        } else {
            ElMessage.error(result.message);
        }
    } else {
        // 保存已有的草稿
        let result: CommonResponseData = await reqSaveDraftKnowledge(knowledgeDraftDto.value);
        if (result.code === 200) {
            ElMessage.success('保存成功');
        } else {
            ElMessage.error(result.message);
        }
    }

    // 重新获取草稿
    await getDraft();

    const idx = draftList.value.findIndex((item) => item.dtKnowledge.id === knowledgeDraftDto.value.dtKnowledge.id);
    selectDraft(draftList.value[idx]);
}

// 发布问答
const publish = async () => {
    let result: CommonResponseData = await reqPublishKnowledge(knowledgeDraftDto.value)
    if (result.code === 200) {
        ElMessage.success('已发布，请等待审批');
        knowledgeDraftDto.value = {
            dtKnowledge: {
                id: -1,
                type: 0,
                userId: -1,
                title: '',
                content: '',
                status: -1,
                createTime: '',
                updateTime: '',
            },
            tagBaseInfoList: [],
        };
        // 重新获取草稿
        await getDraft();
    } else {
        ElMessage.error(result.message);
    }
}

// 新建草稿
const createDraft = () => {
    activeFlag.value = -1;
    knowledgeDraftDto.value = {
        dtKnowledge: {
            id: -1,
            type: 0,
            userId: -1,
            title: '',
            content: '',
            status: -1,
            createTime: '',
            updateTime: '',
        },
        tagBaseInfoList: [],
    };
}

</script>

<style lang="scss" scoped>
.createPost {
    width: 100%;
    padding: 20px 0;
    display: flex;
    // border: 1px solid red;

    .left {
        width: 22%;
        // border: 1px solid green;

        .title {
            cursor: pointer;
            font-size: 25px;
            font-weight: 900;
        }

        .intro {
            color: #AAA;
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .draft {
            width: 100%;
            min-height: 400px;
            border: 1px solid #BBB;
            background-color: #fff;
            border-radius: 6px;
            margin-bottom: 20px;

            .draftTitle {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 12px 8px;
                border-bottom: 1px solid #DDD;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background-color: #fafafa;
                // border: 1px solid green;

                span {
                    // font-family: 'Montserrat', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    // background: linear-gradient(90deg, #f42828, #F59E0B);
                    // background-clip: text;
                    // -webkit-text-fill-color: transparent;
                    // margin-left: 4px;
                    // position: relative;
                    // display: inline-block;
                }

            }

            .options {
                flex: 1;
                width: 100%;
                padding: 5px 0;

                ul {
                    display: flex;
                    flex-direction: column;

                    .draftItem {
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                        padding: 10px 5px;
                        min-height: 40px;

                        &.active {
                            background-color: rgb(78, 178, 255);
                            color: #fff;
                        }

                        .knowledgeTitle {
                            width: 70%;
                            font-size: 16px;
                            font-weight: 300;
                            word-wrap: break-all;
                            line-height: 22px;
                        }

                        .time {
                            flex: 1;
                            text-align: center;
                            font-size: 14px;
                            line-height: 22px;
                            // color: #aaa;
                        }
                    }

                    li:hover {
                        background-color: #eeeeef;
                        transition: background-color 0.3s ease;
                    }
                }
            }
        }
    }

    .right {
        width: 78%;
        display: flex;
        flex-direction: column;
        padding-left: 20px;

        // border: 1px solid blue;

        ::v-deep(.inputTitle) {
            font-size: 20px;
            height: 50px;
            margin-bottom: 20px;
            border: 1px solid #CCC;
            border-radius: 5px;
        }

        .tag-selector {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            margin-top: 60px;
            margin-bottom: 20px;
            background: #fff;
            border: 1px solid #CCC;
            border-radius: 5px;

            .left-title {
                color: #777;
                margin-right: 10px;
            }

            .default {
                font-size: 13px;
                color: #888;
                margin-right: 10px;
            }

            .tag-selected {
                margin-right: 10px;
            }

            .tooltip-icon {
                cursor: pointer;
                margin-left: 5px;
            }
        }

        .bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            border: 1px solid #CCC;
            border-radius: 5px;
            padding: 10px 20px;

            .prompt {
                font-size: 15px;
                color: #AAA;
            }

            .btns {
                display: flex;
            }

        }

    }


}
</style>