// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

// 常用无数据返回响应数据
export interface CommonResponseData extends ResponseData {
    data: null,
}

export interface CommentInfo {
    'id': number,
    'parentId': number,
    'ancestorId': number,
    'userId': string,
    'userHeadImgUrl': string,
    'userName': string,
    'toUserId': number,
    'toUserHeadImgUrl': string,
    'toUserName': string,
    'content': string,
    'createTime': string,
    'isAppreciate': boolean,
    'appreciateCount': number,
    'children': CommentInfo[]
}

export type CommentInfoList = CommentInfo[]

export interface CommentInfoResponseData extends ResponseData {
    data: CommentInfoList,
}

export interface CommentDto {
    'knowledgeId': number,
    'parentId': number,
    'ancestorId': number,
    'userId': number,
    'content': string,
}