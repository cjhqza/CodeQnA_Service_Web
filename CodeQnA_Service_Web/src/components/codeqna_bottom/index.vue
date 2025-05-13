<template>
    <div class="bottom">
        <div class="content">
            <!-- 左侧 -->
            <div class="left">
                Project made By STU Student For Seeking solutions To Computer Problems
            </div>
            <!-- 右侧 -->
            <div class="right">
                <span>联系我们</span>
                <span>合作伙伴</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.bottom {
    width: 100%;
    height: 40px;
    background: #fff;
    display: flex;
    justify-content: center;
    // margin-top: 10px;

    border-top: 1px solid #CCC;

    .content {
        width: 100%;
        height: 100%;
        padding: 0px 20px;

        // 两边分布
        display: flex;
        justify-content: space-between;

        align-items: center;
        font-size: 14px;

        .right {
            span {
                margin: 0 5px;
            }
        }

    }
}
</style>