// Copyright (c) 2021 Ivan Teplov

import ToolbarSection from './ToolbarSection'
import { brushSizes, BrushSizeButton } from './BrushSizeButton'
import { brushColors, BrushColorButton } from './BrushColorButton'
import { MouseEvent, TouchEvent, useEffect, useRef } from 'react'
import './App.css'

type MouseOrTouchEvent<T> = MouseEvent<T> | TouchEvent<T>

const touchPositionToArray = ({
  clientX,
  clientY,
}: {
  clientX: number
  clientY: number
}): [x: number, y: number] => {
  return [clientX, clientY]
}

const getTouchPosition = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
  const { left, top } = event.currentTarget.getBoundingClientRect()

  let result

  if (event.type.startsWith('mouse')) {
    event = event as MouseEvent<HTMLCanvasElement>
    result = touchPositionToArray(event)
  } else {
    event = event as TouchEvent<HTMLCanvasElement>
    result = touchPositionToArray(event.touches[0])
  }

  return [result[0] - left, result[1] - top]
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  let currentSize = 10
  let currentColor = brushColors.Blue
  let isDrawing = false
  let previousPoint: [x: number, y: number] = [-1, -1]

  const selectSize = (brushSize: number) => {
    currentSize = brushSize
  }

  const selectColor = (brushColor: string) => {
    currentColor = brushColor
  }

  const startDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = true
    previousPoint = getTouchPosition(event)

    const context = (event.currentTarget as HTMLCanvasElement).getContext('2d')
    context!.beginPath()
  }

  const continueDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    if (event.type === 'mousemove' && !isDrawing) {
      return
    }

    const context = (event.currentTarget as HTMLCanvasElement).getContext('2d')
    context!.moveTo(...previousPoint!)

    previousPoint = getTouchPosition(event)
    context!.lineTo(...previousPoint)

    context!.strokeStyle = currentColor
    context!.lineWidth = currentSize
    context!.stroke()
  }

  const endDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = false

    const context = (event.currentTarget as HTMLCanvasElement).getContext('2d')
    context!.closePath()
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
  }, [canvasRef])

  return (
    <div className="App column fill">
      <div className="Toolbar row">
        <ToolbarSection title="Brush size">
          {Object.keys(brushSizes).map((size) => (
            <BrushSizeButton
              onClick={() => selectSize((brushSizes as any)[size])}
              brushSize={size}
            />
          ))}
        </ToolbarSection>

        <ToolbarSection title="Brush color">
          {Object.keys(brushColors).map((color) => (
            <BrushColorButton
              onClick={() => selectColor((brushColors as any)[color])}
              brushColor={color}
            />
          ))}
        </ToolbarSection>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseMove={continueDrawing}
        onTouchMove={continueDrawing}
        onMouseUp={endDrawing}
        onTouchEnd={endDrawing}
        className="fill"
      />
    </div>
  )
}
