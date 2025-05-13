// 路由鉴权:路由能不能被访问到权限设置 -> 全局守卫完成
// 引入路由器
import router from "./router";

import pinia from "@/store";
// 引入用户和加载仓库
import useUserStore from "./store/modules/user";
import useLoadingStore from "./store/modules/loading";
let userStore = useUserStore(pinia);
let loadingStore = useLoadingStore(pinia);

// 存储用户未登录可访问的路由路径
let whiteList = ['/home', '/tag', '/search', '/knowledge'];
// 前置守卫
router.beforeEach((to, from, next) => {
    loadingStore.start();

    // 动态设置网页左上角的标签体
    document.title = `CodeQnA-${to.meta.title}`;

    // 判断用户是否登录
    if (userStore.userBaseInfo.token) {
        // 已登录，放行
        next();
    } else {
        if (whiteList.includes(to.path)) {
            // 未登录但路径可访问，放行
            next();
        } else {
            // 登录组件出来
            userStore.loginVisiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } });
        }
    }
    next();
});

// 后置路由
router.afterEach((to, from) => {
    loadingStore.stop();
})