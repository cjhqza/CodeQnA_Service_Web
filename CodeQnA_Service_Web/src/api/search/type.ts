// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface TagBaseInfo {
    'id': number,
    'tagName': string,
}

export type TagBaseInfoArr = TagBaseInfo[]

export interface KnowledgeSearchDto {
    'input': string,
    'tagBaseInfoList': TagBaseInfoArr,
    'type': number,
    'category': string,
    'pageNum': number,
    'pageSize': number,
}

export interface UserSearchDto {
    'userName': string,
    'pageNum': number,
    'pageSize': number,
}

// 标签基本信息对象
export interface TagBaseInfo {
    'id': number,
    'tagName': string,
}

export type TagBaseInfoList = TagBaseInfo[];

// 知识记录对象
export interface KnowledgeRecordsInfo {
    'readCount': number,
    'responseCount': number,
    'isAppreciate': boolean,
    'isFollow': boolean,
}

// 知识信息对象
export interface KnowledgeInfo {
    'id': number,
    'type': number,
    'userId': number,
    'userName': string,
    'headImgUrl': string,
    'title': string,
    'content': string,
    'tagBaseInfoList': TagBaseInfoList,
    'createTime': string,
    'knowledgeRecordsInfo': KnowledgeRecordsInfo,
}

// 封装知识信息数组集合
export type KnowledgeInfoArr = KnowledgeInfo[]

export interface PageInfo<T> {
    'endRow': number,
    'hasNextPage': boolean,
    'hasPreviousPage': boolean,
    'isFirstPage': boolean,
    'isLastPage': boolean,
    'list': T[],
    'navigateFirstPage': number,
    'navigateLastPage': number,
    'navigatePages': number,
    'navigatepageNums': [],
    'nextPage': number,
    'pageNum': number,
    'pageSize': number,
    'pages': number,
    'prePage': number,
    'size': number,
    'startRow': number,
    'total': number,
}

// 分类获取信息的ts类型
export interface PageInfoResponseData extends ResponseData {
    data: PageInfo<KnowledgeInfo>,
}