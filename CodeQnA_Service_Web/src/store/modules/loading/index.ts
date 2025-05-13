import { defineStore } from "pinia";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "@/store/interfaces/loading";

const useLoadingStore = defineStore('loading', {
    state: () => ({
        loadingInstance: null as LoadingInstance | null
    }),
    actions: {
        start(): void {
            if (!this.loadingInstance) {
                this.loadingInstance = ElLoading.service({
                    lock: true,
                    text: '加载中...',
                    background: 'rgba(0, 0, 0, 0.7)',
                    fullscreen: true,
                })
            }
        },
        stop() {
            if (this.loadingInstance) {
                this.loadingInstance.close()
                this.loadingInstance = null
            }
        },
    }
});

export default useLoadingStore;