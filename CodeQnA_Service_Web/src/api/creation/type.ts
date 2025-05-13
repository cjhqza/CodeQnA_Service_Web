// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface CommonResponseData extends ResponseData {
    data: null,
}

export interface KnowledgeIdResponseData extends ResponseData {
    data: number,
}

export interface TagBaseInfo {
    'id': number,
    'tagName': string,
}

export type TagBaseInfoArr = TagBaseInfo[]

export interface DtKnowlege {
    'id': number,
    'type': number,
    'userId': number,
    'title': string,
    'content': string,
    'status': number,
    'createTime': string,
    'updateTime': string,
}

export interface KnowledgeDraftInfo {
    'dtKnowledge': DtKnowlege
    'tagBaseInfoList': TagBaseInfoArr,
}

export type KnowledgeDraftInfoList = KnowledgeDraftInfo[]

export interface KnowledgeDraftInfoResponseData extends ResponseData {
    data: KnowledgeDraftInfoList,
}