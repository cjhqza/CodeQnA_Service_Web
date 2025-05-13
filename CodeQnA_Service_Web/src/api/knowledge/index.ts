// 引入二次封装axios
import request from "@/utils/request";
import { CommonResponseData, KnowledgeResponseData, KnowledgeUserDto, PageInfoResponseData } from "./type";

// 枚举请求地址
enum API {
    // 赞赏功能接口实现
    GETAPPRECIATE_URL = 'knowledge/knowledgeInfo/auth/appreciate/',
    // 收藏功能接口实现
    GETFOLLOW_URL = 'knowledge/knowledgeInfo/auth/follow/',
    // 获取知识信息
    GETKNOWLEDGEINFOBYID_URL = 'knowledge/knowledgeInfo/getKnowledgeInfoById/',
    // 获取用户发布的知识信息
    GETKNOWLEDGELISTBYUSERIDBYRELEASE_URL = 'knowledge/knowledgeInfo/getKnowledgeInfoListByUserIdByRelease',
    // 获取用户赞赏的知识信息
    GETKNOWLEDGEINFOLISTBYUSERIDBYAPPRECIATE_URL = 'knowledge/knowledgeInfo/getKnowledgeInfoListByUserIdByAppreciate',
    // 获取用户收藏的知识信息
    GETKNOWLEDGEINFOLISTBYUSERIDBYFOLLOW_URL = 'knowledge/knowledgeInfo/getKnowledgeInfoListByUserIdByFollow',
    // 撤贴
    GETCANCELKNOWLEDGE_URL = 'knowledge/knowledgeInfo/auth/cancelKnowledge/',
}

// 赞赏功能接口实现
export const reqAppreciate = (knowledgeId: number) => request.post<number, CommonResponseData>(API.GETAPPRECIATE_URL + `${knowledgeId}`)
// 收藏功能接口实现
export const reqFollow = (knowledgeId: number) => request.post<number, CommonResponseData>(API.GETFOLLOW_URL + `${knowledgeId}`)
// 获取知识信息
export const reqKnowledgeInfoById = (knowledgeId: number) => request.post<undefined, KnowledgeResponseData>(API.GETKNOWLEDGEINFOBYID_URL + `${knowledgeId}`)
// 获取用户发布的知识信息
export const reqKnowledgeListByUserIdByRelease = (knowledgeUserDto: KnowledgeUserDto) => request.post<KnowledgeUserDto, PageInfoResponseData>(API.GETKNOWLEDGELISTBYUSERIDBYRELEASE_URL, knowledgeUserDto)
// 获取用户赞赏的知识信息
export const reqKnowledgeInfoListByUserIdByAppreciate = (knowledgeUserDto: KnowledgeUserDto) => request.post<KnowledgeUserDto, PageInfoResponseData>(API.GETKNOWLEDGEINFOLISTBYUSERIDBYAPPRECIATE_URL, knowledgeUserDto)
// 获取用户收藏的知识信息
export const reqKnowledgeInfoListByUserIdByFollow = (knowledgeUserDto: KnowledgeUserDto) => request.post<KnowledgeUserDto, PageInfoResponseData>(API.GETKNOWLEDGEINFOLISTBYUSERIDBYFOLLOW_URL, knowledgeUserDto)
// 撤贴
export const reqCancelKnowledge = (knowledgeId: number) => request.post<undefined, CommonResponseData>(API.GETCANCELKNOWLEDGE_URL + `${knowledgeId}`)