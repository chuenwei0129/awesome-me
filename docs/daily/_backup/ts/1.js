import { client } from '@gradio/client'

const response_0 = await fetch(
  'https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav'
)
const exampleAudio = await response_0.blob()

const app = await client(
  'https://xzjosh-laplace-bert-vits2-2-3.hf.space/--replicas/t4quz/'
)
const result = await app.predict(0, [
  'Howdy!', // string  in '输入文本内容' Textbox component
  '明前奶绿,明前奶绿', // string (Option from: [('明前奶绿', '明前奶绿')]) in 'Speaker' Dropdown component
  0, // number (numeric value between 0 and 1) in 'SDP Ratio' Slider component
  0.1, // number (numeric value between 0.1 and 2) in 'Noise' Slider component
  0.1, // number (numeric value between 0.1 and 2) in 'Noise_W' Slider component
  0.1, // number (numeric value between 0.1 and 2) in 'Length' Slider component
  'ZH,ZH', // string (Option from: [('ZH', 'ZH'), ('JP', 'JP'), ('EN', 'EN'), ('auto', 'auto'), ('mix', 'mix')]) in 'Language' Dropdown component
  exampleAudio, // blob in 'Audio prompt' Audio component
  'Howdy!', // string  in 'Text prompt' Textbox component
  'Text prompt', // string  in 'Prompt Mode' Radio component
  'Howdy!', // string  in '辅助文本' Textbox component
  0, // number (numeric value between 0 and 1) in 'Weight' Slider component
])

console.log(result.data)
