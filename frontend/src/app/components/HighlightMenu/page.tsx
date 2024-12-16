'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.scss';

interface HighlightMenuProps {
    onFormatText: (formatType: string, value: any) => void;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
}

const HighlightMenu: React.FC<HighlightMenuProps> = ({ onFormatText, format = {} }) => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const handleContextMenu = (e: MouseEvent) => {
        // Проверяем, что клик был в textarea
        if ((e.target as HTMLElement).tagName === 'TEXTAREA') {
            e.preventDefault(); // Предотвращаем стандартное контекстное меню
            setMenuPosition({
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', (e) => {
            const menu = document.querySelector(`.${styles.menu}`);
            if (menu && !(menu as HTMLElement).contains(e.target as Node)) {
                setMenuPosition(null);
            }
        });

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', () => setMenuPosition(null));
        };
    }, []);

    const options = [
        {
            label: format.bold ? 'Убрать жирность' : 'Сделать жирным',
            action: () => onFormatText('bold', !format.bold)
        },
        {
            label: format.italic ? 'Убрать курсив' : 'Сделать курсивом',
            action: () => onFormatText('italic', !format.italic)
        },
        {
            label: 'Цвет фона',
            submenu: [
                { label: 'Нет', action: () => onFormatText('backgroundColor', null) },
                { label: 'Желтый', action: () => onFormatText('backgroundColor', '#fff3b8') },
                { label: 'Зеленый', action: () => onFormatText('backgroundColor', '#b8ffd1') },
                { label: 'Розовый', action: () => onFormatText('backgroundColor', '#ffb8e5') },
            ]
        },
        {
            label: 'Цвет текста',
            submenu: [
                { label: 'Черный', action: () => onFormatText('color', '#000000') },
                { label: 'Красный', action: () => onFormatText('color', '#ff0000') },
                { label: 'Синий', action: () => onFormatText('color', '#0000ff') },
                { label: 'Зеленый', action: () => onFormatText('color', '#008000') },
            ]
        },
        {
            label: 'Размер текста',
            submenu: [10, 12, 14, 16, 18, 20, 22, 24].map(size => ({
                label: `${size}px`,
                action: () => onFormatText('fontSize', size)
            }))
        }
    ];

    return menuPosition ? (
        <div
            className={styles.menu}
            style={{
                position: 'fixed',
                top: `${menuPosition.y - 0}px`,
                left: `${menuPosition.x}px`,
                transform: 'translate(-50%, -100%)'
            }}
            onContextMenu={(e) => e.preventDefault()} // Предотвращаем появление стандартного контекстного меню на самом меню
        >
            {options.map((option, index) => (
                option.submenu ? (
                    <div key={index} className={styles.menuItemWithSubmenu}>
                        <span className={styles.menuItem}>{option.label}</span>
                        <div className={styles.submenu}>
                            {option.submenu.map((subOption, subIndex) => (
                                <button
                                    key={subIndex}
                                    className={styles.menuItem}
                                    onClick={subOption.action}
                                >
                                    {subOption.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button
                        key={index}
                        className={styles.menuItem}
                        onClick={option.action}
                    >
                        {option.label}
                    </button>
                )
            ))}
        </div>
    ) : null;
};

export default HighlightMenu; 