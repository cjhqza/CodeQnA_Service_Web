// 定义详情模块数据ts类型
export interface ResponseData {
    code: number,
    message: string,
}

export interface FileUploadResponseData extends ResponseData{
    data: string,
}