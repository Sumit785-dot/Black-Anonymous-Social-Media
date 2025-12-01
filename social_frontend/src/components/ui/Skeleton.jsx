import React from 'react';
import './Skeleton.css';

const Skeleton = ({
    variant = 'text',
    width,
    height,
    circle = false,
    count = 1,
    className = ''
}) => {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    const getClassName = () => {
        const classes = ['skeleton', `skeleton-${variant}`];
        if (circle) classes.push('skeleton-circle');
        if (className) classes.push(className);
        return classes.join(' ');
    };

    const getStyle = () => {
        const style = {};
        if (width) style.width = typeof width === 'number' ? `${width}px` : width;
        if (height) style.height = typeof height === 'number' ? `${height}px` : height;
        return style;
    };

    return (
        <>
            {skeletons.map((index) => (
                <div
                    key={index}
                    className={getClassName()}
                    style={getStyle()}
                />
            ))}
        </>
    );
};

export default Skeleton;
