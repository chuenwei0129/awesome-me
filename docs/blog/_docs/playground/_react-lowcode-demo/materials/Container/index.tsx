import React from 'react'
import { CommonComponentProps } from '../../types/shared';
import { useMaterialDrop } from '../../hooks/useMaterialDrop';

const Container = ({ id, children }: CommonComponentProps) => {

  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id);

  return (
    <div ref={drop}
      className={`min-h-[80px] m-[10px] ${canDrop ? 'border-[2px] border-[red] border-solid' : 'border border-solid'}`}>
      {children}
    </div >
  )
}

export default Container
