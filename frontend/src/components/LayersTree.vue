<template>
  <span>
    <a-tree
      draggable
      :defaultExpandAll="true"
      class="device-map-layers"
      @drop="onDrop"
      v-bind="$attrs"
    >
      <a-tree-node
        v-for="layer in getTreeData"
        :key="layer.id"
        :title="layer.name"
        :id="layer.id"
      >
        <template v-if="layer.elements">
          <a-tree-node
            v-for="resource in layer.elements"
            :key="getLayerTreeKey('resource', resource.id)"
            :id="getLayerTreeKey('resource', resource.id)"
          >
            <template #title>
              {{ resource.name }}
            </template>
          </a-tree-node>
        </template>
      </a-tree-node>
    </a-tree>
  </span>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType, reactive } from 'vue'
import { useMyStore } from '/@/store'
import { DropEvent, mapLayer } from '/@/types/mapLayer'
import { getLayerTreeKey } from '/@/utils/layer-tree'

const store = useMyStore()

const props = defineProps({
  layerData: Array as PropType<mapLayer[]>
})

const state = reactive<{
  checkedKeys: string[]
  expandedKeys: string[]
}>({
  checkedKeys: [],
  expandedKeys: []
})

const getTreeData = computed(() => {
  return JSON.parse(JSON.stringify(props.layerData || []))
})

const shareId = computed(() => store.state.layerBaseInfo.share)
const defaultId = computed(() => store.state.layerBaseInfo.default)

function onDrop ({ node, dragNode, dropPosition, dropToGap }: DropEvent) {
  const _treeData = [...(props.layerData || [])]
  const dragKey = dragNode.eventKey.replaceAll('resource__', '')
  const dropKeyRaw = node.eventKey.includes(shareId.value) || node.eventKey.includes(defaultId.value)
    ? node.eventKey
    : node.$parent?.eventKey
  if (!dragKey || !dropKeyRaw) return
  const dropKey = dropKeyRaw.replaceAll('resource__', '')

  let dragObj: mapLayer = {} as mapLayer

  const loop = (data: mapLayer[], key: string, callback: Function) => {
    for (const item of data) {
      if (item.id === key) {
        callback(item, data.indexOf(item), data)
        return
      }
      if (item.elements) loop(item.elements, key, callback)
    }
  }

  loop(_treeData, dragKey, (item: mapLayer, index: number, arr: mapLayer[]) => {
    arr.splice(index, 1)
    dragObj = item
  })

  if (!dropToGap) {
    loop(_treeData, dropKey, (item: mapLayer) => {
      item.elements = item.elements || []
      item.elements.push(dragObj)
    })
  }
}
</script>
