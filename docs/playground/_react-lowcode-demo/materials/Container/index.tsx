import React from 'react'
import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="border border-[#000] min-h-[100px] p-[20px]">
      {children}
    </div>
  )
}

export default Container
