import type { GeojsonFeature } from '../utils/genjson'

export enum MapElementEnum {
  Point = 0,
  Line = 1,
  Polygon = 2,
}

export interface PostElementsBody {
  id: string
  name: string
  resource: {
    type: MapElementEnum
    content: GeojsonFeature
  }
}
