import { createApp } from 'vue'
import App from '@/App.vue'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入全局组件
import CodeqnaTop from '@/components/codeqna_top/index.vue'
import CodeqnaBottom from '@/components/codeqna_bottom/index.vue'
import CodeqnaTip from '@/components/codeqna_tip/index.vue'
import Login from '@/components/login/index.vue'
import ChatBox from '@/components/chat_box/index.vue'
import SugBox from '@/components/suggestion_box/index.vue'
import MailBox from '@/components/mail_box/index.vue'
import QuillEditor from '@/components/quillEditor/index.vue'
import CommentBox from '@/components/comment_box/index.vue'
import ReportBox from '@/components/report_box/index.vue';
import ResponseBox from '@/components/response_box/index.vue';
// 引入vue-route核心插件并安装
import router from '@/router'
// 引入pinia仓库
import pinia from '@/store'
// 引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入国际化插件
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './permission'

const app = createApp(App)
app.component('CodeqnaTop', CodeqnaTop)
app.component('CodeqnaBottom', CodeqnaBottom)
app.component('CodeqnaTip', CodeqnaTip)
app.component('Login', Login)
app.component('ChatBox', ChatBox)
app.component('SugBox', SugBox)
app.component('MailBox', MailBox)
app.component('QuillEditor', QuillEditor)
app.component('CommentBox', CommentBox)
app.component('ReportBox', ReportBox)
app.component('ResponseBox', ResponseBox)

// 安装vue-router
app.use(router);
// 安装element-plus
app.use(ElementPlus, {
    locale: zhCn,
  });
// 安装pinia仓库
app.use(pinia);
// 挂载
app.mount('#app')
