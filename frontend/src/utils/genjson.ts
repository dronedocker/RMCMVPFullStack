import {
  MapGeographicPosition,
} from '/@/types/map'

export type GeojsonCoordinate = [number, number, number?]

export interface GeojsonLine {
  type: 'Feature'
  properties: {
    color: string
    directConnected?: boolean
  }
  geometry: {
    type: 'LineString'
    coordinates: GeojsonCoordinate[]
  }
}

export interface GeojsonPolygon {
  type: 'Feature'
  properties: {
    color: string
  }
  geometry: {
    type: 'Polygon'
    coordinates: GeojsonCoordinate[][]
  }
}

export interface GeojsonPoint {
  type: 'Feature'
  properties: {
    color: string
    clampToGround: boolean // now required
  }
  geometry: {
    type: 'Point'
    coordinates: GeojsonCoordinate
  }
}

export interface GeojsonCircle {
  type: 'Feature'
  properties: {
    color: string
    clampToGround: boolean // now required
  }
  geometry: {
    type: 'Circle'
    coordinates: GeojsonCoordinate
    radius: number
  }
}

export type GeojsonFeature = GeojsonLine | GeojsonPolygon | GeojsonPoint | GeojsonCircle

export function geographic2Coordinate (position: MapGeographicPosition): GeojsonCoordinate {
  const coordinates: GeojsonCoordinate = [position.longitude, position.latitude]
  if (position.height !== undefined) coordinates.push(position.height)
  return coordinates
}

export function generateLine (coordinates: MapGeographicPosition[], properties: GeojsonLine['properties']): GeojsonFeature {
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'LineString',
      coordinates: coordinates.map(geographic2Coordinate),
    },
  }
}

export function generatePolygon (coordinates: MapGeographicPosition[], properties: GeojsonPolygon['properties']): GeojsonFeature {
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates.map(geographic2Coordinate)],
    },
  }
}

export function generatePoint (position: MapGeographicPosition, properties: GeojsonPoint['properties']): GeojsonFeature {
  // Enforce clampToGround
  if (typeof properties.clampToGround !== 'boolean') {
    throw new Error('clampToGround must be a boolean in GeojsonPoint properties')
  }
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Point',
      coordinates: geographic2Coordinate(position),
    },
  }
}

export function generateCircle (position: MapGeographicPosition, properties: GeojsonCircle['properties'], radius: number): GeojsonFeature {
  // Enforce clampToGround
  if (typeof properties.clampToGround !== 'boolean') {
    throw new Error('clampToGround must be a boolean in GeojsonCircle properties')
  }
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Circle',
      coordinates: geographic2Coordinate(position),
      radius: radius,
    },
  }
}
