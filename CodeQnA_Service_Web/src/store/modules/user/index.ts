import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";
import type { LoginCodeData, LoginPwData, UserLoginResponseData } from "@/api/user/type";
import { reqCode, reqUserCodeLogin, reqUserPwLogin, reqLogout } from "@/api/user";
import { defineStore } from "pinia";
import { UserState } from "@/store/interfaces/user";

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            loginVisiable: false,    // 用于控制登录组件的dialog显示与隐藏
            sugBoxVisiable: false,  // 用于控制意见箱的dialog显示与隐藏
            mailBoxVisiable: false, // 用于控制收件箱的dialog显示与隐藏
            reportBoxVisiable: false, // 用于控制举报箱的dialog显示与隐藏
            responseBoxVisiable: false, // 用于控制答复框的dialog显示与隐藏
            commentBoxVisiable: false, // 用于控制评论框的dialog显示与隐藏
            chatBoxVisiable: false, // 用于控制聊天框的dialog显示与隐藏  
            code: '',   // 存储用户的验证码
            userBaseInfo: JSON.parse(GET_TOKEN() as string) || {}
        }
    },

    actions: {
        // 获取验证码的方法
        async getCode(phone: string) {
            // 在向服务器携带手机号码，获取验证码
            // 正常开发的时候，只需要发一个请求，后台就会将验证码推送到用户手机设备当中
            // 此项目服务器不能向用户手机设备推送验证码（花钱）
            let result: any = await reqCode(phone);
            console.log(result);
            if (result.code == 200) {
                // this.code = result.data;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 用户免密登录方法
        async userCodeLogin(loginCodeData: LoginCodeData) {
            // console.log(loginData)
            let result: UserLoginResponseData = await reqUserCodeLogin(loginCodeData);
            if (result.code == 200) {
                this.userBaseInfo = result.data;
                // 本地存储持久化存储用户信息
                SET_TOKEN(JSON.stringify(this.userBaseInfo))
                // 返回一个成功的Promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userPwLogin(loginPwData: LoginPwData) {
            let result: UserLoginResponseData = await reqUserPwLogin(loginPwData);
            if (result.code == 200) {
                this.userBaseInfo = result.data;
                // 本地存储持久化存储用户信息
                SET_TOKEN(JSON.stringify(this.userBaseInfo))
                // 返回一个成功的Promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 退出登录方法
        async logout() {
            await reqLogout();
            // 清空仓库的数据
            this.userBaseInfo = { id: -1, headImgUrl: '', userName: '', token: '' };
            // 清空本地存储的数据
            REMOVE_TOKEN();
        },
    },

    getters: {

    }

});

export default useUserStore;