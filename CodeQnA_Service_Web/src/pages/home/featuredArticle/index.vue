<template>
    <div class="featuredArticle">
        <div class="title">
            <!-- <svg t="1743604449321" class="icon-hot" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9377" width="20" height="20"><path d="M663.473231 448C568.713846 330.318769 572.573538 194.993231 572.573538 0 330.24 140.760615 339.337846 470.016 330.24 576c-76.445538-66.087385-90.899692-224.019692-90.899692-224.019692C158.601846 395.894154 118.153846 513.024 118.153846 608.019692 118.153846 837.750154 294.478769 1024 512 1024s393.846154-186.249846 393.846154-416.019692c0-136.507077-94.916923-199.483077-93.735385-385.496616-132.883692 40.014769-157.223385 153.442462-148.637538 225.516308z" fill="#f5400b" p-id="9378"></path></svg> -->
            <span>精彩文章</span>
            <svg t="1746782789691" @click="fetchData" class="flush-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8187" width="16" height="16"><path d="M140.209231 537.206154l117.76-98.067692-46.867693-17.329231 14.178462 4.332307C262.301538 302.867692 376.910769 212.676923 512 212.676923s249.698462 90.190769 286.72 213.464615l90.584615-27.175384C840.861538 236.307692 690.018462 118.153846 512 118.153846c-176.443077 0-325.710769 116.184615-375.729231 276.086154L114.215385 385.969231l25.993846 151.236923zM912.935385 643.150769l-24.812308-153.993846-118.941539 100.824615 29.144616 10.633847c-37.809231 121.698462-151.630769 210.707692-285.932308 210.707692-135.089231 0-249.698462-90.190769-286.72-213.464615l-90.584615 27.175384C183.138462 787.692308 333.981538 905.846154 512 905.846154c175.261538 0 323.347692-114.215385 374.547692-272.541539l26.387693 9.846154z" fill="#515151" p-id="8188"></path></svg>
        </div>
        <div class="options">
            <ul v-if="knowledgeInfoArr.length > 0">
                <li v-for="(knowledgeInfo, index) in knowledgeInfoArr" :key="knowledgeInfo.id" @click="goKnowledge(knowledgeInfo.id)">
                    <span class="rank" :class="getIndexClass(index + 1)">{{ index + 1 }}</span>
                    <span class="articleTitle" :title="knowledgeInfo.title">{{ knowledgeInfo.title }}</span>
                </li>
            </ul>
            <el-empty v-else description="暂无数据"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqAppreciateArticleInfoList } from '@/api/home';
import { KnowledgeInfoArr, KnowledgeInfoResponseData } from '@/api/home/type';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

let $router = useRouter();

const knowledgeInfoArr = ref<KnowledgeInfoArr>([]);

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    let result: KnowledgeInfoResponseData = await reqAppreciateArticleInfoList();
    if (result.code === 200) {
        knowledgeInfoArr.value = result.data;
    }
}

const getIndexClass = (index: number) => {
    if (index === 1) {
        return 'rank-1';
    } else if (index === 2) {
        return 'rank-2';
    } else if (index === 3) {
        return 'rank-3';
    } else {
        return 'rank-other';
    }
}

const goKnowledge = (knocode: number) => {
    $router.push({ path: '/knowledge', query: { knocode: knocode } });
}

</script>

<style scoped lang="scss">
.featuredArticle {
    width: 100%;
    // height: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid #BBB;
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: 20px;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 12px 8px;
        border-bottom: 1px solid #DDD;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #efefef;
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
                cursor: pointer;
                display: flex;
                // align-items: center;
                padding: 5px;
                min-height: 40px;
                // border: 1px solid red;

                .rank {
                    font-size: 18px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    min-height: 22px;
                    max-height: 22px;
                    min-width: 22px;
                    max-width: 22px;
                    color: #fff;
                    text-align: center;
                    margin-right: 10px;
                }

                .rank.rank-1 {
                    background-color: #e74c3c;
                }

                .rank.rank-2 {
                    background-color: #e67e22;
                }

                .rank.rank-3 {
                    background-color: #f39c12;
                }

                .rank.rank-other {
                    background-color: #bdc3c7;
                }

                .articleTitle {
                    font-size: 16px;
                    font-weight: 300;
                    word-wrap: break-all;
                    line-height: 22px;
                    // border: 1px solid brown;
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