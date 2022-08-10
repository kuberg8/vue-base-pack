<template>
  <div>
    <div
      :class="[$style.filedrop, { [$style['avatar']]: avatar }]"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="fileDrop"
      @click="openWindow"
      :style="{
        'background-image': `url(${previewImage})`,
        border: previewImage ? 'none' : '',
        opacity: isDragOver ? '0.9' : '',
        'min-height': height,
      }"
    >
      <div v-if="!avatar" :class="$style.text">
        <svg-icon name="upload" width="24px" height="24px" />
        {{ $t('modals.profile_settings.profile.upload') }}
      </div>

      <svg-icon name="user" v-else-if="avatar && !previewImage" />
    </div>

    <input
      ref="fileInput"
      type="file"
      @input="setFile"
      :accept="accept"
      hidden
    />

    <!-- <transition name="error-show">
      <span
        v-if="hasValidationError && !serverValidationPending && $slots.default"
      >
        <slot />
      </span>
    </transition> -->
  </div>
</template>

<script lang="ts">
import { Prop, Component } from 'nuxt-property-decorator'
import BaseInputMixin from '@/components/ui/Form/BaseInput/InputMixins/BaseInputMixin.vue'

@Component({
  transition: 'error-show',
})
export default class UiFileDrop extends BaseInputMixin {
  @Prop({ type: String, default: 'image/*' }) accept!: string
  @Prop({ type: String, default: '192px' }) height!: string
  @Prop({ type: Boolean, default: false }) avatar!: boolean

  public previewImage: null = null
  public isDragOver: boolean = false

  openWindow() {
    ;(this as any).$refs.fileInput.click()
  }

  setFile(dropFile: File) {
    const input: any = this.$refs.fileInput
    const file: File = input.files[0] || dropFile

    if (file) {
      if (this.avatar) {
        const reader = new FileReader()

        reader.onload = ({ target }: any) => {
          this.previewImage = target!.result
        }

        reader.readAsDataURL(file)
      }

      this.inputValue = file
      this.$emit('upload', file)
      console.log(file)
    }
  }

  public fileDrop(e: DragEvent): void {
    const [file]: any = e.dataTransfer!.files
    this.setFile(file)
    this.isDragOver = false
  }
}
</script>

<style module lang="scss">
.filedrop {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 23px;
  color: rgba(0, 32, 51, 0.6);
  position: relative;
  border: 1px dashed $color-bg-1;
  border-radius: 8px;
  transition: 0.2s;
  text-align: center;
  background: $color-bg-3;
  transition: 0.2s;
  fill: $color-text-4;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;
    width: 324px;
    font-size: 16px;
    color: $color-bg-1;
  }

  &.avatar {
    border-radius: 50%;
    width: 94px;
    min-height: 94px !important;
    height: 94px !important;
  }
}
</style>
