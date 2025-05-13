<template>
    <div class="search">
        <div class="left">
            <div class="title">搜索导航</div>
            <div class="intro">搜索导航提供更多筛选条件去接近和查找你所需的内容，正确地使用可以发现更符合个人需求的内容。</div>
            <div class="func">
                <div class="search-input">
                    <div class="index">
                        <el-select v-model="index" size="default" class="index-select">
                            <el-option label="标题检索" value="1" />
                            <el-option label="博主检索" value="2" />
                        </el-select>
                    </div>
                    <div class="input">
                        <el-input v-if="index === '1'" v-model="knowledgeSearchDto.input" size="default"
                            placeholder="请输入需查找的标题内容" class="input-title"></el-input>
                        <el-autocomplete v-else v-model="userSearchDto.userName" :fetch-suggestions="fetchCbData"
                            :trigger-on-focus="false" @select="fetchSearchData" size="default" placeholder="请输入相关用户名"
                            class="input-blogger"></el-autocomplete>
                        <el-button type="primary" size="default" class="input-btn" :icon="Search"
                            @click="fetchData">搜索</el-button>
                    </div>
                </div>
                <div v-if="index === '1'" class="other">
                    <div class="tag-selector">
                        <div class="left-title">标签:</div>
                        <span class="default" v-if="knowledgeSearchDto.tagBaseInfoList.length === 0">不限</span>
                        <el-tag class="tag-selected" v-else v-for="(tag, index) in knowledgeSearchDto.tagBaseInfoList"
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
                                                <el-tag class="popover-tag"
                                                    :effect="isTagSelected(tags) ? 'dark' : 'light'"
                                                    @click="changeTagEffect(index1, -1)">{{
                                                        tags.tagName }}</el-tag>
                                                <el-tag class="popover-tag"
                                                    :effect="isTagSelected(tag) ? 'dark' : 'light'"
                                                    v-for="(tag, index2) in tags.children" :key="index2"
                                                    @click="changeTagEffect(index1, index2)">
                                                    {{ tag.tagName }}
                                                </el-tag>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                                <el-empty v-else description="暂无标签"></el-empty>
                            </div>
                        </el-popover>
                        <el-tooltip content="最多选择三个标签" placement="top">
                            <svg t="1743865872631" class="tooltip-icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3197" width="15" height="15">
                                <path
                                    d="M512 47.476364c-256.651636 0-465.454545 208.802909-465.454545 465.454545 0 256.698182 208.802909 465.501091 465.454545 465.501091s465.454545-208.802909 465.454545-465.501091-208.802909-465.454545-465.454545-465.454545z m0 861.137454c-218.158545 0-395.636364-177.477818-395.636364-395.682909 0-218.158545 177.477818-395.636364 395.636364-395.636364 218.158545 0 395.636364 177.477818 395.636364 395.636364 0 218.158545-177.477818 395.682909-395.636364 395.682909zM687.522909 418.443636a173.474909 173.474909 0 0 1-138.379636 169.704728v52.130909a34.909091 34.909091 0 0 1-69.818182 0v-83.456a34.909091 34.909091 0 0 1 34.909091-34.909091c57.064727 0 103.470545-46.405818 103.470545-103.470546s-46.405818-103.470545-103.470545-103.470545-103.517091 46.405818-103.517091 103.470545a34.909091 34.909091 0 0 1-69.818182 0 173.474909 173.474909 0 0 1 173.288727-173.288727 173.521455 173.521455 0 0 1 173.335273 173.288727zM512 715.217455a48.081455 48.081455 0 1 0 0 96.116363 48.081455 48.081455 0 0 0 0-96.116363z"
                                    fill="#55a6fe" p-id="3198"></path>
                            </svg>
                        </el-tooltip>
                    </div>
                    <div class="type">
                        <div class="left-title">类型:</div>
                        <ul>
                            <li v-for="(item, index) in types" :key="index"
                                :class="{ active: knowledgeSearchDto.type === item.value }"
                                @click="changeType(item.value)">
                                {{ item.label }}
                            </li>
                        </ul>
                    </div>
                    <div class="sort">
                        <div class="left-title">排序:</div>
                        <ul>
                            <li v-for="(item, index) in categories" :key="index"
                                :class="{ active: knowledgeSearchDto.category === item.value }"
                                @click="changeCategory(item.value)">
                                {{ item.label }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="qna-show" v-if="index === '1'">
                    <div class="qna-container" v-if="hasQnaArr.length > 0">
                        <QnaCard class="qnaItem" v-for="(item, index) in hasQnaArr" :key="index" :qnaInfo="item" />
                    </div>
                    <el-empty v-else description="暂无数据"></el-empty>
                    <el-pagination v-model:current-page="knowledgeSearchDto.pageNum"
                        v-model:page-size="knowledgeSearchDto.pageSize" :page-sizes="[4, 8, 12, 24]" :background="true"
                        layout="prev, pager, next, jumper, ->, sizes, total" :total="knowledgeTotal"
                        @current-change="currentChange" @size-change="sizeChange" />
                </div>
                <div class="blogger-show" v-else>
                    <div class="blogger-container" v-if="hasBloggerArr.length > 0">
                        <BloggerCard class="bloggerItem" v-for="(item, index) in hasBloggerArr" :key="index"
                            :bloggerInfo="item" />
                    </div>
                    <el-empty v-else description="暂无数据"></el-empty>
                    <el-pagination v-model:current-page="userSearchDto.pageNum"
                        v-model:page-size="userSearchDto.pageSize" :page-sizes="[6, 12, 18, 24]" :background="true"
                        layout="prev, pager, next, jumper, ->, sizes, total" :total="userTotal"
                        @current-change="currentChange" @size-change="sizeChange" />
                </div>
            </div>
        </div>
        <div class="right">
            <CodeqnaTip />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import QnaCard from './qna-card/index.vue'
import BloggerCard from './blogger-card/index.vue'
import { KnowledgeInfoArr, KnowledgeSearchDto, PageInfoResponseData, UserSearchDto } from '@/api/search/type';
import { TagBaseInfo } from '@/api/home/type';
import { ElMessage } from 'element-plus';
import { reqKnowledgeInfoListByKnowledgeSearchDto } from '@/api/search';
import { reqTagTree } from '@/api/tag';
import { DtTag, DtTagList, TagTreeResponseData } from '@/api/tag/type';
import { UserCbInfoResponseData, UserSearchInfoList, UserSearchPageInfoResponseData } from '@/api/user/type';
import { reqFindByUserName, reqUserSearchInfoList } from '@/api/user';

const index = ref<string>('1')

const knowledgeSearchDto = ref<KnowledgeSearchDto>({
    'input': '',
    'tagBaseInfoList': [],
    'type': 2,
    'category': 'latest',
    'pageNum': 1,
    'pageSize': 4,
})

let knowledgeTotal = ref<number>(0);

const userSearchDto = ref<UserSearchDto>({
    'userName': '',
    'pageNum': 1,
    'pageSize': 12,
})

let userTotal = ref<number>(0);

// 存储已有的问答帖的数据
let hasQnaArr = ref<KnowledgeInfoArr>([]);

let hasBloggerArr = ref<UserSearchInfoList>([])

// 定义列表项
const types = [
    { label: '全部', value: 2 },
    { label: '问答帖', value: 0 },
    { label: '文章', value: 1 },
];

const categories = [
    { label: '最近的', value: 'latest' },
    { label: '热门的', value: 'popular' },
    { label: '高质量的', value: 'quality' },
    { label: '关注高的', value: 'follow' },
]

// 定义标签数据
const tagList = ref<DtTagList>([])

// 挂载
onMounted(() => {
    getTagTree();
    // await fetchData();
})

const getTagTree = async () => {
    let result: TagTreeResponseData = await reqTagTree();
    if (result.code === 200) {
        tagList.value = result.data
    }
}

const fetchData = async () => {
    if (index.value === '1') {
        let result: PageInfoResponseData = await reqKnowledgeInfoListByKnowledgeSearchDto(knowledgeSearchDto.value);
        if (result.code === 200) {
            hasQnaArr.value = result.data.list;
            knowledgeTotal.value = result.data.total;
        } else {
            ElMessage.error(result.message);
        }
    } else {
        let result: UserSearchPageInfoResponseData = await reqUserSearchInfoList(userSearchDto.value);
        if (result.code === 200) {
            hasBloggerArr.value = result.data.list;
            userTotal.value = result.data.total;
        } else {
            ElMessage.error(result.message);
        }
    }
}

watch(index, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        console.log(newValue)
        console.log(oldValue)
        console.log(index)
        fetchData();
    }
}, { immediate: true })

