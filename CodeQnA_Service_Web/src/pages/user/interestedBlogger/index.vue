<template>
    <div class="interestedBlogger">
        <div class="header">
            <!-- <svg t="1743604449321" class="icon-hot" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9377" width="20" height="20"><path d="M663.473231 448C568.713846 330.318769 572.573538 194.993231 572.573538 0 330.24 140.760615 339.337846 470.016 330.24 576c-76.445538-66.087385-90.899692-224.019692-90.899692-224.019692C158.601846 395.894154 118.153846 513.024 118.153846 608.019692 118.153846 837.750154 294.478769 1024 512 1024s393.846154-186.249846 393.846154-416.019692c0-136.507077-94.916923-199.483077-93.735385-385.496616-132.883692 40.014769-157.223385 153.442462-148.637538 225.516308z" fill="#f5400b" p-id="9378"></path></svg> -->
            <div class="title">博趣相投</div>
        </div>
        <div class="options">
            <ul v-if="userInfoList.length > 0">
                <li v-for="(userInfo, index) in userInfoList" :key="userInfo.id" >
                    <div class="user" @click="goUser(userInfo.id)">
                        <img :src="userInfo.headImgUrl" alt="">
                        <span :title="userInfo.userName">{{ userInfo.userName }}</span>
                    </div>
                    <div class="other">
                        <span>关注数 {{ userInfo.followCount }}</span>
                        <el-button size="small" type="primary" class="follow" :class="{ 'active-follow': userInfo.isFollow }">关注</el-button>
                    </div>
                </li>
            </ul>
            <el-empty v-else description="暂无数据"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserInfoList, UserInfoResponseData } from '@/api/user/type';
import { onMounted, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { reqRelatedUserInfo } from '@/api/user';
import { useRouter } from 'vue-router';

let $router = useRouter();

let userStore = useUserStore();

const userInfoList = ref<UserInfoList>([])

onMounted(() => {
    getRelatedUserInfo();
})

const getRelatedUserInfo = async () => {
    let result: UserInfoResponseData = await reqRelatedUserInfo();
    if (result.code === 200) {
        userInfoList.value = result.data;
    }
}

const goUser = (usercode: number) => {
    $router.push({path: '/user/release', query: { usercode: usercode }});
}
</script>

<style scoped lang="scss">
.interestedBlogger {
    width: 100%;
    border: 1px solid #CCC;
    background-color: #fff;
    border-radius: 8px;

    .header {
        display: flex;
        // justify-content: center;
        align-items: center;
        width: 100%;
        padding: 12px 0;
        padding-left: 8px;
        border-bottom: 1px solid #DDD;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #fafafa;
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

    }

    .options {
        flex: 1;
        width: 100%;
        padding: 5px 0;

        ul {
            display: flex;
            flex-direction: column;

            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px;

                .user {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    width: 50%;
                    // border: 1px solid red;
                    img {
                        border-radius: 50%;
                        width: 30px;
                        margin-right: 5px;
                    }

                    span {
                        font-size: 14px;
                        
                    }
                }

                .other {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    
                    span {
                        font-weight: 500;
                        font-size: 12px;
                        margin-right: 5px;
                        color: #666;
                    }

                    .follow.active-follow {
                        color:#fff;
                        background-color: #BBB;
                        border-color: #BBB;
                    }
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