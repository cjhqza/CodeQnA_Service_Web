<template>
    <div class="tip">
        <div class="welcome">
            <div class="wel-title">欢迎使用 CodeQnA 平台</div>
            <div class="wel-content">
                这里，是致力于创建一个开放、高效的计算机技术问答平台，通过平等对话、知识共享和协作创新，助力每个热爱计算机行业的用户突破技术壁垒。
            </div>
        </div>
        <div class="rules">
            <div class="rules-title">CodeQnA 平台使用须知</div>
            <div class="rules-list">
                <ul>
                    <li>1. 内容必须与计算机科学直接相关，包括但不限于：编程、算法、工具使用等。</li>
                    <li>2. 禁止发布政治敏感、色情低俗、人身攻击等内容。</li>
                    <li>3. 禁止黑客攻击教程、盗版资源等违法内容。</li>
                    <li>4. 禁止发布与问题无关的广告或外部链接。</li>
                    <li>5. 禁止发布他人隐私信息，如邮箱、电话、住址等。</li>
                    <li>6. 禁止发布"XX语言是不是垃圾"等引战内容。</li>
                    <li>7. 用户需对内容真实性负责，恶意误导内容将被停用账号。</li>
                    <li>8. 违规严重者将处以永久禁言或注销账号。</li>
                    <li>9. 以建设性评论优化问题或答案，禁止辱骂、嘲讽。</li>
                    <li>10. 违规内容可以通过举报交由后台解决。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.tip {
    width: 100%;
    display: flex;
    flex-direction: column;
    // border: 1px solid red;

    .welcome {
        width: 100%;
        // height: 100px;
        border: 1px solid #BBB;
        background-color: #e6edf5;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 20px;
        // border: 1px solid purple;

        .wel-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .wel-content {
            font-size: 15px;
            color: #444;
            line-height: 25px;
        }
    }

    .rules {
        width: 100%;
        border: 1px solid #BBB;
        background-color: #fff;
        border-radius: 6px;

        .rules-title {
            text-align: center;
            font-size: 15px;
            font-weight: 700;
            padding: 12px 0;
            padding-left: 8px;
            border-bottom: 1px solid #DDD;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            background-color: rgb(248, 220, 220);
            // border: 1px solid red;
        }

        .rules-list {
            font-size: 15px;
            color: #333;
            padding-top: 8px;
            padding-left: 10px;
            padding-right: 10px;
            // border: 1px solid red;

            ul {
                li {
                    line-height: 22px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>