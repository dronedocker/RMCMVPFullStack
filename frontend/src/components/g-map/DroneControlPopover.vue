<template>
  <a-popover
    :visible="state.sVisible"
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
          {{ cancelText || 'cancel' }}
        </a-button>
        <a-button
          size="sm"
          :loading="props.loading"
          type="primary"
          class="confirm-btn"
          @click="onConfirm"
        >
          {{ okText || 'ok' }}
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

const state = reactive({
  sVisible: false,
})

watch(
  () => props.visible,
  (val) => {
    state.sVisible = !!val
  }
)

const overlayClassName = computed(() => {
  return 'drone-control-popconfirm'
})

function onConfirm(e: Event) {
  if (props.disabled) return
  emit('confirm', e)
}

function onCancel(e: Event) {
  state.sVisible = false
  emit('cancel', e)
}
</script>

<style lang="scss">
.drone-control-popconfirm {
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
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      margin-bottom: 5px;

      .form-label {
        flex: 1 0 60px;
        margin-right: 10px;
      }
    }
  }
}
</style>
