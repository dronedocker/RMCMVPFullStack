const env = import.meta.env

export const CURRENT_CONFIG = {
  // license
  appId: env.VITE_APP_ID as string,
  appKey: env.VITE_APP_KEY as string,
  appLicense: env.VITE_APP_LICENSE as string,

  // http
  baseURL: env.VITE_BASE_URL as string,
  websocketURL: env.VITE_WEBSOCKET_URL as string,

  // livestreaming (optional, for future use)
  rtmpURL: env.VITE_RTMP_URL || '',
  gbServerIp: env.VITE_GB_SERVER_IP || '',
  gbServerPort: Number(env.VITE_GB_SERVER_PORT) || 5060,
  gbServerId: env.VITE_GB_SERVER_ID || '',
  gbAgentId: env.VITE_GB_AGENT_ID || '',
  gbPassword: env.VITE_GB_PASSWORD || '',
  gbAgentPort: Number(env.VITE_GB_AGENT_PORT) || 0,
  gbAgentChannel: env.VITE_GB_AGENT_CHANNEL || '',
  rtspUserName: env.VITE_RTSP_USERNAME || '',
  rtspPassword: env.VITE_RTSP_PASSWORD || '',
  rtspPort: env.VITE_RTSP_PORT || '8554',

  // Agora
  agoraAPPID: env.VITE_AGORA_APP_ID || '',
  agoraToken: env.VITE_AGORA_TOKEN || '',
  agoraChannel: env.VITE_AGORA_CHANNEL || '',

  // Map
  amapKey: env.VITE_AMAP_KEY || '',
}
