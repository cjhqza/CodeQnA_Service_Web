// 引入二次封装axios
import request from "@/utils/request";
import { FileUploadResponseData } from "./type";

// 枚举接口
enum API {
    // 文件上传
    GETFILEUPLOAD_URL = '/upload/fileUpload',
}

export const reqFileUpload = (formData: FormData) => request.post<any, FileUploadResponseData>(API.GETFILEUPLOAD_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});