import { useComponentsStore } from '../stores/components'
import { useComponentConfigStore } from '../stores/component-config'
import React from 'react'
import { Component } from '../types/shared'

export default function EditArea() {
  const { components } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig?.[component.name]

      if (!config?.component) {
        return null
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...(component.props as object),
        },
        renderComponents(component.children || [])
      )
    })
  }

  return (
    <div className="h-[100%] overflow-auto">
      {renderComponents(components)}
    </div>
  )
}
