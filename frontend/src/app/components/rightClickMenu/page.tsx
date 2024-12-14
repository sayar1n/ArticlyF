'use client';

import { useEffect } from 'react';
import styles from './page.module.scss';

interface MenuItem {
    label: string;
    onClick: () => void;
}

interface RightClickMenuProps {
    x: number;
    y: number;
    items: MenuItem[];
    onClose: () => void;
}

export default function RightClickMenu({ x, y, items, onClose }: RightClickMenuProps) {
    useEffect(() => {
        const handleClick = () => {
            onClose();
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [onClose]);

    return (
        <div 
            className={styles.menu}
            style={{ left: x, top: y }}
            onClick={(e) => e.stopPropagation()}
        >
            {items.map((item, index) => (
                <button
                    key={index}
                    className={styles.menuItem}
                    onClick={() => {
                        item.onClick();
                        onClose();
                    }}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
