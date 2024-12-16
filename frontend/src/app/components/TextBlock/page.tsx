'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.scss';
import HighlightMenu from '../HighlightMenu/page';

interface TextBlockProps {
    id: string;
    text: string;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
    onChange: (id: string, text: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string) => void;
    onFormatText: (id: string, formatType: string, value: any) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({
    id,
    text,
    format = {},
    onChange,
    onKeyDown,
    onFormatText
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleDragStart = (e: React.DragEvent) => {
        if (isFocused) {
            e.preventDefault();
            return;
        }
        setIsDragging(true);
        e.dataTransfer.setData('blockId', id);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div 
            className={`${styles.textBlockWrapper} ${text.trim() === '' ? styles.placeholder : ''} ${isDragging ? styles.dragging : ''} draggableItem`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            draggable={!isFocused}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.dragHandle} />
            <textarea
                ref={textareaRef}
                className={styles.textBlock}
                value={text}
                onChange={(e) => onChange(id, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, id)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setTimeout(() => setIsFocused(false), 100);
                }}
                placeholder={isHovered || isFocused ? "Начните писать..." : ""}
                rows={1}
                data-id={id}
                style={{
                    fontWeight: format.bold ? 'bold' : 'normal',
                    fontStyle: format.italic ? 'italic' : 'normal',
                    backgroundColor: format.backgroundColor || 'transparent',
                    color: format.color || 'inherit',
                    fontSize: format.fontSize ? `${format.fontSize}px` : '16px'
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            {isHovered && (
                <HighlightMenu
                    onFormatText={(formatType, value) => onFormatText(id, formatType, value)}
                    format={format}
                />
            )}
        </div>
    );
};

export default TextBlock; 