import {
  ref,
  reactive,
  computed,
  watch,
  onUnmounted,
} from 'vue'
import type {
  IClientPublishOptions,
  IPublishPacket,
} from '/@/mqtt'
import { useMyStore } from '/@/store'
import { DRC_METHOD } from '/@/types/drc'
import EventBus from '/@/event-bus'

export interface DeviceTopicInfo {
  sn: string
  pubTopic: string
  subTopic: string
}

type MessageMqtt = (topic: string, payload: Buffer, packet: IPublishPacket) => void | Promise<void>

export function useMqtt(deviceTopicInfo: DeviceTopicInfo) {
  const cacheSubscribeArr: {
    topic: string
    callback?: MessageMqtt
  }[] = []

  const store = useMyStore()

  const mqttState = computed(() => store.state.mqttState)

  function publishMqtt(topic: string, body: object, opts?: IClientPublishOptions) {
    mqttState.value?.publishMqtt(topic, JSON.stringify(body), opts)
  }

  function subscribeMqtt(topic: string, handleMessageMqtt?: MessageMqtt) {
    const handler = handleMessageMqtt || onMessageMqtt
    mqttState.value?.subscribeMqtt(topic)
    mqttState.value?.on('onMessageMqtt', handler)

    cacheSubscribeArr.push({
      topic,
      callback: handler,
    })
  }

  function onMessageMqtt(message: any) {
    if (cacheSubscribeArr.find(item => item.topic === message?.topic)) {
      const payloadStr = new TextDecoder('utf-8').decode(message?.payload)
      const payloadObj = JSON.parse(payloadStr)
      switch (payloadObj?.method) {
        case DRC_METHOD.HEART_BEAT:
          break
        case DRC_METHOD.DELAY_TIME_INFO_PUSH:
        case DRC_METHOD.HSI_INFO_PUSH:
        case DRC_METHOD.OSD_INFO_PUSH:
        case DRC_METHOD.DRONE_CONTROL:
        case DRC_METHOD.DRONE_EMERGENCY_STOP:
          EventBus.emit('droneControlMqttInfo', payloadObj)
          break
        default:
          break
      }
    }
  }

  function unsubscribeDrc() {
    for (const item of cacheSubscribeArr) {
      if (item.callback) {
        mqttState.value?.off('onMessageMqtt', item.callback)
        mqttState.value?.unsubscribeMqtt(item.topic)
      }
    }
    cacheSubscribeArr.length = 0
  }

  const heartBeatSeq = ref(0)

  const state = reactive({
    heartState: new Map<string, { pingInterval: ReturnType<typeof setInterval> }>(),
  })

  watch(
    () => deviceTopicInfo,
    (val) => {
      if (val.subTopic) {
        subscribeMqtt(val.subTopic)
        publishDrcPing(val.sn)
      } else {
        clearHeartbeat(val.sn)
      }
    },
    { immediate: true, deep: true }
  )

  function publishDrcPing(sn: string) {
    const body = {
      method: DRC_METHOD.HEART_BEAT,
      data: {
        ts: Date.now(),
        seq: heartBeatSeq.value,
      },
    }

    const pingInterval = setInterval(() => {
      if (!mqttState.value) return
      heartBeatSeq.value += 1
      body.data.ts = Date.now()
      body.data.seq = heartBeatSeq.value
      publishMqtt(deviceTopicInfo.pubTopic, body, { qos: 0 })
    }, 1000)

    state.heartState.set(sn, { pingInterval })
  }

  function clearHeartbeat(sn: string) {
    const record = state.heartState.get(sn)
    if (record?.pingInterval) {
      clearInterval(record.pingInterval)
    }
    state.heartState.delete(sn)
    heartBeatSeq.value = 0
  }

  onUnmounted(() => {
    unsubscribeDrc()
    clearHeartbeat(deviceTopicInfo.sn)
  })

  return {
    mqttState,
    publishMqtt,
    subscribeMqtt,
  }
}
