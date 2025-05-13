// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface MessageDto {
    'id': number,
    'senderId': number,
    'receiverId': number,
    'content': string,
    'createTime': string,
}

export interface ChatInfo {
    'id': number,
    'toUserId': number,
    'toUserName': string,
    'toHeadImgUrl': string,
}

export type ChatInfoList = ChatInfo[]

export interface ChatInfoResponseData extends ResponseData {
    data: ChatInfoList,
}

export interface DtMessage {
    'id': number,
    'senderId': number,
    'chatId': number,
    'content': string,
    'createTime': string,
    'updateTime': string,
    'isDeleted': number,
}

export type MessageList = DtMessage[]

export interface MessageListResponseData extends ResponseData {
    data: MessageList,
}