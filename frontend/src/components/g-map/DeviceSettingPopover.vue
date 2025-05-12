<template>
  <a-popover
    :visible="visibility.sVisible"
    trigger="click"
    v-bind="$attrs"
    :overlay-class-name="overlayClassName"
    placement="bottom"
    v-on="$attrs"
  >
    <template #content>
      <div class="title-content"></div>
      <slot name="formContent" />
      <div class="uranus-popconfirm-btns">
        <a-button size="sm" @click="onCancel">
          {{ cancelText || '取消' }}
        </a-button>
        <a-button
          size="sm"
          :loading="props.loading"
          type="primary"
          class="confirm-btn"
          @click="onConfirm"
        >
          {{ okText || '确定' }}
        </a-button>
      </div>
    </template>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch, computed } from 'vue'

const props = defineProps<{
  visible?: boolean
  loading?: boolean
  disabled?: boolean
  title?: string
  okText?: string
  cancelText?: string
  width?: number
}>()

const emit = defineEmits(['cancel', 'confirm'])

// ✅ renamed to avoid conflict with other components' "state"
const visibility = reactive({
  sVisible: false,
})

watch(
  () => props.visible,
  (val) => {
    visibility.sVisible = !!val
  }
)

const overlayClassName = computed(() => {
  return 'device-setting-popconfirm'
})

function onConfirm(e: Event) {
  if (props.disabled) return
  emit('confirm', e)
}

function onCancel(e: Event) {
  visibility.sVisible = false
  emit('cancel', e)
}
</script>

<style lang="scss">
.device-setting-popconfirm {
  min-width: 300px;

  .uranus-popconfirm-btns {
    display: flex;
    padding: 10px 0;
    justify-content: flex-end;

    .confirm-btn {
      margin-left: 10px;
    }
  }

  .form-content {
    display: inline-flex;
    align-items: center;

    .form-label {
      padding-right: 10px;
    }
  }
}
</style>
