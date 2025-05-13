<template>
    <div class="articles">
        <div class="title">
            <svg t="1743604449321" class="icon-hot" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9377" width="20" height="20"><path d="M663.473231 448C568.713846 330.318769 572.573538 194.993231 572.573538 0 330.24 140.760615 339.337846 470.016 330.24 576c-76.445538-66.087385-90.899692-224.019692-90.899692-224.019692C158.601846 395.894154 118.153846 513.024 118.153846 608.019692 118.153846 837.750154 294.478769 1024 512 1024s393.846154-186.249846 393.846154-416.019692c0-136.507077-94.916923-199.483077-93.735385-385.496616-132.883692 40.014769-157.223385 153.442462-148.637538 225.516308z" fill="#f5400b" p-id="9378"></path></svg>
            <span>精彩文章</span>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.articles {
    width: 100%;
    height: 400px;
    padding: 10px;
    // border: 1px solid red;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 1px solid green;

        span {
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            font-weight: bold;
            background: linear-gradient(90deg, #f42828, #F59E0B);
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-left: 4px;
            position: relative;
            display: inline-block;
        }

    }
}
</style>