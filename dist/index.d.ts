import { default as default_2 } from 'react';

export declare const Canvas: default_2.FC<CanvasProps>;

declare interface CanvasProps {
    containerRef: default_2.RefObject<HTMLDivElement>;
    draw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameCount: number) => void;
}

export { }
