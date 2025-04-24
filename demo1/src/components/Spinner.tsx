import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * 加载指示器组件
 * @param size - 尺寸大小: sm, md, lg
 * @param className - 额外的CSS类名
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
    // 根据size确定尺寸
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    return (
        <div
            className={`
        ${sizeClasses[size]} 
        border-primary-500 
        border-t-transparent 
        rounded-full 
        animate-spin 
        ${className}
      `}
            aria-label="加载中"
        ></div>
    );
}; 