// 引入二次封装axios
import request from "@/utils/request";
import { CommonResponseData, KnowledgeDraftInfo, KnowledgeDraftInfoResponseData, KnowledgeIdResponseData } from "./type";

enum API {
    // 获取草稿
    GETDRAFTKNOWLEDGE_URL = '/knowledge/create/getDraftKnowledge/',
    // 保存已有的草稿
    GETSAVEDRAFTKNOWLEDGE_URL = '/knowledge/create/saveDraftKnowledge',
    // 新建草稿
    GETADDDRAFTKNOWLEDGE_URL = '/knowledge/create/addDraftKnowledge',
    // 发布问答
    GETPUBLISHKNOWLEDGE_URL = '/knowledge/create/publishKnowledge'
}
// 获取草稿
export const reqDraftKnowledge = (type: number) => request.get<undefined, KnowledgeDraftInfoResponseData>(API.GETDRAFTKNOWLEDGE_URL + `${type}`)
// 保存已有的草稿
export const reqSaveDraftKnowledge = (knowledgedraftInfo: KnowledgeDraftInfo) => request.post<KnowledgeDraftInfo, CommonResponseData>(API.GETSAVEDRAFTKNOWLEDGE_URL, knowledgedraftInfo)
// 新建草稿
export const reqAddDraftKnowledge = (knowledgedraftInfo: KnowledgeDraftInfo) => request.post<KnowledgeDraftInfo, KnowledgeIdResponseData>(API.GETADDDRAFTKNOWLEDGE_URL, knowledgedraftInfo)
// 发布问答
export const reqPublishKnowledge = (knowledgedraftInfo: KnowledgeDraftInfo) => request.post<KnowledgeDraftInfo, CommonResponseData>(API.GETPUBLISHKNOWLEDGE_URL, knowledgedraftInfo)