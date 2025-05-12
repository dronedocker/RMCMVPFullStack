import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { MapDoodleType } from '/@/constants/map'
import { EFlightAreaType } from '/@/types/flight-area'

interface DrawCallback {
  ({ obj }: { obj: any }): void
}

let drawControl: MapboxDraw

export function setDrawInstance(instance: MapboxDraw) {
  drawControl = instance
}

export function useMouseTool() {
  function mouseTool(type: MapDoodleType, callback: DrawCallback, flightAreaType?: EFlightAreaType) {
    if (!drawControl) {
      console.error('Draw control is not initialized.')
      return
    }

    drawControl.deleteAll()

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
      case 'circle':
        console.warn('MapboxDraw does not natively support circles.')
        break
      default:
        break
    }

    // Optional: listen for complete event (MapboxDraw doesn't expose it cleanly)
    // You would need to hook into mapbox events if needed
  }

  return { mouseTool }
}
