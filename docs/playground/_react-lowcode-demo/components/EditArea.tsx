import { useEffect, useRef } from 'react'
import { Component, useComponentsStore } from '../stores/components'
import { useComponentConfigStore } from '../stores/component-config'
import React from 'react'

export default function EditArea() {
  const { components, addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const ignoreRef = useRef(false)

  useEffect(() => {
    if (!ignoreRef.current) {
      addComponent(
        {
          id: 222,
          name: 'Container',
          props: {},
          children: [],
        },
        1
      )

      addComponent(
        {
          id: 333,
          name: 'Button',
          props: {
            text: '无敌',
          },
          children: [],
        },
        222
      )
    }
    return () => {
      ignoreRef.current = true
    }
  }, [addComponent])

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.component) {
        return null
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          ...config.defaultProps,
          ...(component.props as object),
        },
        renderComponents(component.children || [])
      )
    })
  }

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  )
}
