import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import EditArea from './components/EditArea'
import Material from './components/Material'
import Setting from './components/Setting'
import Header from './components/Header'
import React from 'react'

export default function LowCodeEditor() {
  return (
    <div className="h-[50vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b border-[#000]">
        <Header />
      </div>
      <Allotment>
        {/* 物料区 */}
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material />
        </Allotment.Pane>
        {/* 画布 */}
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        {/* 编辑 */}
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
