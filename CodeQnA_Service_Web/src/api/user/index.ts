// 引入二次封装axios
import request from "@/utils/request";
import type { CommonResponseData, LoginCodeData, LoginPwData, UserCbInfoResponseData, UserDetailInfoResponseData, UserDto, UserInfoResponseData, UserLoginResponseData, UserSearchPageInfoResponseData } from "./type";
import { UserSearchDto } from "../search/type";

// 枚举请求地址
enum API {
    // 获取验证码接口
    GETUSERCODE_URL = '/user/sms/sendCode/',
    // 用户免密登录接口
    USERCODELOGIN_URL = '/user/userInfo/codeLogin',
    // 用户密码登录接口
    USERPWLOGIN_URL = '/user/userInfo/pwLogin',
    // 用户退出登录接口
    USERLOGOUT_URL = '/user/userInfo/logout',
    // 用户检索集合接口
    GETFINDBYUSERNAME_URL = '/user/userInfo/findByUserName/',
    // 用户搜索结果集合接口
    GETUSERSEARCHINFOLIST_URL = '/user/userInfo/getUserSearchInfoList',
    // 按关注数获取用户信息数据
    GETUSERINFOBYFOLLOW_URL = '/user/userInfo/getUserInfoByFollow/',
    // 获取相关的用户信息数据
    GETRELATEDUSERINFO_URL = '/user/userInfo/auth/getRelatedUserInfo',
    // 获取用户详细信息数据
    GETUSERDETAILINFO_URL = '/user/userInfo/auth/getUserDetailInfo/',
    // 关注用户功能实现
    GETFOLLOWUSER_URL = '/user/userInfo/auth/follow/',
    // 修改用户信息实现
    GETUPDATEUSERINFO_URL = '/user/userInfo/auth/updateUserInfo',

};

// 获取验证码接口
export const reqCode = (phone: string) => request.get<undefined, CommonResponseData>(API.GETUSERCODE_URL + `${phone}`)
// 用户免密登录接口
export const reqUserCodeLogin = (data: LoginCodeData) => request.post<LoginCodeData, UserLoginResponseData>(API.USERCODELOGIN_URL, data)
// 用户密码登录接口
export const reqUserPwLogin = (data: LoginPwData) => request.post<LoginPwData, UserLoginResponseData>(API.USERPWLOGIN_URL, data)
// 用户退出登录接口
export const reqLogout = () => request.get<undefined, CommonResponseData>(API.USERLOGOUT_URL)
// 用户检索集合接口
export const reqFindByUserName = (userInput: string) => request.get<undefined, UserCbInfoResponseData>(API.GETFINDBYUSERNAME_URL + `${userInput}`)
// 用户搜索结果集合接口
export const reqUserSearchInfoList = (userSearchDto: UserSearchDto) => request.post<UserSearchDto, UserSearchPageInfoResponseData>(API.GETUSERSEARCHINFOLIST_URL, userSearchDto)
// 按关注数获取用户信息数据
export const reqUserInfoByFollow = (userId: number) => request.get<undefined, UserInfoResponseData>(API.GETUSERINFOBYFOLLOW_URL + `${userId}`)
// 获取相关的用户信息数据
export const reqRelatedUserInfo = () => request.get<undefined, UserInfoResponseData>(API.GETRELATEDUSERINFO_URL)
// 获取用户详细信息数据
export const reqUserDetailInfo = (userId: number) => request.get<undefined, UserDetailInfoResponseData>(API.GETUSERDETAILINFO_URL + `${userId}`)
// 关注用户功能实现
export const reqFollowUser = (userId: number) => request.post<undefined, CommonResponseData>(API.GETFOLLOWUSER_URL + `${userId}`)
// 修改用户信息实现
export const reqUpdateUserInfo = (userDto: UserDto) => request.post<UserDto, CommonResponseData>(API.GETUPDATEUSERINFO_URL, userDto)