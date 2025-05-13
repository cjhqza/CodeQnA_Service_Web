<template>
    <div class="chatBox">
        <el-dialog v-model="userStore.chatBoxVisiable" title="CodeQnA 聊天框" ref="dialog">
            <div class="container" v-if="chatList.length > 0">
                <div class="userList">
                    <el-card class="user-item" v-for="(userChat, index) in chatList" :key="index"
                        :class="{ active: activeFlag == userChat.id }" @click="getChatRecord(userChat)">
                        <div class="baseInfo">
                            <img class="head" :src="userChat.toHeadImgUrl" alt="">
                            <span class="username">{{ userChat.toUserName }}</span>
                        </div>
                    </el-card>
                </div>
                <div class="record">
                    <div class="show" v-if="activeFlag !== 0">
                        <div class="message-container">
                            <ul>
                                <li class="message" v-for="message in messageList" :key="message.id">
                                    <span
                                        :class="message.senderId === userStore.userBaseInfo.id ? 'myUsername' : 'theirUsername'">
                                        {{ message.senderId === userStore.userBaseInfo.id ?
                                            userStore.userBaseInfo.userName :
                                        userChat?.toUserName }}
                                    </span>
                                    <span class="message-content">：{{ message.content }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="other-container"></div>
                        <div class="input-container">
                            <el-input type="textarea" v-model="messageDto.content" @keyup.enter="sendMessage"
                                placeholder="请输入你想对对方说的话..." />
                        </div>
                    </div>
                    <div class="unshow" v-else>

                    </div>
                </div>
            </div>
            <el-empty v-else description="暂无聊天记录"></el-empty>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import useUserStore from '@/store/modules/user';
import { WebSocketService } from '@/api/chat/websocket'
import { reqChatInfo, reqMessageList } from '@/api/chat';
import { ChatInfo, ChatInfoList, ChatInfoResponseData, DtMessage, MessageDto, MessageList, MessageListResponseData } from '@/api/chat/type';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

let wsService = new WebSocketService();

const messageList = ref<MessageList>([]);

const chatList = ref<ChatInfoList>([]);
let wsConnected = false;

let activeFlag = ref<number>(0);

let userChat = ref<ChatInfo>({
    'id': 0,
    'toUserId': 0,
    'toUserName': '',
    'toHeadImgUrl': '',
});

let messageDto = ref<MessageDto>({
    'id': 0,
    'senderId': 0,
    'receiverId': 0,
    'content': '',
    'createTime': '',
})

onMounted(async () => {
    // 尝试连接
    await wsConnect();
    // 获取关联会话信息
    await getChatByUserId();
})

const wsConnect = async () => {
    let userId = userStore.userBaseInfo.id;
    let token = userStore.userBaseInfo.token;

    console.log('尝试连接')
    // 连接webSocket
    wsService.connect(token, userId);

    // 设置消息处理器
    wsService.setMessageHandler((data) => {
        console.log('设置数据' + data);
        let message = ref<DtMessage>({
            'id': 0,
            'senderId': data.senderId,
            'chatId': data.id,
            'content': data.content,
            'createTime': data.createTime,
            'updateTime': data.createTime,
            'isDeleted': 0,
        });

        if (activeFlag.value === data.id) {
            console.log('是当前会话');
            messageList.value.push(message.value);
            console.log('存储成功');
        }

    });

    wsConnected = true;
}

const getChatByUserId = async () => {
    let result: ChatInfoResponseData = await reqChatInfo();
    if (result.code === 200) {
        chatList.value = result.data;
    } else {
        ElMessage.error(result.message);
    }
}

// 断开连接
onUnmounted(() => {
    wsService.disconnect();
    console.log("断开连接")
});

const getChatRecord = async (chat: ChatInfo) => {
    let result: MessageListResponseData = await reqMessageList(chat.id);
    if (result.code === 200) {
        messageList.value = result.data;
        activeFlag.value = chat.id;
        userChat.value = chat;
    } else {
        ElMessage.error(result.message);
    }
}

const sendMessage = () => {
    if (!wsConnect || !messageDto.value.content.trim()) {
        return;
    }

    messageDto.value.id = userChat.value.id;
    messageDto.value.senderId = userStore.userBaseInfo.id;
    messageDto.value.receiverId = userChat.value.toUserId;
    messageDto.value.createTime = new Date().toDateString();

    wsService.sendMessage(messageDto.value);

    let message = ref<DtMessage>({
        'id': 0,
        'senderId': messageDto.value.senderId,
        'chatId': userChat.value.id,
        'content': messageDto.value.content,
        'createTime': messageDto.value.createTime,
        'updateTime': messageDto.value.createTime,
        'isDeleted': 0,
    });

    messageList.value.push(message.value)

    messageDto.value.content = '';
    
}

</script>

<style lang="scss" scoped>
.chatBox {
    ::v-deep(.el-dialog) {
        display: flex;
        flex-direction: column;
        padding: 0;
        width: 800px;
        height: 700px;
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
        height: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        // border: 1px solid red;

        .userList {
            width: 24%;
            // height: 450px;
            border-right: 2px solid #CCC;
            border-bottom-left-radius: 5px;
            overflow: auto;
            // border: 1px solid blue;

            ::v-deep(.el-card__body) {
                padding: 8px;
            }

            .user-item {
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
                    align-items: center;
                    padding: 5px;

                    .head {
                        border-radius: 50%;
                        width: 30px;
                        margin-right: 5px;
                    }

                    .username {
                        display: flex;
                        height: 25px;
                        align-items: center;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 15px;
                        font-weight: 500;
                        // border: 1px solid red;
                    }
                }
            }

            .user-item:hover {
                background-color: rgb(162, 214, 254);
            }

        }

        .record {
            flex: 1;
            height: 100%;
            border-bottom-right-radius: 5px;
            display: flex;
            flex-direction: column;
            // border: 1px solid green;

            .show {
                .message-container {
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                    padding: 10px 10px;
                    overflow: auto;
                    // border: 1px solid red;

                    .message {
                        margin-bottom: 20px;
                        font-size: 15px;
                        line-height: 22px;

                        .myUsername {
                            color: #cc0903;
                        }

                        .theirUsername {
                            color: #0188cc;
                        }

                        .message-content {
                            color: #222;
                        }

                    }
                }

                .other-container {
                    height: 2%;
                    border-top: 2px solid #CCC;
                    // background-color: #BBB;
                }

                .input-container {
                    flex: 1;
                    display: flex;
                    // border: 1px solid green;

                    ::v-deep(.el-textarea__inner) {
                        height: 100%;
                        resize: none;
                        box-shadow: none;
                        background-color: #F5F7F8;
                        font-size: 15px;
                        color: #222;
                    }
                }
            }

        }
    }
}
</style>