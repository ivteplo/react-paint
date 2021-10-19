// Copyright (c) 2021 Ivan Teplov

import { brushSizes, BrushSizeButton } from './BrushSizeButton'
import { brushColors, BrushColorButton } from './BrushColorButton'
import { useEffect, useRef, useState } from 'react'
import { getTouchPosition, Point } from './getTouchPosition'

import MouseOrTouchEvent from './MouseOrTouchEvent'
import ToolbarSection from './ToolbarSection'
import downloadFile from './downloadFile'

import './App.css'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  let [currentSize, setCurrentSize] = useState(brushSizes['Extra Large'])
  let [currentColor, setCurrentColor] = useState(brushColors.Blue)
  let isDrawing = false
  let previousPoint: Point = [0, 0]

  const selectSize = (brushSize: number) => {
    setCurrentSize(brushSize)
  }

  const selectColor = (brushColor: string) => {
    setCurrentColor(brushColor)
  }

  const startDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = true

    const context = event.currentTarget.getContext('2d')!
    const point = getTouchPosition(event)

    context.moveTo(...point)
    context.beginPath()

    previousPoint = point

    context.strokeStyle = currentColor
    context.lineWidth = currentSize
  }

  const continueDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    if (event.type === 'mousemove' && !isDrawing) {
      return
    }

    const context = event.currentTarget.getContext('2d')!
    const point = getTouchPosition(event)

    context.quadraticCurveTo(...previousPoint, ...point)

    previousPoint = point
    context.stroke()
  }

  const endDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = false

    const context = event.currentTarget.getContext('2d')!
    context.closePath()
  }

  const clearCanvas = () => {
    if (!canvasRef.current) return

    const context = canvasRef.current.getContext('2d')!
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  }

  const saveCanvas = () => {
    if (!canvasRef.current) return

    const contents = canvasRef.current.toDataURL('image/png')
    downloadFile(contents, 'painting.png')
  }

  const onResize = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.removeAttribute('width')
    canvas.removeAttribute('height')

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const context = canvas.getContext('2d')!
    context.lineJoin = 'round'
    context.lineCap = 'round'
  }

  useEffect(() => onResize(), [canvasRef])

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="App column fill">
      <div className="Toolbar row">
        <ToolbarSection title="Painting">
          <button type="button" onClick={saveCanvas}>
            Save
          </button>
          <button type="button" onClick={clearCanvas}>
            Clear
          </button>
        </ToolbarSection>

        <ToolbarSection title="Brush size">
          {Object.keys(brushSizes).map((size) => {
            const sizeValue = (brushSizes as any)[size]
            return (
              <BrushSizeButton
                key={size}
                onClick={() => selectSize((brushSizes as any)[size])}
                className={sizeValue === currentSize ? 'active' : ''}
                brushSize={size}
              />
            )
          })}
        </ToolbarSection>

        <ToolbarSection title="Brush color">
          {Object.keys(brushColors).map((color) => {
            const colorValue = (brushColors as any)[color]

            return (
              <BrushColorButton
                key={color}
                onClick={() => selectColor(colorValue)}
                className={colorValue === currentColor ? 'active' : ''}
                brushColor={color}
              />
            )
          })}
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
