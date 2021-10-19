// Copyright (c) 2021 Ivan Teplov

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export const brushColors = {
  Red: '#dd2a2a',
  Orange: '#ffa501',
  Yellow: '#ffd400',
  Green: '#129d12',
  'Light blue': '#80d8f5',
  Blue: '#2875d5',
  Purple: '#801ddb',
  Black: '#000',
  'Dark gray': '#333',
  Gray: '#777',
  'Light gray': '#ccc',
  White: '#fff',
}

interface BrushColorButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  brushColor: string
}

export function BrushColorButton({
  brushColor: color,
  className,
  ...props
}: BrushColorButtonProps) {
  return (
    <button
      type="button"
      title={color}
      className={'BrushColorButton ' + (className ?? '')}
      {...props}
    >
      <span style={{ backgroundColor: (brushColors as any)[color] }} />
    </button>
  )
}

export default BrushColorButton
