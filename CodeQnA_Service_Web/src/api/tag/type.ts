// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

// 常用无数据返回响应数据
export interface CommonResponseData extends ResponseData {
    data: null,
}

export interface TagSearchDto {
    'input': string,
    'category': string,
    'pageNum': number,
    'pageSize': number,
}

export interface DtTag {
    'id': number,
    'parentId': number,
    'img': string,
    'tagName': string,
    'tagIntro': string,
    'createTime': string,
    'updateTime': string,
    'isDeleted': number,
}

export interface TagSearchInfo {
    'dtTag': DtTag,
    'postNum': number,
    'articleNum': number,
    'isFollow': boolean,
}

export type TagSearchInfoArr = TagSearchInfo[]

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

export interface TagSearchPageInfoResponseData extends ResponseData {
    data: PageInfo<TagSearchInfo>
}

export interface DtTag {
    'id': number,
    'parentId': number,
    'img': string,
    'tagName': string,
    'tagIntro': string,
    'children': DtTagList,
    'createTime': string,
    'updateTime': string,
    'isDeleted': number,
}

export type DtTagList = DtTag[]

export interface TagTreeResponseData extends ResponseData {
    data: DtTagList,
}