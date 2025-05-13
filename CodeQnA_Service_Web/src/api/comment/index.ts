// 引入二次封装axios
import request from "@/utils/request";
import { CommentDto, CommentInfoResponseData, CommonResponseData } from "./type";

// 枚举请求地址
enum API {
    // 根据知识id和分类获取答复评论数据
    GETCOMMENTINFOBYKNOWLEDGEIDANDCATEGORY = '/comment/commentInfo/getCommentInfoByKnowledgeIdAndCategory/',
    // 点赞评论功能实现
    GETAPPRECIATE_URL = '/comment/commentInfo/appreciate/',
    // 提交评论功能实现
    GETSUBMITCOMMENT_URL = '/comment/commentInfo/submitComment',
}
// 根据知识id和分类获取答复评论数据
export const reqCommentInfoByKnowledgeIdAndCategory = (knowledgeId: number, category: string) => request.get<undefined, CommentInfoResponseData>(API.GETCOMMENTINFOBYKNOWLEDGEIDANDCATEGORY + `${knowledgeId}?category=${category}`)
// 点赞评论功能实现
export const reqAppreciateComment = (commentId: number) => request.post<undefined, CommonResponseData>(API.GETAPPRECIATE_URL + `${commentId}`)
// 提交评论功能实现
export const reqSubmitComment = (commentDto: CommentDto) => request.post<CommentDto, CommonResponseData>(API.GETSUBMITCOMMENT_URL, commentDto)

