import { ComponentPublicInstance } from 'vue'

export interface LoadingInstance {
  setText(text: string): void
  removeElLoadingChild(): void
  close(): void
  handleAfterLeave(): void
  vm: ComponentPublicInstance
}