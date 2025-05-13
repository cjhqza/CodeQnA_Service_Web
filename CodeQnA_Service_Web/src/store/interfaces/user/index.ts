import { UserBaseInfo } from "@/api/user/type";

// 用户仓库相关数据的ts类型定义
export interface UserState { 
    loginVisiable: boolean,  // 用于控制登录组件的dialog显示与隐藏
    sugBoxVisiable: boolean, // 用于控制意见箱的dialog显示与隐藏
    mailBoxVisiable: boolean, // 用于控制收件箱的dialog显示与隐藏    
    reportBoxVisiable: boolean, // 用于控制举报箱的dialog显示与隐藏
    responseBoxVisiable: boolean, // 用于控制答复框的dialog显示与隐藏
    commentBoxVisiable: boolean, // 用于控制评论框的dialog显示与隐藏
    chatBoxVisiable: boolean, // 用于控制聊天框的dialog显示与隐藏
    code: string,   // 存储用户的验证码    
    userBaseInfo: UserBaseInfo,
}