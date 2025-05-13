<template>
    <div class="login">
        <!-- title：对话框左上角的标题， v-model：控制对话框显示与隐藏 -->
        <el-dialog v-model="userStore.loginVisiable" title="CodeQnA 用户注册登录" ref="dialog">
            <!-- 对话框身体部分结构 -->
            <div class="login-container">
                <div class="code-box" v-show="scene == 0">
                    <div class="login-title">免密登录</div>
                    <el-form :model="loginCodeParam" :rules="codeRules" ref="codeForm" class="login-form">
                        <el-form-item prop="phone">
                            <el-input placeholder="请你输入手机号码" :prefix-icon="Iphone" v-model="loginCodeParam.phone"
                                size="large"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-row :gutter="8">
                                <el-col :span="18">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginCodeParam.code"
                                        size="large"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-button size="large" :disabled="!isCodePhone || flag">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"></CountDown>
                                        <span v-else @click="getCode">获取验证码</span>
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <p class="login-tip">新手机号将自动注册，默认密码为手机号码</p>
                    <el-button :disabled="!isCodePhone || (loginCodeParam.code.length < 6)" style="width: 100%;"
                        type="primary" size="large" @click="codeLogin">登录/注册
                    </el-button>
                    <div class="bottom" @click="changScene">
                        <svg t="1744301519371" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4932" width="24" height="24">
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#488DEB"
                                p-id="4933"></path>
                            <path
                                d="M653.824 765.47072H370.2272C335.4624 765.47072 307.2 748.4416 307.2 711.68V512c0-36.72064 28.2624-66.54976 63.0272-66.54976h16.3328a130.48832 130.48832 0 0 1-2.59072-25.62048v-25.62048C384 323.54304 441.31328 266.24 512.02048 266.24c70.7072 0 128.01024 57.30304 128.01024 128.01024v25.62048c0 8.7552-0.88064 17.3056-2.59072 25.62048h16.3328c34.7648 0 63.0272 29.88032 63.0272 66.54976V711.68c0.0512 36.7616-28.2112 53.79072-62.976 53.79072z m-167.3728-147.7632v58.18368a25.67168 25.67168 0 0 0 25.62048 25.62048 25.6512 25.6512 0 0 0 25.62048-25.62048v-58.19392c15.55456-8.79616 26.112-25.18016 26.112-44.19584 0-28.3136-23.17312-51.2-51.68128-51.2-28.60032 0-51.73248 22.8864-51.73248 51.2-0.1024 18.97472 10.51648 35.39968 26.0608 44.19584zM588.84096 394.24A76.8 76.8 0 0 0 512.02048 317.44a76.8 76.8 0 0 0-76.81024 76.81024v51.2h153.63072v-51.2z"
                                fill="#FFFFFF" p-id="4934"></path>
                        </svg>
                        <p>密码登录</p>
                    </div>
                </div>
                <div class="pw-box" v-show="scene == 1">
                    <div class="login-title">密码登录</div>
                    <el-form :model="loginPwParam" :rules="pwRules" ref="pwForm" class="login-form">
                        <el-form-item prop="phone">
                            <el-input placeholder="请你输入手机号码" :prefix-icon="Iphone" v-model="loginPwParam.phone"
                                size="large"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" :prefix-icon="Lock" v-model="loginPwParam.password"
                                size="large"></el-input>
                        </el-form-item>
                    </el-form>
                    <p class="login-tip">新手机号请移至&lt;免密登录&gt;进行注册</p>
                    <el-button :disabled="!isPwPhone || !hasPassword" style="width: 100%;"
                        type="primary" size="large" @click="pwLogin">登录
                    </el-button>
                    <div class="bottom" @click="changScene">
                        <svg t="1744302443828" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6139" width="24" height="24"><path d="M651.36 529.76v193.12a18.56 18.56 0 0 1-18.56 18.56H299.36a18.56 18.56 0 0 1-18.56-18.56v-481.6a18.56 18.56 0 0 1 18.56-18.56h92.48a192 192 0 0 1 35.84-55.52h-128a74.08 74.08 0 0 0-74.08 74.08v555.68a74.08 74.08 0 0 0 74.08 74.24h333.12a74.08 74.08 0 0 0 74.08-74.24v-267.2zM521.6 816h-111.04v-37.44h111.04z" p-id="6140" fill="#2988fb"></path><path d="M672 152.8h-134.4a128 128 0 0 0-126.88 127.04v30.24a127.04 127.04 0 0 0 96 123.04v53.28c0 14.56 8.64 19.68 21.92 12.16l106.88-61.6H672a128 128 0 0 0 126.88-126.88v-30.24A128 128 0 0 0 672 152.8z m-184.48 153.76h118.4v39.52h-118.4z m215.2-37.44H487.52v-39.52h215.2z" p-id="6141" fill="#2988fb"></path></svg>
                        <p>免密登录</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Iphone, Lock } from '@element-plus/icons-vue';
import CountDown from '@/components/countdown/index.vue'
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
// 获取路由器对象
let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();

