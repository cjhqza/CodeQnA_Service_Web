// 引入二次封装axios
import request from "@/utils/request";
import { KnowledgeSearchDto, PageInfoResponseData } from "../search/type";

// 枚举接口
enum API {
    // 知识搜索接口实现
    GETKNOWLEDGEINFOLISTBYKNOWLEDGESEARCHDTO = 'knowledge/knowledgeInfo/getKnowledgeInfoListByKnowledgeSearchDto',
}

// 知识搜索接口实现
export const reqKnowledgeInfoListByKnowledgeSearchDto = (knowledgeSearchDto: KnowledgeSearchDto) => request.post<KnowledgeSearchDto, PageInfoResponseData>(API.GETKNOWLEDGEINFOLISTBYKNOWLEDGESEARCHDTO, knowledgeSearchDto)
