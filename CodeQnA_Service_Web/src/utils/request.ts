import useUserStore from '@/store/modules/user/index';
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 利用axios.create方法插件一个axios实例：可以设置基础路径、超时的时间的设置
const request = axios.create({
    baseURL: 'http://localhost:8500/api',    // 请求的基础路径的设置
    // timeout: 60000   // 超时的时间的设置每超出60秒请求就是失败的
});

// 请求拦截器
request.interceptors.request.use((config) => {
    // 获取用户仓库
    let userStore = useUserStore();
    // token:公共参数，如果用户登录了需要携带
    if (userStore.userBaseInfo.token) {
        config.headers.token = userStore.userBaseInfo.token;
    }
    // config: 请求拦截器回调注入的对象（配置对象），配置对象的身上最终要的一件事情headers属性
    // 可以通过请求头携带公共参数-token
    // console.log(config);
    return config;
});

// 响应拦截器
request.interceptors.response.use((response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    console.log(response)
    return response.data;
}, (error) => {
    // 处理http网络错误
    // console.log(error)
    let status = error.response.status;
    switch (status) {
        case 404:
            // 错误提示信息
            ElMessage({
                type: 'error',
                message: '请求失败路径出现问题'
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: '参数有误'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
});

// 暴露axios
export default request;