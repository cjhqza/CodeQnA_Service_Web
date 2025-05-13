// 引入二次封装axios
import request from "@/utils/request";
import { AprvSugDto, CommonResponseData, ReportDto, SimpleReportResponseData } from "./type";

enum API {
    // 提交举报
    GETSUBMITREPORT_URL = '/report/reportInfo/submitReport',
    // 接收举报回执
    GETREPORTRECEIPT_URL = '/report/reportInfo/getReportReceipt/',
    // 上传建议信
    GETSUBMITSUGGESTION_URL = '/report/reportInfo/submitSuggestion',
}

// 提交举报
export const reqSubmitReport = (reportDto: ReportDto) => request.post<ReportDto, CommonResponseData>(API.GETSUBMITREPORT_URL, reportDto);
// 接收举报回执
export const reqReportReceipt = (userId: number) => request.get<undefined, SimpleReportResponseData>(API.GETREPORTRECEIPT_URL + `${userId}`)
// 上传建议信
export const reqSubmitSuggestion = (aprvSugDto: AprvSugDto) => request.post<AprvSugDto, CommonResponseData>(API.GETSUBMITSUGGESTION_URL, aprvSugDto)