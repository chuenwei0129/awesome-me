import React from 'react'
import { CommonComponentProps } from '../../types/shared';
import { useMaterialDrop } from '../../hooks/useMaterialDrop';

function Page({ id, children }: CommonComponentProps) {

  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id);

  return <div
    ref={drop}
    className="m-[10px] h-[calc(100%-20px)] overflow-auto"
    style={{ border: canDrop ? '2px solid blue' : '1px solid black' }}
  >{children}</div>
}

export default Page
