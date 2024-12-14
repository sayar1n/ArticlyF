'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import SidebarFull from '../components/SidebarFull/page';
import WidgetTasks from '../components/widgetTasks/page';
import RightClickMenu from '../components/rightClickMenu/page';
import WidgetNote from '../components/widgetNote/page';
import WidgetTable from '../components/widgetTable/page';

interface Widget {
    id: string;
    type: 'task' | 'note' | 'table';
    component: JSX.Element;
}

export default function WorkSpace() {
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [title, setTitle] = useState('');

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY
        });
    };

    const createWidget = (type: Widget['type']) => {
        const id = Date.now().toString();
        const newWidget: Widget = {
            id,
            type,
            component: type === 'task' 
                ? <WidgetTasks />
                : type === 'note'
                    ? <WidgetNote />
                    : <WidgetTable />
        };

        setWidgets(prevWidgets => [...prevWidgets, newWidget]);
    };

    const menuItems = [
        {
            label: 'Создать задание',
            onClick: () => createWidget('task')
        },
        {
            label: 'Создать заметку',
            onClick: () => createWidget('note')
        },
        {
            label: 'Создать таблицу',
            onClick: () => createWidget('table')
        }
    ];

    return (
        <>
            <SidebarFull />
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleWrapper}>
                        <input 
                            type="text" 
                            className={styles.titleInput}
                            placeholder="Название страницы"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.underline}></div>
                </div>
                <div 
                    className={styles.workspaceContent}
                    onContextMenu={handleContextMenu}
                >
                    <div className={styles.widgetsContainer}>
                        {widgets.map(widget => (
                            <div key={widget.id} className={styles.widgetWrapper}>
                                {widget.component}
                            </div>
                        ))}
                    </div>
                    {contextMenu.visible && (
                        <RightClickMenu
                            x={contextMenu.x}
                            y={contextMenu.y}
                            items={menuItems}
                            onClose={() => setContextMenu({ ...contextMenu, visible: false })}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
