// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface CommonResponseData extends ResponseData {
    data: null,
}

// 用户免密登录接口需要携带参数类型
export interface LoginCodeData {
    'phone': string,
    'code': string
}
// 用户密码登录接口需要携带参数类型
export interface LoginPwData {
    'phone': string,
    'password': string
}
// 登录接口返回用户信息数据
export interface UserBaseInfo {
    'id': number,
    'headImgUrl': string,
    'userName': string,
    'token': string,
}
// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
    data: UserBaseInfo,
}

export interface UserCbInfo {
    'userName': string,
}

export type UserCbInfoList = UserCbInfo[]

export interface UserCbInfoResponseData extends ResponseData {
    data: UserCbInfoList,
}

export interface UserSearchInfo {
    'id': number,
    'userName': string,
    'sex': number,
    'headImgUrl': string,
    'bgImgUrl': string,
    'selfIntro': string,
    'signture': string,
    'createTime': string,
}

export type UserSearchInfoList = UserSearchInfo[]

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

export interface UserSearchPageInfoResponseData extends ResponseData {
    data: PageInfo<UserSearchInfo>,
}

export interface UserInfo {
    'id': number,
    'userName': string,
    'headImgUrl': string,
    'isFollow': boolean,
    'followCount': number,
}

export type UserInfoList = UserInfo[]

export interface UserInfoResponseData extends ResponseData {
    data: UserInfoList,
}

export interface UserotherInfo {
    'appreciateCount': number,
    'followCount': number,
    'fansCount': number,
    'isFollow': boolean,
}

export interface TagBaseInfo {
    'id': number,
    'tagName': string,
}

export interface UserDetailInfo {
    'userSearchInfo': UserSearchInfo,
    'userotherInfo': UserotherInfo,
    'tagBaseInfoList': TagBaseInfo[]
}

export interface UserDetailInfoResponseData extends ResponseData {
    data: UserDetailInfo,
}

export interface UserDto {
    'id': number,
    'userName': string,
    'password': string,
    'sex': number,
    'headImgUrl': string,
    'bgImgUrl': string,
    'selfIntro': string,
    'signture': string,
}