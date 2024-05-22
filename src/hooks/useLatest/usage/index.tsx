import { useLatest } from 'awesome-me'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'

export default function Chat() {
  const [text, setText] = useState('')
  const textRef = useLatest(text)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  function handleSend() {
    setTimeout(() => {
      alert('正在发送：' + textRef.current)
    }, 3000)
  }

  return (
    <>
      <input value={text} onChange={handleChange} />{' '}
      <button type="button" onClick={handleSend}>
        发送
      </button>
    </>
  )
}
