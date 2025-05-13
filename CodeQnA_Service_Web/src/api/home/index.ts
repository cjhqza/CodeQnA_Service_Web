// 引入二次封装axios
import request from "@/utils/request";
import type { KnowledgeInfoResponseData, PageInfoResponseData } from "./type";

// 枚举请求地址
enum API {
    // 获取问答贴信息数据接口
    GETPOSTINFOBYPAGE_URL = 'knowledge/postInfo/getPostInfoByPage/',
    // 获取兴趣关联的问答贴信息数据接口
    GETPOSTINFOBYPAGEFORINTEREST_URL = 'knowledge/postInfo/auth/getPostInfoByInterest/',
    // 获取赞赏数排序的文章信息数据接口
    GETAPPRECIATEARTICLEINFOLIST_URL = 'knowledge/articleInfo/getAppreciateArticleInfoList',
    // 获取用户关注标签相关的文章信息数据接口
    GETRELATEDARTICLEINFOLIST_URL = 'knowledge/articleInfo//auth/getRelatedArticleInfoList'
}

// 获取问答贴信息数据接口
export const reqPostInfoByPage = (pageNum: number, pageSize: number, category: string) => request.get<undefined, PageInfoResponseData>(API.GETPOSTINFOBYPAGE_URL + `${pageNum}/${pageSize}?category=${category}`)
// 获取兴趣关联的问答贴信息数据接口
export const reqPostInfoByPageForInterest = (pageNum: number, pageSize: number) => request.get<undefined, PageInfoResponseData>(API.GETPOSTINFOBYPAGEFORINTEREST_URL + `${pageNum}/${pageSize}`)
// 获取赞赏数排序的文章信息数据接口
export const reqAppreciateArticleInfoList = () => request.get<undefined, KnowledgeInfoResponseData>(API.GETAPPRECIATEARTICLEINFOLIST_URL)
// 获取用户关注标签相关的文章信息数据接口
export const reqRelatedArticleInfoList = () => request.get<undefined, KnowledgeInfoResponseData>(API.GETRELATEDARTICLEINFOLIST_URL)