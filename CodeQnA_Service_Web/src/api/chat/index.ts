// 引入二次封装axios
import request from "@/utils/request";
import { ChatInfoResponseData, CommonResponseData, MessageListResponseData } from "./type";

enum API {
    // 获取会话信息
    GETCHATINFO_URL = '/user/message/getChatInfo',
    // 根据会话id获取消息集合
    GETMESSAGELIST_URL = '/user/message/getMessageList/',
    // 创建会话
    GETCREATECHATBYID_URL = '/user/message/createChatById/',
}
// 获取会话信息
export const reqChatInfo = () => request.get<undefined, ChatInfoResponseData>(API.GETCHATINFO_URL);
// 根据会话id获取消息集合
export const reqMessageList = (id: number) => request.get<undefined, MessageListResponseData>(API.GETMESSAGELIST_URL + `${id}`)
// 创建会话
export const reqCreateChatById = (id: number) => request.get<undefined, CommonResponseData>(API.GETCREATECHATBYID_URL + `${id}`)