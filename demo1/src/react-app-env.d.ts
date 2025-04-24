/// <reference types="react-scripts" />

declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.module.css';
declare module '*.module.scss';

declare module 'react-icons/fa';
declare module 'chart.js';
declare module 'react-chartjs-2';
declare module 'date-fns'; 