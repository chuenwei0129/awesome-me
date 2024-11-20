// https://www.zhihu.com/question/551894381

import React, { StrictMode, } from "react"


const App = () => {

  console.log('App render')

  return (
    <div>App</div>
  )
}

export default () => <StrictMode><App /></StrictMode>

