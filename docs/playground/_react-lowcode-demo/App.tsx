import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import EditArea from './components/EditArea'
import Material from './components/Material'
import Setting from './components/Setting'
// import Header from './components/Header'
import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function LowCodeEditor() {
  return (
    <div className="h-[60vh] flex flex-col border border-solid">
      {/* <div className="h-[50px] flex items-center border-b border-solid border-t-0 border-l-0 border-r-0">
        <Header />
      </div> */}
      <Allotment>
        {/* 物料区 */}
        <Allotment.Pane preferredSize={150} maxSize={180} minSize={100}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={200} maxSize={240} minSize={150}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default () => <DndProvider backend={HTML5Backend}><LowCodeEditor /></DndProvider>
