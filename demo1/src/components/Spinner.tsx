import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * ����ָʾ�����
 * @param size - �ߴ��С: sm, md, lg
 * @param className - �����CSS����
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
    // ����sizeȷ���ߴ�
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
            aria-label="������"
        ></div>
    );
}; 