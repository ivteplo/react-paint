// Copyright (c) 2021 Ivan Teplov

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export const brushSizes = {
  'Ultra Small': 2,
  Small: 4,
  Medium: 6,
  Large: 8,
  'Extra Large': 10,
}

interface BrushSizeButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  brushSize: string
}

export function BrushSizeButton({
  brushSize,
  className,
  ...props
}: BrushSizeButtonProps) {
  return (
    <button
      type="button"
      title={brushSize}
      className={'BrushSizeButton ' + (className ?? '')}
      {...props}
    >
      <span style={{ width: (brushSizes as any)[brushSize] + 'px' }} />
    </button>
  )
}

export default BrushSizeButton
