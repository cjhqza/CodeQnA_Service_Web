// 引入二次封装axios
import request from "@/utils/request";
import { CommonResponseData, TagSearchDto, TagSearchPageInfoResponseData, TagTreeResponseData } from "./type";

// 枚举请求地址
enum API {
    // 获取标签信息
    GETTAGBASEINFOLISTBYTAGSEARCHINFO = 'tag/tagInfo/getTagBaseInfoListByTagSearchInfo',
    // 关注功能实现
    GETFOLLOW = 'tag/tagInfo/auth/follow/',
    // 获取标签树
    GETTAGTREE = 'tag/tagInfo/getTagTree'

}
// 获取标签信息
export const reqTagBaseInfoListByTagSearchInfo = (tagSearchDto: TagSearchDto) => request.post<TagSearchDto, TagSearchPageInfoResponseData>(API.GETTAGBASEINFOLISTBYTAGSEARCHINFO, tagSearchDto)
// 关注功能实现
export const reqFollow = (tagId: number) => request.post<undefined, CommonResponseData>(API.GETFOLLOW + `${tagId}`)
// 获取标签树
export const reqTagTree = () => request.get<undefined, TagTreeResponseData>(API.GETTAGTREE)