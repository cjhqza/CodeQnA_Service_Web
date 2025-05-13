<template>
    <div class="container">
        <!-- 引入全局顶部组件 -->
        <CodeqnaTop />
        <div class="content">
            <!-- <CodeqnaLeft /> -->
            <div class="main-content">
                <div class="box-set">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <CodeqnaBottom />
        <!-- 登录注册组件 -->
        <Login v-if="userStore.loginVisiable" />
        <!-- 聊天框组件 -->
        <ChatBox v-if="userStore.chatBoxVisiable" />
        <!-- 意见箱组件 -->
        <SugBox v-if="userStore.sugBoxVisiable" />
        <!-- 收件箱组件 -->
        <MailBox v-if="userStore.mailBoxVisiable" />
    </div>
</template>

<script setup lang="ts">
import useUserStore from './store/modules/user';
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F5F7F8;
    height: 100vh;
    overflow: hidden;
    
    .content {
        margin-top: 60px;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        // border: 1px solid yellow;

        .box-set {
            display: flex;
            width: 1400px;
            // border: 1px solid red;
        }
    }
}
</style>

<style lang="scss">
.el-popover {
    .tags-popover {
        display: flex;
        flex-direction: column;

        .popover-top {
            font-size: 18px;
            font-weight: 900;
            display: flex;
            justify-content: center;
            padding-bottom: 5px;
            margin-bottom: 20px;
            border-bottom: 1px solid #CCC;
        }

        .popover-bottom {
            i {
                width: 15px;
                height: 15px;
            }

            .search-tabs {
                .popover-left {
                    width: 100%;
                    // border: 1px solid red;
                    text-align: left;
                }

                .popover-tip {
                    font-size: 14px;
                    color: #888;
                    margin-bottom: 10px;
                }

                .popover-right {
                    .popover-tag {
                        margin-right: 5px;
                        margin-bottom: 5px;
                        cursor: pointer;
                    }
                }
            }
        }
    }


}
</style>