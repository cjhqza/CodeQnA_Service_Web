<template>
    <div class="interestedArticle">
        <div class="header">
            <div class="title">兴趣推文</div>
            <svg t="1746782789691" @click="fetchData" class="flush-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8187" width="16" height="16"><path d="M140.209231 537.206154l117.76-98.067692-46.867693-17.329231 14.178462 4.332307C262.301538 302.867692 376.910769 212.676923 512 212.676923s249.698462 90.190769 286.72 213.464615l90.584615-27.175384C840.861538 236.307692 690.018462 118.153846 512 118.153846c-176.443077 0-325.710769 116.184615-375.729231 276.086154L114.215385 385.969231l25.993846 151.236923zM912.935385 643.150769l-24.812308-153.993846-118.941539 100.824615 29.144616 10.633847c-37.809231 121.698462-151.630769 210.707692-285.932308 210.707692-135.089231 0-249.698462-90.190769-286.72-213.464615l-90.584615 27.175384C183.138462 787.692308 333.981538 905.846154 512 905.846154c175.261538 0 323.347692-114.215385 374.547692-272.541539l26.387693 9.846154z" fill="#515151" p-id="8188"></path></svg>
        </div>
        <div class="options">
            <ul v-if="knowledgeInfoArr.length > 0">
                <li v-for="knowledgeInfo in knowledgeInfoArr" :key="knowledgeInfo.id" @click="goKnowledge(knowledgeInfo.id)">
                    <span class="articleTitle" :title="knowledgeInfo.title">{{ knowledgeInfo.title }}</span>
                    <span class="readCount">阅读 {{ knowledgeInfo.knowledgeRecordsInfo.readCount }}</span>
                </li>
            </ul>
            <el-empty v-else description="请登录以及关注标签"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqRelatedArticleInfoList } from '@/api/home';
import { KnowledgeInfoArr, KnowledgeInfoResponseData } from '@/api/home/type';
import { ref, watch } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';

let $router = useRouter();

const knowledgeInfoArr = ref<KnowledgeInfoArr>([]);

let userStore = useUserStore();

// onMounted(() => {
//     fetchData();
// })

const fetchData = async () => {
    knowledgeInfoArr.value = [];
    let result: KnowledgeInfoResponseData = await reqRelatedArticleInfoList();
    if (result.code === 200) {
        knowledgeInfoArr.value = result.data;
    }
}

// 监听登录状态变化
watch(
    () => userStore.userBaseInfo,
    () => {
        fetchData();
    },
    {immediate: true},
)

const goKnowledge = (knocode: number) => {
    $router.push({ path: '/knowledge', query: { knocode: knocode } });
}

</script>

<style scoped lang="scss">
.interestedArticle {
    width: 100%;
    // height: 420px;
    display: flex;
    flex-direction: column;
    border: 1px solid #CCC;
    background-color: #fff;
    border-radius: 8px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 12px 8px;
        border-bottom: 1px solid #DDD;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #efefef;
        // border: 1px solid green;

        .title {
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

        .flush-icon {
            cursor: pointer;
        }

    }

    .options {
        flex: 1;
        width: 100%;
        padding: 5px 0;
        // border: 1px solid green;

        ul {
            display: flex;
            flex-direction: column;

            li {
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                // align-items: center;
                padding: 5px;
                min-height: 40px;
                // border: 1px solid red;
                
                .articleTitle {
                    width: 75%;
                    font-size: 16px;
                    font-weight: 300;
                    word-wrap: break-all;
                    line-height: 22px;
                    // border: 1px solid brown;
                }

                .readCount {
                    flex: 1;
                    text-align: center;
                    font-size: 14px;
                    line-height: 22px;
                    color: #aaa;
                    // border: 1px solid blue;
                }

            }

            li:hover {
                background-color: #eeeeef;
                transition: background-color 0.3s ease;
            }
        }
    }
}
</style>