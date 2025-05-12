const env = import.meta.env

export const CURRENT_CONFIG = {
  // License
  appId: env.VITE_APP_ID,
  appKey: env.VITE_APP_KEY,
  appLicense: env.VITE_APP_LICENSE,

  // HTTP
  baseURL: env.VITE_BASE_URL,
  websocketURL: env.VITE_WEBSOCKET_URL,

  // Livestreaming (optional)
  rtmpURL: env.VITE_RTMP_URL ?? '',
  gbServerIp: env.VITE_GB_SERVER_IP ?? '',
  gbServerPort: parseInt(env.VITE_GB_SERVER_PORT ?? '5060', 10),
  gbServerId: env.VITE_GB_SERVER_ID ?? '',
  gbAgentId: env.VITE_GB_AGENT_ID ?? '',
  gbPassword: env.VITE_GB_PASSWORD ?? '',
  gbAgentPort: parseInt(env.VITE_GB_AGENT_PORT ?? '0', 10),
  gbAgentChannel: env.VITE_GB_AGENT_CHANNEL ?? '',
  rtspUserName: env.VITE_RTSP_USERNAME ?? '',
  rtspPassword: env.VITE_RTSP_PASSWORD ?? '',
  rtspPort: env.VITE_RTSP_PORT ?? '8554',

  // Agora
  agoraAPPID: env.VITE_AGORA_APP_ID ?? '',
  agoraToken: env.VITE_AGORA_TOKEN ?? '',
  agoraChannel: env.VITE_AGORA_CHANNEL ?? '',

  // Map
  mapboxKey: env.VITE_MAPBOX_KEY ?? ''
}
