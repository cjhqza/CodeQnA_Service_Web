<template>
    <div class="quillEditor">
        <QuillEditor ref="quillEditorRef" class="editor" :options="options" v-model:content="htmlContent"
            contentType="html" @textChange="textChange" />

        <input type="file" accept="video/*" name="file" ref="uploadFileVideo" id="uploadFileVideo"
            @change="handleVideoUpload" style="opacity: 0; width: 0; height: 0; cursor: pointer" />

        <input type="file" name="file" id="uploadFileImg" ref="uploadFileImg" @change="handleImgUpload"
            style="opacity: 0; width: 0; height: 0; cursor: pointer" />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, toRaw } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageResize from 'quill-blot-formatter'
import { FileUploadResponseData } from "@/api/upload/type";
import { reqFileUpload } from "@/api/upload";
import { ElMessage } from "element-plus";

Quill.register("modules/imageResize", ImageResize)

let fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "28px"];
Quill.register(fontSizeStyle, true);
var fonts = [
    "Microsoft-YaHei",
    "YouYuan",
    "SimSun",
    "SimHei",
    "KaiTi",
    "FangSong",
    "Arial",
    "Times-New-Roman",
    "sans-serif",
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

let props = defineProps(["content"]);

let emit = defineEmits(["updateContent"])

const quillEditorRef = ref();
const uploadFileImg = ref();
const uploadFileVideo = ref();
const htmlContent = ref<string>('');
const options = ref({
    theme: "snow",
    bounds: window.document.body,
    modules: {
        toolbar: {
            container: [
                [{ font: fonts }],
                [{ size: ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "28px"] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["clean"],
                ["link", "image", "video"],
            ],
            handlers: {
                video: function () {
                    const inputElement = document.querySelector("#uploadFileVideo") as HTMLInputElement;
                    inputElement?.click();
                },
                image: function () {
                    const inputElement = document.querySelector("#uploadFileImg") as HTMLInputElement;
                    inputElement?.click();
                },
            },
        },
        imageResize: {
            displayStyles: {
                backgroundColor: "black",
                border: "none",
                color: "white",
            },
            modules: ["Resize", "DisplaySize"],
        },
    },

    placeholder: "请输入......",
});

watch(
    () => props.content,
    (newVal) => {
        htmlContent.value = newVal || "";
        if (htmlContent.value === "" && quillEditorRef.value) {
            quillEditorRef.value.setText("");
        }
    },
    { immediate: true } // 立即执行一次
);

const handleImgUpload = async (evt: any) => {
    if (evt.target.files.length === 0) {
        return;
    }

    const formData = new FormData();
    formData.append("file", evt.target.files[0]);

    try {
        let result : FileUploadResponseData = await reqFileUpload(formData);
        if (result.code === 200) {
            // console.log(quillEditorRef.value);
            let quill = toRaw(quillEditorRef.value).getQuill();
            let length = quill.selection.savedRange.index;
            quill.insertEmbed(length, "image", result.data);
            quill.setSelection(length + 1);
        } else {
            ElMessage.error(result.message);
        }
    } catch (error) {
        console.log(error);
    }
    uploadFileImg.value.value = "";
};

const handleVideoUpload = async (evt: any) => {
    if (evt.target.files.length === 0) {
        return;
    }

    const formData = new FormData();
    formData.append("file", evt.target.files[0]);

    try {
        let result : FileUploadResponseData = await reqFileUpload(formData);
        if (result.code === 200) {
            let quill = toRaw(quillEditorRef.value).getQuill();
            let length = quill.selection.savedRange.index;
            quill.insertEmbed(length, "video", result.data);
            quill.setSelection(length + 1);
        } else {
            ElMessage.error(result.message);
        }
    } catch (error) {
        console.log(error);
    }
    uploadFileVideo.value.value = "";
};

const textChange = () => {
    emit("updateContent", htmlContent.value);
};
</script>
<style lang="scss">
.quillEditor {
    // border: 1px solid black;
    min-height: 400px;

    .editor {
        background: #fff;
        height: 100%;
    }
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
}

/* 自定义font-size */
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: "10px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: "12px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: "14px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    content: "24px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
    content: "28px";
    font-size: 14px;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "正文";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "微软雅黑";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
    content: "宋体";
    font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
    content: "黑体";
    font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft-YaHei"]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="YouYuan"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="YouYuan"]::before {
    content: "幼圆";
    font-family: "YouYuan";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
    content: "楷体";
    font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
    content: "仿宋";
    font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
    content: "Arial";
    font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Times-New-Roman"]::before {
    content: "Times New Roman";
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
    content: "sans-serif";
    font-family: "sans-serif";
}

.ql-font-SimSun {
    font-family: "SimSun";
}

.ql-font-SimHei {
    font-family: "SimHei";
}

.ql-font-YouYuan {
    font-family: "YouYuan";
}

.ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
    font-family: "KaiTi";
}

.ql-font-FangSong {
    font-family: "FangSong";
}

.ql-font-Arial {
    font-family: "Arial";
}

.ql-font-Times-New-Roman {
    font-family: "Times New Roman";
}

.ql-font-sans-serif {
    font-family: "sans-serif";
}
</style>