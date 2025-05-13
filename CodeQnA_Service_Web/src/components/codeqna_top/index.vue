<template>
    <div class="top">
        <!-- 内容区域 -->
        <div class="content">
            <!-- 左侧 -->
            <div class="left">
                <img class="logo" src="../../assets/codeqna_logo.png" alt="" @click="selectMenu('/home')">
                <p @click="selectMenu('/home')">CodeQnA 代码问答平台</p>
                <el-menu :default-active="$route.path" class="middle-menu" mode="horizontal">
                    <el-menu-item index="/home" @click="selectMenu('/home')">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="/tag" @click="selectMenu('/tag')">
                        <el-icon>
                            <Discount />
                        </el-icon>
                        <span>标签关注</span>
                    </el-menu-item>
                    <el-menu-item index="/search" @click="selectMenu('/search')">
                        <el-icon>
                            <Search />
                        </el-icon>
                        <span>搜索导航</span>
                    </el-menu-item>
                    <el-sub-menu index="/creation" class="sub-menu">
                        <template #title>
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span>创作中心</span>
                        </template>
                        <el-menu-item index="/createPost" class="sub-menu-item" @click="selectMenu('/createPost')">
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                            <span>问帖发布</span>
                        </el-menu-item>
                        <el-menu-item index="/createArticle" class="sub-menu-item"
                            @click="selectMenu('/createArticle')">
                            <el-icon>
                                <Opportunity />
                            </el-icon>
                            <span>文章创作</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="right">
                <div class="help">帮助中心</div>
                <!-- 如果没有用户名字：显示登录注册 -->
                <el-button type="primary" class="login" @click="openLoginDialog" v-if="!userStore.userBaseInfo.token"
                    round>登录/注册</el-button>
                <!-- 如果有用户信息展示用户信息 -->
                <div class="user-func" v-else>
                    <div class="message">
                        <svg @click="openChatBoxDialog" t="1745421462504" class="chat-icon" viewBox="0 0 1879 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4450" width="48" height="48">
                            <path
                                d="M1030.954913 474.265896c-26.043931 0-47.352601 21.160694-47.352601 47.352601s21.308671 47.352601 47.352601 47.352601 47.352601-21.308671 47.352601-47.352601-21.160694-47.352601-47.352601-47.352601zM1452.54104 109.946821c0-36.402312-29.595376-65.997688-65.997687-65.997688H675.514451c-36.402312 0-65.997688 29.595376-65.997688 65.997688V176.092486h57.267052V101.216185H1395.421965v466.571098h-74.8763v57.267052H1386.543353c36.402312 0 65.997688-29.595376 65.997687-65.997688V109.946821zM843.912139 474.265896c-26.043931 0-47.352601 21.160694-47.352601 47.352601s21.308671 47.352601 47.352601 47.352601 47.352601-21.308671 47.352601-47.352601-21.308671-47.352601-47.352601-47.352601z"
                                fill="#515151" p-id="4451"></path>
                            <path
                                d="M1265.498266 297.137572c0-36.402312-29.595376-65.997688-65.997688-65.997688H488.323699c-36.402312 0-65.997688 29.595376-65.997687 65.997688v449.109827c0 36.402312 29.595376 65.997688 65.997687 65.997688h83.606937V987.00578l174.760693-174.760693h452.661272c36.402312 0 65.997688-29.595376 65.997688-65.997688V297.137572h0.147977zM1204.531792 751.278613H721.387283l-88.490173 88.490173v-88.490173H483.144509V291.958382H1204.531792v459.320231z"
                                fill="#515151" p-id="4452"></path>
                            <path
                                d="M656.721387 474.265896c-26.043931 0-47.352601 21.160694-47.352601 47.352601s21.308671 47.352601 47.352601 47.352601 47.352601-21.308671 47.352601-47.352601-21.160694-47.352601-47.352601-47.352601z"
                                fill="#515151" p-id="4453"></path>
                        </svg>
                        <svg @click="openSugBoxDialog" t="1745378638847" class="sug-icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3481" width="32" height="32">
                            <path
                                d="M359.86 361.04h98.37c6.36 0 21.69-6.46 21.69-21.69v-98.37c0-20.18-15.32-21.69-21.69-21.69h-98.37c-6.36 0-21.69 3.93-21.69 21.69v98.37c0 20.07 15.33 21.69 21.69 21.69zM167.08 904.8h685.79c12.46 0 59.13-4.99 59.13-55.05V394.62c0-28.24-45.05-50.02-45.05-50.02l-56.5-32.84V152.19c0-24.96-20.38-32.99-32.96-32.99H246.54c-12.58 0-32.97 9.24-32.97 32.99v159.59l-56.52 32.84s-45.05 21.6-45.05 50v455.13c0 56.87 55.08 55.05 55.08 55.05z m643.37-540.89l53.14 30.88-53.14 30.86v-61.74zM268.79 189.02c0.02-11.18 3.46-14.61 14.63-14.61h457.16c11.2 0 14.66 3.42 14.66 14.59v262.83L512.01 599.05 268.79 451.83V189.02z m-55.22 174.87v61.74l-53.15-30.86 53.15-30.88z m643.25 485.63H167.24V455.13l333.43 199.58c0.32 0.26 0.7 0.35 1.05 0.51 0.51 0.28 1 0.45 1.5 0.68 0.84 0.37 1.68 0.68 2.53 0.96 0.56 0.14 1.1 0.23 1.68 0.37 0.82 0.18 1.64 0.31 2.49 0.38 0.7 0.04 1.4 0.04 2.1 0.04 0.7 0 1.4 0 2.1-0.04 0.84-0.09 1.67-0.22 2.5-0.38 0.56-0.16 1.12-0.25 1.68-0.37 0.87-0.28 1.72-0.6 2.55-0.96 0.5-0.22 0.99-0.4 1.5-0.68 0.35-0.18 0.72-0.26 1.05-0.51l333.41-199.58 0.01 394.39zM357.28 425.67c-9.84 0-18.05-8.21-18.05-18.03 0-9.9 8.21-18.03 18.05-18.03h331.99c9.84 0 18.05 8.13 18.05 18.03 0 9.82-8.21 18.03-18.05 18.03H357.28z m185.05-85.2c-9.84 0-18.05-8.21-18.05-18.03 0-9.9 8.21-18.03 18.05-18.03h144.49c9.82 0 18.03 8.14 18.03 18.03 0 9.82-8.21 18.03-18.03 18.03H542.33z m0-85.21c-9.84 0-18.05-8.21-18.05-18.03s8.21-18.03 18.05-18.03h142.45c9.82 0 18.03 8.21 18.03 18.03s-8.21 18.03-18.03 18.03H542.33z"
                                p-id="3482" fill="#515151"></path>
                        </svg>
                        <svg @click="openMailBoxDialog" t="1744343847606" class="mail-icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6735" width="32" height="32">
                            <path
                                d="M156.4672 761.2928c-6.5024 0-13.056-2.048-18.6368-6.2976-13.4656-10.2912-16.0768-29.5936-5.7344-43.0592l196.5568-257.1264c10.2912-13.4656 29.5936-16.0768 43.0592-5.7344 13.4656 10.2912 16.0768 29.5936 5.7344 43.0592l-196.5568 257.1264a30.65856 30.65856 0 0 1-24.4224 12.032zM878.3872 763.5456c-9.216 0-18.3808-4.1472-24.4224-12.032l-195.7888-255.6416c-10.2912-13.4656-7.7824-32.768 5.7344-43.0592 13.4656-10.2912 32.768-7.7824 43.0592 5.7344l195.7888 255.6416c10.2912 13.4656 7.7824 32.768-5.7344 43.0592a30.98624 30.98624 0 0 1-18.6368 6.2976z"
                                fill="#515151" p-id="6736"></path>
                            <path
                                d="M517.9904 575.6928c-26.88 0-53.76-7.7824-77.2096-23.296L118.1184 338.7392a30.75584 30.75584 0 0 1-8.6528-42.5984 30.75584 30.75584 0 0 1 42.5984-8.6528l322.6112 213.6576c26.2656 17.3568 60.16 17.408 86.4256 0.1024l326.9632-215.2448a30.75584 30.75584 0 0 1 42.5472 8.7552c9.3184 14.1824 5.4272 33.2288-8.7552 42.5472l-326.9632 215.2448a139.5968 139.5968 0 0 1-76.9024 23.1424z"
                                fill="#515151" p-id="6737"></path>
                            <path
                                d="M777.0112 850.1248H257.8432c-92.3648 0-167.5264-75.1616-167.5264-167.5264V320.3584c0-92.3648 75.1616-167.5264 167.5264-167.5264h519.1168c92.3648 0 167.5264 75.1616 167.5264 167.5264v362.24c0.0512 92.3648-75.1104 167.5264-167.4752 167.5264zM257.8432 214.272c-58.5216 0-106.0864 47.616-106.0864 106.0864v362.24c0 58.5216 47.616 106.0864 106.0864 106.0864h519.1168c58.5216 0 106.0864-47.616 106.0864-106.0864V320.3584c0-58.5216-47.616-106.0864-106.0864-106.0864H257.8432z"
                                fill="#515151" p-id="6738"></path>
                        </svg>
                    </div>
                    <el-dropdown size="large">
                        <span class="el-dropdown-link">
                            <img :src="userStore.userBaseInfo.headImgUrl" alt="">
                            {{ userStore.userBaseInfo.userName }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="selectMenu('/user/release')">个人中心</el-dropdown-item>
                                <el-dropdown-item @click="selectMenu('/createPost')">发问答贴</el-dropdown-item>
                                <el-dropdown-item @click="selectMenu('/createArticle')">撰写文章</el-dropdown-item>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { House, Discount, Search, EditPen, Opportunity, QuestionFilled } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'
// 获取user仓库的数据(visiable)可以控制login组件的对话框显示与隐藏
import useUserStore from '@/store/modules/user/index';
let userStore = useUserStore();

// 获取路由器
let $router = useRouter();
// 获取当前的路由信息
let $route = useRoute();

// 顶部菜单点击事件的回调
const selectMenu = (path: string) => {
    if (path === '/user/release') {
        $router.push({ path: path, query: { usercode : userStore.userBaseInfo.id } })
    } else {
        // 跳转到对应的路由
        $router.push({ path });
    }
}

// 打开注册/登录对话框
const openLoginDialog = () => {
    userStore.loginVisiable = true;
}

// 打开聊天对话框
const openChatBoxDialog = () => {
    userStore.chatBoxVisiable = true;
}

// 打开意见箱对话框
const openSugBoxDialog = () => {
    userStore.sugBoxVisiable = true;
}

// 打开收件箱对话框
const openMailBoxDialog = () => {
    userStore.mailBoxVisiable = true;
}

// 退出登录按钮的回调
const logout = async () => {
    // 通知pinia仓库清除用户相关的信息
    await userStore.logout();
    // 编程式导航路由跳转到首页
    $router.push({ path: '/home' })
}

</script>

<style scoped lang="scss">
.top {
    /* 固定顶部 */
    position: fixed;
    z-index: 999;

    width: 100%;
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: center;

    .content {
        width: 100%;
        height: 60px;
        background: #fff;
        padding: 0px 20px;
        border-bottom: 1px solid #CCC;

        /* 分布两边 */
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            .logo {
                width: 90px;
                height: 58px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe;
                margin-right: 50px;
            }

            ::v-deep(.middle-menu) {
                width: 700px;

                span {
                    font-size: 15px;
                    font-weight: 700;
                }
            }
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: black;
            // border: 1px solid red;

            .help {
                margin-right: 30px;
                cursor: pointer;
            }

            .user-func {
                display: flex;
                align-items: center;
                height: 100%;
                // border: 1px solid red;

                .message {
                    // border: 1px solid red;
                    border-radius: 50%;
                    margin-right: 30px;
                    display: flex;
                    align-items: center;

                    .chat-icon {
                        margin-right: 20px;
                        cursor: pointer;
                    }

                    .sug-icon {
                        margin-right: 20px;
                        cursor: pointer;
                    }

                    .mail-icon {
                        cursor: pointer;
                    }
                }

                ::v-deep(.el-dropdown) {
                    height: 100%;

                    .el-dropdown-link {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        cursor: pointer;
                        // width: 200px;
                        // border: 1px solid red;
                        padding: 0 5px;

                        img {
                            width: 40px;
                            border-radius: 50%;
                            border: 2px solid #fff;
                            margin-right: 5px;
                        }

                    }

                }


            }


            ::v-deep(.login) {
                cursor: pointer;
            }
        }
    }
}
</style>