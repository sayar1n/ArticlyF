'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';

export interface MenuItem {
    label: string;
    onClick?: () => void;
    type?: 'separator';
    submenu?: MenuItem[];
}

interface RightClickMenuProps {
    x: number;
    y: number;
    items: MenuItem[];
    onClose: () => void;
}

export default function RightClickMenu({ x, y, items, onClose }: RightClickMenuProps) {
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menu = document.querySelector(`.${styles.contextMenu}`);
            if (menu && !menu.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    const handleItemClick = (item: MenuItem) => {
        if (item.onClick) {
            item.onClick();
            onClose();
        }
    };

    const handleMouseEnter = (index: number) => {
        if (items[index].submenu) {
            setActiveSubmenu(index);
        } else {
            setActiveSubmenu(null);
        }
    };

    return (
        <div className={styles.contextMenu} style={{ left: x, top: y }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {item.type === 'separator' ? (
                        <div className={styles.separator} />
                    ) : (
                        <div className={styles.menuItemWrapper}>
                            <button
                                className={`${styles.menuItem} ${item.submenu ? styles.hasSubmenu : ''}`}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                {item.label}
                                {item.submenu && <span className={styles.submenuArrow}>▶</span>}
                            </button>
                            {item.submenu && activeSubmenu === index && (
                                <div className={styles.submenu}>
                                    {item.submenu.map((subItem, subIndex) => (
                                        <button
                                            key={subIndex}
                                            className={styles.menuItem}
                                            onClick={() => handleItemClick(subItem)}
                                        >
                                            {subItem.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
