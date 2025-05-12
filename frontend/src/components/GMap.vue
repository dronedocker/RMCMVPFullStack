<template>
  <div class="g-map-wrapper">
    <div id="g-container" style="width: 100%; height: 100%" />
    <div class="g-action-panel" :style="{ right: drawVisible ? '316px' : '16px' }">
      <div :class="state.currentType === 'pin' ? 'g-action-item selection' : 'g-action-item'" @click="startDrawing('pin')">
        <a><a-image :src="pin" :preview="false" /></a>
      </div>
      <div :class="state.currentType === 'polyline' ? 'g-action-item selection' : 'g-action-item'" @click="startDrawing('polyline')">
        <a><LineOutlined :rotate="135" class="fz20" /></a>
      </div>
      <div :class="state.currentType === 'polygon' ? 'g-action-item selection' : 'g-action-item'" @click="startDrawing('polygon')">
        <a><BorderOutlined class="fz18" /></a>
      </div>
      <div class="g-action-item" v-if="mouseMode" @click="clearDrawing">
        <a style="color: red;"><CloseOutlined /></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { LineOutlined, BorderOutlined, CloseOutlined } from '@ant-design/icons-vue'
import pin from '/@/assets/icons/pin-2d8cf0.svg'

const drawVisible = computed(() => true)
const mouseMode = ref(false)

const state = reactive({
  currentType: '',
})

let map: mapboxgl.Map
let drawControl: MapboxDraw

function startDrawing (type: 'pin' | 'polyline' | 'polygon') {
  state.currentType = type
  mouseMode.value = true
  if (drawControl) drawControl.deleteAll()
  switch (type) {
    case 'pin':
      drawControl.changeMode('draw_point')
      break
    case 'polyline':
      drawControl.changeMode('draw_line_string')
      break
    case 'polygon':
      drawControl.changeMode('draw_polygon')
      break
  }
}

function clearDrawing () {
  state.currentType = ''
  mouseMode.value = false
  drawControl.deleteAll()
}

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY
  map = new mapboxgl.Map({
    container: 'g-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.0369, 38.9072],
    zoom: 12,
  })

  drawControl = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      point: false,
      line_string: false,
      polygon: false,
      trash: false,
    },
  })
  map.addControl(drawControl)
})
</script>

<style scoped>
.g-map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.g-action-panel {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}
.g-action-item {
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 2px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 2px;
  cursor: pointer;
}
.selection {
  border: 1px solid #1890ff;
}
</style>
