<template>
    <div class="blogger-card">
        <el-card class="box-card" shadow="hover">
            <div class="background-image" :style="{ backgroundImage: `url(${props.bloggerInfo.bgImgUrl})` }"></div>
            <div class="avatar-container">
                <img :src="props.bloggerInfo.headImgUrl" alt="" class="avatar" />
            </div>
            <div class="blogger-info">
                <div class="blogger-base">
                    <div class="blogger-name" :title="props.bloggerInfo.userName">{{ props.bloggerInfo.userName }}</div>
                    <div class="blogger-gender">
                        <svg v-if="props.bloggerInfo.sex === 0" t="1744009321603" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1168" width="16" height="16"><path d="M511.9567 548.740913a182.7575 182.7575 0 1 1-186.596944 182.7575 184.719882 184.719882 0 0 1 186.682265-182.7575m0-109.637436a292.480257 292.480257 0 1 0 298.623366 292.394936 295.551812 295.551812 0 0 0-298.623366-292.394936zM476.46318 15.143618L261.880961 225.289146a48.80359 48.80359 0 0 0 0 69.963189 51.192577 51.192577 0 0 0 71.498966 0l179.174019-175.078614 179.17402 175.078614a51.192577 51.192577 0 0 0 50.083405 15.272452 50.254046 50.254046 0 0 0 37.114618-36.346729 49.059553 49.059553 0 0 0-15.528415-49.059554L549.412602 15.143618a51.192577 51.192577 0 0 0-72.778781 0z" fill="#508EF2" p-id="1169"></path><path d="M512.212662 59.083913a49.486158 49.486158 0 0 1 55.970551 55.970551v381.47002a49.486158 49.486158 0 0 1-55.970551 55.970551 49.486158 49.486158 0 0 1-55.97055-55.970551V115.054464a49.486158 49.486158 0 0 1 56.055871-55.970551z" fill="#508EF2" p-id="1170"></path></svg>
                        <svg v-else-if="props.bloggerInfo.sex === 1" t="1744009250028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="754" width="16" height="16"><path d="M512.00012 0.00064a318.847801 318.847801 0 0 1 226.303859 93.695941A318.911801 318.911801 0 0 1 831.99992 320.00044a318.847801 318.847801 0 0 1-93.695941 226.303859A318.911801 318.911801 0 0 1 560.00009 636.416242v83.583948h159.9999A47.87197 47.87197 0 0 1 767.99996 768.00016a47.87197 47.87197 0 0 1-47.99997 47.99997h-159.9999v159.9359a47.87197 47.87197 0 0 1-47.99997 47.99997 47.87197 47.87197 0 0 1-47.99997-47.99997V816.00013h-159.9999A47.87197 47.87197 0 0 1 256.00028 768.00016a47.87197 47.87197 0 0 1 47.99997-47.99997h159.9999V636.416242a318.847801 318.847801 0 0 1-178.303889-90.175943A318.847801 318.847801 0 0 1 192.00032 320.00044a318.847801 318.847801 0 0 1 93.695941-226.303859A318.847801 318.847801 0 0 1 512.00012 0.00064z m0 95.99994C388.480197 96.00058 288.00026 196.480517 288.00026 320.00044S388.480197 544.0003 512.00012 544.0003 735.99998 443.520363 735.99998 320.00044 635.520043 96.00058 512.00012 96.00058z" fill="#fd54a2" p-id="755"></path></svg>
                        <svg v-else t="1744009776144" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6727" width="16" height="16"><path d="M355 725.4c0-21.2 4.1-41.5 12.3-60.3 1.1-2.6 2.3-5.1 3.6-7.6h-51.1V544c18-2.8 35.2-7.9 51.4-14.8l-29.4-34.7-21.2-25c-12 3.2-24.5 4.9-37.5 4.9-80.5 0-146.4-64.1-146.4-146.4 0-80.5 65.9-146.4 146.4-146.4 47.4 0 89.8 22.9 116.6 58.1 23.9-9.1 49-15.3 75-18.7-37.7-67.1-109.6-112.7-191.6-112.7-120.8 0-219.7 98.9-219.7 219.7 0 108 78.7 199.5 183.1 216v113.5H81.8v73.2h164.8v183.1h73.2v-183h35.3c-0.1-1.8-0.1-3.6-0.1-5.4zM775.6 478.1V234.7l95.2 95.2 51.3-51.3-157.5-157.4c-14.6-14.6-36.6-14.6-51.3 0L607 227.5c1.3 0.3 2.6 0.7 3.9 1 25.2 6.6 48.1 16.4 68.4 29.2l23-23v39.7c20 16.7 35.8 36.5 47.1 59 13.2 26.3 19.9 55.7 19.9 87.3 0 19.4-3.4 38.7-10 57.3-6.2 17.2-15.2 33.8-26.8 49.5l-0.4 0.5-0.4 0.5c-5.4 7-11.6 14.2-18.9 21.8 9.1-1.8 18.4-2.7 28-2.7 80.5 0 146.4 65.9 146.4 146.4s-65.9 146.4-146.4 146.4c-36 0-69-13.1-94.6-34.9-6.8 10.8-15.1 20.7-24.7 29.7l-0.1 0.1-0.1 0.1c-9.1 8.4-18.9 15.6-29.4 21.6 39.2 36.3 91.6 58.5 148.9 58.5 120.8 0 219.7-98.9 219.7-219.7 0-109.7-80.5-201.2-184.9-217.7z" p-id="6728" fill="#0e932e"></path><path d="M667 420.7c0-36.1-14.2-64.4-42.6-85C596 315.3 556.7 305 506.6 305c-34.7 0-67 6.1-96.8 18.3-23 9.9-43.8 23-62.3 39.3l-10.8 9.5 56.2 66.3 6.8-6.1c17.6-12.2 33.2-21.2 46.7-27.1 21.2-8.1 36.8-12.2 46.7-12.2 14 0 25.8 2.6 35.5 7.8 9.7 5.2 14.5 13.6 14.5 25.4 0 7.2-3.4 14.9-10.2 23-6.8 8.1-16.9 18.3-30.4 30.4-11.7 10.4-21.4 19.3-28.8 26.8s-14.1 15.5-19.9 24c-11.3 17.2-17 35.2-17 54.2 0 6.8 0.7 13.5 2 20.3l1.4 8.8h114.4l-2-12.9c-0.5-1.8-0.7-4.5-0.7-8.1 0-11.8 4.5-23.9 13.5-36.6 5.8-7.7 18.9-20.3 39.3-37.9 19.4-16.7 33.6-30.9 42.7-42.7 13.1-17.5 19.6-35.8 19.6-54.8zM546.8 771.8c13.3-12.4 20-27.9 20-46.4s-6.7-34.1-20-46.7c-13.3-12.6-29.9-18.9-49.8-18.9s-36.6 6.3-50.1 18.9c-13.5 12.6-20.3 28.2-20.3 46.7 0 18.5 6.8 34 20.3 46.4 13.5 12.4 30.3 18.6 50.1 18.6s36.5-6.2 49.8-18.6z" p-id="6729" fill="#0e932e"></path></svg>
                    </div>
                </div>
                <div class="blogger-sign" :title="props.bloggerInfo.signture">Sign: {{ props.bloggerInfo.signture }}</div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">

let props = defineProps(['bloggerInfo'])

</script>

<style scoped lang="scss">
.blogger-card {
    .box-card {
        cursor: pointer;
        position: relative;
        height: 200px;
        width: 100%;

        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: top;
            z-index: 1;
        }

        .avatar-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;

            .avatar {
                width: 65px;
                height: 65px;
                border-radius: 50%;
                border: 3px solid #fff;
            }
        }

        .blogger-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            padding-top: 40px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            background-color: rgba(255, 255, 255, 1);
            /* 半透明背景 */
            z-index: 2;
            text-align: center;

            display: flex;
            flex-direction: column;
            align-items: center;

            .blogger-base {
                display: flex;
                min-width: 50%;
                max-width: 100%;
                justify-content: space-between;
                margin-bottom: 15px;
                font-size: 15px;
                font-weight: 900;
                // border: 1px solid red;

                .blogger-name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 80%;
                }
            }

            .blogger-sign {
                font-size: 12px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                width: 90%;
                height: 30%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                // border: 1px solid red;
            }
        }
    }
}
</style>