const currentChange = () => {
    fetchData();
}

const sizeChange = () => {
    fetchData();
}

// 判断某个标签是否被选中
const isTagSelected = (tag: any): boolean => {
    return knowledgeSearchDto.value.tagBaseInfoList.some(
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

    const idx = knowledgeSearchDto.value.tagBaseInfoList.findIndex(
        (selectedTag) => selectedTag.id === tag.id
    );

    if (idx >= 0) {
        knowledgeSearchDto.value.tagBaseInfoList.splice(idx, 1)
    } else {
        if (knowledgeSearchDto.value.tagBaseInfoList.length === 5) {
            ElMessage.warning('最多只能选择5个标签');
            return;
        }

        knowledgeSearchDto.value.tagBaseInfoList.push({ id: tag.id, tagName: tag.tagName } as TagBaseInfo)
    }
}

const changeType = (type: number) => {
    knowledgeSearchDto.value.type = type;
    fetchData();
}

const changeCategory = (category: string) => {
    knowledgeSearchDto.value.category = category;
    fetchData();
}

const fetchCbData = async (keyword: string, cb: any) => {
    console.log(keyword);
    let result: UserCbInfoResponseData = await reqFindByUserName(keyword);
    let showData = result.data.map(item => {
        return {
            value: item.userName,
            userName: item.userName,
        }
    });
    cb(showData);
}

const fetchSearchData = (item: any) => {
    userSearchDto.value.userName = item.value;
    fetchData();
}

</script>

<style scoped lang="scss">
.search {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;

    .left {
        width: 78%;
        display: flex;
        flex-direction: column;
        // border: 1px solid blue;

        .title {
            font-size: 25px;
            font-weight: 900;
        }

        .intro {
            color: #AAA;
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .func {
            display: flex;
            flex-direction: column;

            .search-input {
                display: flex;
                margin-bottom: 20px;

                .index {
                    font-weight: 900;

                    ::v-deep(.index-select) {
                        width: 110px;
                    }
                }

                .input {
                    display: flex;

                    ::v-deep(.input-title) {
                        width: 600px;
                    }

                    ::v-deep(.input-blogger) {
                        width: 600px;
                    }

                    ::v-deep(.input-btn) {
                        margin-left: 20px;
                        width: 80px;
                        // font-size: 18px;
                    }
                }
            }

            .other {
                display: flex;
                flex-direction: column;
                color: #7f7f7f;
                font-size: 16px;
                padding: 20px 10px;
                background-color: #fff;
                border-radius: 5px;
                width: 810px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

                margin-bottom: 20px;

                .tag-selector,
                .type,
                .sort {
                    display: flex;
                    align-items: center;

                    .left-title {
                        margin-right: 10px;
                    }

                    .default {
                        margin-right: 10px;
                        color: #55a6fe;
                    }

                    .tag-selected {
                        margin-right: 10px;
                    }

                    ul {
                        display: flex;

                        li {
                            margin-right: 20px;

                            &.active {
                                color: #55a6fe;
                            }
                        }

                        li:hover {
                            color: #55a6fe;
                            cursor: pointer;
                        }
                    }
                }

                .tag-selector,
                .type {
                    margin-bottom: 18px;
                }

                .tooltip-icon {
                    cursor: pointer;
                    margin-left: 5px;
                }
            }

            .search-pagination {
                width: 90%;
            }

            .qna-show {

                // border: 1px solid red;
                .qna-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    margin-bottom: 20px;

                    .qnaItem {
                        width: 48%;
                    }
                }

                .el-pagination {
                    width: calc(96% + 16px);
                }
            }

            .blogger-show {
                .blogger-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    margin-bottom: 20px;

                    .bloggerItem {
                        width: 15%;
                        border: 1px solid #CCC;
                        border-radius: 5px;
                    }
                }

                .el-pagination {
                    width: calc(90% + 80px);
                }

            }

        }
    }

    .right {
        width: 22%;
    }

}
</style>