// 0代表短信服务登录  1代表密码登录
let scene = ref<number>(0)

// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false);   // 真，开启倒计时；假，并非倒计时

// 获取form组件实例
let codeForm = ref<any>();
let pwForm = ref<any>();

// 收集表单数据--短信验证码
let loginCodeParam = reactive({
    phone: '',  // 收集手机号码
    code: '',   // 收集验证码
});

// 收集表达数据--密码
let loginPwParam = reactive({
    phone: '',  // 收集手机号码
    password: '',   // 收集密码
});

// 计算出当前表单元素收集的内容是否为手机号码格式
let isCodePhone = computed(() => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // 返回布尔值：真为手机号码，假为不是手机号码
    return reg.test(loginCodeParam.phone);
});
let isPwPhone = computed(() => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // 返回布尔值：真为手机号码，假为不是手机号码
    return reg.test(loginPwParam.phone);
});

let hasPassword = computed(() => {
   return loginPwParam.password.length !== 0;
});

// 获取验证码按钮的回调
const getCode = async () => {
    // 解决element-plus按钮禁用还能点击的问题
    if (!isCodePhone.value || flag.value) {
        return;
    }
    // 开启倒计时模式，倒计时组件显示出来
    flag.value = true;
    // 通知pinia仓库存储验证码
    try {
        await userStore.getCode(loginCodeParam.phone);
        // loginCodeParam.code = userStore.code;
    } catch (error) {
        // 获取验证码失败
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}
// 计数器子组件绑定的自定义事件
// 当倒计时为零的时候，通知父组件倒计时组件隐藏
const getFlag = (val: boolean) => {
    // 倒计时模式结束
    flag.value = val;
}
// 点击免密登录按钮回调
const codeLogin = async () => {
    // 保证表单校验两项都符合条件
    await codeForm.value.validate();
    // 发起登录请求
    // 登录请求成功：顶部组件需要展示用户名字、对话框关闭
    // 登录请求失败：弹出对应登录失败的错误信息
    try {
        // 用户免密登录成功
        await userStore.userCodeLogin(loginCodeParam);
        // 关闭对话框
        userStore.loginVisiable = false;
        // 获取url的query参数
        let redirect = $route.query.redirect;
        if (redirect) {
            $router.push(redirect as string);
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message,
        })
    }
}
// 点击密码登录按钮回调
const pwLogin = async () => {
    await pwForm.value.validate();
    try {
        // 用户免密登录成功
        await userStore.userPwLogin(loginPwParam);
        // 关闭对话框
        userStore.loginVisiable = false;
        // 获取url的query参数
        let redirect = $route.query.redirect;
        console.log(redirect);
        if (redirect) {
            $router.push(redirect as string);
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message,
        })
    }
}
// 自定义校验规则：手机号码自定义校验规则
const validatorPhone = (rules: any, value: any, callBack: any) => {
    // rule：即为表单验证规则对象
    // value：即为当前文本的内容
    // callBack：回调函数
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error('手机号码格式有误'));
    }
}
// 验证码自定义规则
const validatorCode = (rules: any, value: any, callBack: any) => {
    if (/^\d{6}$/.test(value)) {
        callBack();
    } else {
        callBack(new Error('验证码格式有误'));
    }
}
// 密码自定义规则
const validatorPw = (rules: any, value: any, callBack: any) => {
    if (value.length > 0) {
        callBack();
    } else {
        callBack(new Error('密码不能为空'));
    }
}
// 验证码表单校验规则对象
const codeRules = {
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}
// 密码表单校验规则对象
const pwRules = {
    phone: [{ trigger: 'change', validator: validatorPhone }],
    password: [{ trigger: 'change', validator: validatorPw }]
}

// 关闭窗口按钮的回调
const closeDialog = () => {
    userStore.loginVisiable = false;
}

// 登录方式交替
const changScene = () => {
    scene.value = scene.value ^ 1;
    // console.log(scene.value)
}

</script>

<style scoped lang="scss">
.login {

    ::v-deep(.el-dialog) {
        width: 500px;
    }

    ::v-deep(.el-dialog__header) {
        font-weight: 600;
    }

    ::v-deep(.el-dialog__body) {
        width: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
    }

    ::v-deep(.el-dialog__footer) {
        display: flex;
        justify-content: center;
    }

    .login-container {
        padding: 10px 20px;
        // border: 1px solid #ccc;
        // border-radius: 5px;

        .login-title {
            width: 100%;
            font-size: 30px;
            color: #444;
            font-weight: 900;
            text-align: center;
            margin-bottom: 22px;
            // border: 1px solid red;
        }

        .login-form {
            .el-form-item {
                margin-bottom: 22px;
            }
        }

        .login-tip {
            font-size: 14px;
            color: #aaa;
            margin-bottom: 22px;
        }

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 22px;

            p {
                // width: 100%;
                text-align: center;
                color: #2988fb;
                margin-top: 2px;
            }

            svg,
            p {
                cursor: pointer;
            }
        }
    }
}
</style>