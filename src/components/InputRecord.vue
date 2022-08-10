<template>
  <div>
    <button :class="`mic`" @click="ToggleMic">Record</button>
    <div class="transcript" v-text="transcript"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

declare global {
  interface Window {
    SpeechRecognition: Constructable<IRecognitionContext>
    webkitSpeechRecognition: Constructable<IRecognitionContext>
  }
}

interface IRecognitionContext {
  continuous: boolean
  interimResults: boolean
  onstart: () => void
  onend: () => void
  onresult: (evt: { results: SpeechRecognitionResultList }) => void
  stop: () => void
  start: () => void
}

interface Constructable<T> {
  new (...args: any): T
}

interface IResults {
  transcript: string
}

export default defineComponent({
  setup() {
    const transcript = ref('')
    const isRecording = ref(false)
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const sr = new Recognition()

    onMounted(() => {
      sr.continuous = true
      sr.interimResults = true
      sr.onstart = () => {
        console.log('SR Started')
        isRecording.value = true
      }
      sr.onend = () => {
        console.log('SR Stopped')
        isRecording.value = false
      }
      sr.onresult = ({ results }: { results: SpeechRecognitionResultList }) => {
        for (let i = 0; i < results.length; i++) {
          const result: SpeechRecognitionResult = results[i]
          if (result.isFinal) CheckForCommand(result)
        }
        const t = Array.from(results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')

        transcript.value = t
      }
    })

    const CheckForCommand = (result: SpeechRecognitionResult) => {
      const t = result[0].transcript
      if (t.includes('stop recording')) {
        sr.stop()
      } else if (t.includes('what is the time') || t.includes("what's the time")) {
        sr.stop()
        alert(new Date().toLocaleTimeString())
        setTimeout(() => sr.start(), 100)
      }
    }
    const ToggleMic = () => {
      if (isRecording.value) {
        sr.stop()
      } else {
        sr.start()
      }
    }

    return { ToggleMic, transcript }
  }
})
</script>
