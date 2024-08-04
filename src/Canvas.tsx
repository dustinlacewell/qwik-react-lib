import React, { useRef, useEffect } from 'react'

interface CanvasProps {
    containerRef: React.RefObject<HTMLDivElement>
    draw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameCount: number) => void
}

export const Canvas: React.FC<CanvasProps> = ({
    containerRef,
    draw,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) {
            console.log("No container")
            return
        }

        let canvas = canvasRef.current
        if (!canvas) {
            console.log("No canvas")
            canvasRef.current = canvas = document.createElement('canvas')
            container.appendChild(canvas)
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            console.log("No context")
            return
        }

        let animationFrameId: number
        let frameCount = 0

        const handleResize = () => {
            const scale = window.devicePixelRatio
            const { width, height } = canvas.parentElement!.getBoundingClientRect()
            canvas.width = width * scale
            canvas.height = height * scale
            ctx.scale(scale, scale)
        }

        const render = () => {
            frameCount++
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            if (draw) {
                draw(ctx, canvas, frameCount)
            }

            animationFrameId = window.requestAnimationFrame(render)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return null
}