import { createRouter, createWebHistory } from 'vue-router'

// 创建路由器实例，管理多个路由
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta:{
                title: '首页',
            }
        },
        {
            path: '/tag',
            component: () => import('@/pages/tag/index.vue'),
            meta:{
                title: '标签关注',
            }
        },
        {
            path: '/search',
            component: () => import('@/pages/search/index.vue'),
            meta:{
                title: '搜索导航',
            }
        },
        {
            path: '/createPost',
            component: () => import('@/pages/createPost/index.vue'),
            meta: {
                title: '创作中心/问帖'
            }
        },
        {
            path: '/createArticle',
            component: () => import('@/pages/createArticle/index.vue'),
            meta: {
                title: '创作中心/文章'
            }
        },
        {
            path: '/user',
            component: () => import('@/pages/user/index.vue'),
            meta: {
                title: '用户中心'
            },
            redirect: '/user/release',
            children: [
                {
                    path: 'release',
                    component: () => import('@/pages/user/release/index.vue')
                },
                {
                    path: 'appreciate',
                    component: () => import('@/pages/user/appreciate/index.vue')
                },
                {
                    path: 'follow',
                    component: () => import('@/pages/user/follow/index.vue')
                },
            ]
        },
        {
            path: '/knowledge',
            component: () => import('@/pages/knowledge/index.vue'),
            meta: {
                title: '信息中心'
            }
        },
        {
            path: '/',
            redirect: '/home',
        },
    ],
    // 滚动行为：控制滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }

})