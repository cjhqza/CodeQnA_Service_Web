// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface CommonResponseData extends ResponseData {
    data: null;
}

export interface ReportDto {
    'targetType': number,
    'targetId': number,
    'reporterId': number,
    'reportReason': string,
}

export interface SimpleReportVo {
    'id': number,
    'reportReason': string,
    'feedback': string,
    'processTime': string,
}

export type SimpleReportVoList = SimpleReportVo[]

export interface SimpleReportResponseData extends ResponseData {
    data: SimpleReportVoList,
}

export interface AprvSugDto {
    'userId': number,
    'title': string,
    'content': string,
}
