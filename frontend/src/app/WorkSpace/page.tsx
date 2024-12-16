'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import SidebarFull from '../components/SidebarFull/page';
import WidgetTasks from '../components/widgetTasks/page';
import RightClickMenu, { MenuItem } from '../components/rightClickMenu/page';
import WidgetNote from '../components/widgetNote/page';
import WidgetTable from '../components/widgetTable/page';
import TextBlock from '../components/TextBlock/page';
import WidgetText from '../components/widgetText/page';
import WidgetColumns from '../components/widgetColumns/page';
import { ColumnsWidgetData } from '../components/widgetColumns/page';

type ColumnType = 'text' | 'checkbox' | 'date';

interface TableColumn {
    id: string;
    name: string;
    type: ColumnType;
    options?: string[];
}

interface Row {
    id: string;
    cells: { [columnId: string]: any };
}

// Интерфейсы для разных типов виджетов
interface TaskWidgetData {
    title: string;
    tasks: { id: string; text: string; completed: boolean; }[];
}

interface NoteWidgetData {
    title: string;
    content: string;
}

interface TableWidgetData {
    columns: TableColumn[];
    rows: Row[];
}

interface TextWidgetData {
    text: string;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
}

// Общий интерфейс для всех виджетов
interface WidgetData {
    id: string;
    type: 'task' | 'note' | 'table' | 'text' | 'columns';
    data: TaskWidgetData | NoteWidgetData | TableWidgetData | TextWidgetData | ColumnsWidgetData;
}

interface DraggableItem {
    id: string;
    type: 'widget';
    component: JSX.Element;
    data: WidgetData;
}

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    insertIndex?: number;
    isFormatting?: boolean;
}

interface TextBlock {
    id: string;
    text: string;
    type: 'text';
    isPlaceholder?: boolean;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
}

type ContentBlock = TextBlock | DraggableItem;

export default function WorkSpace() {
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({
        visible: false,
        x: 0,
        y: 0
    });
    const [blocks, setBlocks] = useState<ContentBlock[]>([
        { id: '1', type: 'text', text: '' }
    ]);
    const [title, setTitle] = useState('');
    const [hoverPosition, setHoverPosition] = useState<{ index: number; y: number } | null>(null);
    const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
    const [showNewBlockPlaceholder, setShowNewBlockPlaceholder] = useState(false);
    const [newBlockIndex, setNewBlockIndex] = useState<number | null>(null);

    const createWidget = (type: 'task' | 'note' | 'table' | 'text' | 'columns', insertAt?: number) => {
        const id = Date.now().toString();
        const widgetData: WidgetData = {
            id,
            type,
            data: type === 'task'
                ? { title: '', tasks: [] }
                : type === 'note'
                    ? { title: '', content: '' }
                    : type === 'text'
                        ? { text: '' }
                        : type === 'columns'
                            ? { columns: [{ id: '1', blocks: [] }, { id: '2', blocks: [] }], columnsCount: 2 } as ColumnsWidgetData
                            : { columns: [], rows: [] }
        };

        const newWidget: DraggableItem = {
            id,
            type: 'widget',
            data: widgetData,
            component: type === 'task'
                ? <WidgetTasks key={id} data={widgetData.data as TaskWidgetData} onUpdate={(data) => updateWidgetData(id, { ...widgetData, data })} />
                : type === 'note'
                    ? <WidgetNote key={id} data={widgetData.data as NoteWidgetData} onUpdate={(data) => updateWidgetData(id, { ...widgetData, data })} />
                    : type === 'text'
                        ? <WidgetText key={id} data={widgetData.data as TextWidgetData} onUpdate={(data) => updateWidgetData(id, { ...widgetData, data })} />
                        : type === 'columns'
                            ? <WidgetColumns key={id} data={widgetData.data as ColumnsWidgetData} onUpdate={(data) => updateWidgetData(id, { ...widgetData, data: data as any })} />
                            : <WidgetTable key={id} data={widgetData.data as TableWidgetData} onUpdate={(data) => updateWidgetData(id, { ...widgetData, data })} />
        };

        setBlocks(prev => {
            const insertIndex = insertAt ?? contextMenu.insertIndex ?? prev.length;
            const newBlocks = [...prev];
            newBlocks.splice(insertIndex, 0, newWidget);
            return newBlocks;
        });
    };

    const updateWidgetData = (widgetId: string, newData: WidgetData) => {
        setBlocks(prevBlocks => prevBlocks.map(block => {
            if (block.type !== 'widget' || block.id !== widgetId) return block;

            return {
                ...block,
                data: newData,
                component: block.data.type === 'task'
                    ? <WidgetTasks key={block.id} data={newData.data as TaskWidgetData} onUpdate={(data) => updateWidgetData(block.id, { ...newData, data })} />
                    : block.data.type === 'note'
                        ? <WidgetNote key={block.id} data={newData.data as NoteWidgetData} onUpdate={(data) => updateWidgetData(block.id, { ...newData, data })} />
                        : block.data.type === 'text'
                            ? <WidgetText key={block.id} data={newData.data as TextWidgetData} onUpdate={(data) => updateWidgetData(block.id, { ...newData, data })} />
                            : block.data.type === 'columns'
                                ? <WidgetColumns key={block.id} data={newData.data as ColumnsWidgetData} onUpdate={(data) => updateWidgetData(block.id, { ...newData, data })} />
                                : <WidgetTable key={block.id} data={newData.data as TableWidgetData} onUpdate={(data) => updateWidgetData(block.id, { ...newData, data })} />
            };
        }));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const container = e.currentTarget as HTMLElement;
        const rect = container.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const blockElements = Array.from(container.children);
        
        // Проверяем, находится ли курсор между блоками
        let foundGap = false;
        for (let i = 0; i < blockElements.length; i++) {
            const block = blockElements[i];
            const blockRect = block.getBoundingClientRect();
            const blockTop = blockRect.top - rect.top;
            const blockBottom = blockRect.bottom - rect.top;
            
            // Если курсор находится в промежутке между блоками (20px сверху и снизу от границы)
            if (mouseY >= blockBottom && mouseY <= blockBottom + 40) {
                setShowNewBlockPlaceholder(true);
                setNewBlockIndex(i + 1);
                foundGap = true;
                break;
            }
        }
        
        if (!foundGap) {
            setShowNewBlockPlaceholder(false);
            setNewBlockIndex(null);
        }
    };

    const handleAddNewBlock = () => {
        if (newBlockIndex !== null) {
            setBlocks(prev => {
                const newBlocks = [...prev];
                newBlocks.splice(newBlockIndex, 0, {
                    id: Date.now().toString(),
                    type: 'text',
                    text: '',
                    isPlaceholder: true
                });
                return newBlocks;
            });
            setShowNewBlockPlaceholder(false);
            setNewBlockIndex(null);
        }
    };

    const handleMouseLeave = () => {
        setHoverPosition(null);
    };

    const handleTextChange = (id: string, text: string) => {
        setBlocks(prev => {
            // Сначала обновляем текущий блок
            let updatedBlocks = prev.map(block => 
                block.type === 'text' && block.id === id 
                    ? { ...block, text, isPlaceholder: false } 
                    : block
            );

            // Удаляем все пустые текстовые блоки, кроме последнего
            updatedBlocks = updatedBlocks.filter((block, index) => {
                if (block.type === 'text' && block.text.trim() === '') {
                    // Оставляем блок, если это тот, в котором сейчас печатаю
                    return block.id === id;
                }
                return true;
            });

            return updatedBlocks;
        });

        // Автоматическое изменение высоты textarea
        const textarea = document.querySelector(`textarea[data-id="${id}"]`) as HTMLTextAreaElement;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, blockId: string) => {
        const currentText = (e.target as HTMLTextAreaElement).value;
        
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            setBlocks(prev => {
                const blockIndex = prev.findIndex(b => b.id === blockId);
                if (blockIndex === -1) return prev;

                const newBlocks = [...prev];
                const newBlockId = Date.now().toString();
                newBlocks.splice(blockIndex + 1, 0, { 
                    id: newBlockId, 
                    type: 'text', 
                    text: '',
                    isPlaceholder: true 
                });
                return newBlocks;
            });
        } else if (e.key === 'Backspace' && currentText === '') {
            e.preventDefault();
            setBlocks(prev => prev.filter(block => block.id !== blockId));
        }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('blockId', id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        const items = target.getElementsByClassName(styles.draggableItem);
        const mouseY = e.clientY;

        Array.from(items).forEach((item) => {
            const rect = item.getBoundingClientRect();
            const threshold = rect.top + rect.height / 2;

            if (mouseY < threshold) {
                item.classList.add(styles.dragTop);
                item.classList.remove(styles.dragBottom);
            } else {
                item.classList.add(styles.dragBottom);
                item.classList.remove(styles.dragTop);
            }
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const blockId = e.dataTransfer.getData('blockId');
        
        const target = e.currentTarget as HTMLElement;
        const items = target.getElementsByClassName(styles.draggableItem);
        const mouseY = e.clientY;
        let dropIndex = blocks.length;

        // Находим индекс для вставки на основе позиции мыши
        Array.from(items).forEach((item, index) => {
            item.classList.remove(styles.dragTop, styles.dragBottom);
            const rect = item.getBoundingClientRect();
            if (mouseY < rect.top + rect.height / 2) {
                dropIndex = Math.min(dropIndex, index);
            }
        });

        setBlocks(prev => {
            // Находим перетаскиваемый блок и его индекс
            const draggedBlock = prev.find(block => block.id === blockId);
            const currentIndex = prev.findIndex(block => block.id === blockId);
            
            if (!draggedBlock || currentIndex === -1) return prev;

            // Создаем новый массив без перетаскиваемого блока
            const newBlocks = prev.filter(block => block.id !== blockId);

            // Корректируем индекс вставки, если он больше текущего индекса
            const adjustedDropIndex = dropIndex > currentIndex ? dropIndex - 1 : dropIndex;

            // Вставляем блок в новую позицию
            newBlocks.splice(adjustedDropIndex, 0, draggedBlock);
            
            return newBlocks;
        });
    };

    const getContextMenuItems = (): MenuItem[] => {
        return [
            {
                label: 'Добавить текст',
                onClick: () => createWidget('text')
            },
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
            },
            {
                label: 'Создать колонки',
                onClick: () => createWidget('columns')
            }
        ];
    };

    const handleClick = (e: React.MouseEvent) => {
        // Закрываем контекстное меню при клике в любом месте
        if (contextMenu.visible) {
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    const handleFormatText = (blockId: string, formatType: string, value: any) => {
        setBlocks(prev => prev.map(block => {
            if (block.type === 'text' && block.id === blockId) {
                return {
                    ...block,
                    format: {
                        ...block.format,
                        [formatType]: value
                    }
                };
            }
            return block;
        }));
    };

    const deleteWidget = (widgetId: string) => {
        setBlocks(prev => prev.filter(block => block.id !== widgetId));
    };

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
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => {
                        setShowNewBlockPlaceholder(false);
                        setNewBlockIndex(null);
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({
                            visible: true,
                            x: e.clientX,
                            y: e.clientY,
                            insertIndex: blocks.length
                        });
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';

                        const mainContainer = e.currentTarget.querySelector(`.${styles.mainWidgetsContainer}`);
                        if (!mainContainer) return;

                        const blockElements = Array.from(mainContainer.children);
                        blockElements.forEach(block => {
                            const rect = block.getBoundingClientRect();
                            const mouseY = e.clientY;
                            const mouseX = e.clientX;

                            // Очищаем все индикаторы
                            block.classList.remove(styles.dragTop, styles.dragBottom, styles.dragLeft, styles.dragRight);

                            // Определяем ближайшую сторону к курсору
                            const distanceToTop = Math.abs(mouseY - rect.top);
                            const distanceToBottom = Math.abs(mouseY - rect.bottom);
                            const distanceToLeft = Math.abs(mouseX - rect.left);
                            const distanceToRight = Math.abs(mouseX - rect.right);

                            const minDistance = Math.min(distanceToTop, distanceToBottom, distanceToLeft, distanceToRight);

                            if (minDistance === distanceToTop) {
                                block.classList.add(styles.dragTop);
                            } else if (minDistance === distanceToBottom) {
                                block.classList.add(styles.dragBottom);
                            } else if (minDistance === distanceToLeft) {
                                block.classList.add(styles.dragLeft);
                            } else {
                                block.classList.add(styles.dragRight);
                            }
                        });
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const blockId = e.dataTransfer.getData('blockId');
                        if (!blockId) return;

                        const mainContainer = e.currentTarget.querySelector(`.${styles.mainWidgetsContainer}`);
                        if (!mainContainer) return;

                        const blockElements = Array.from(mainContainer.children);
                        let dropIndex = blocks.length;

                        // Находим ближайший блок и сторону для вставки
                        let closestBlock: Element | null = null;
                        let minDistance = Infinity;
                        let dropPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

                        blockElements.forEach((block, index) => {
                            const rect = block.getBoundingClientRect();
                            const mouseY = e.clientY;
                            const mouseX = e.clientX;

                            const distanceToTop = Math.abs(mouseY - rect.top);
                            const distanceToBottom = Math.abs(mouseY - rect.bottom);
                            const distanceToLeft = Math.abs(mouseX - rect.left);
                            const distanceToRight = Math.abs(mouseX - rect.right);

                            const minLocalDistance = Math.min(distanceToTop, distanceToBottom, distanceToLeft, distanceToRight);

                            if (minLocalDistance < minDistance) {
                                minDistance = minLocalDistance;
                                closestBlock = block;
                                dropIndex = index;

                                if (minLocalDistance === distanceToTop) dropPosition = 'top';
                                else if (minLocalDistance === distanceToBottom) dropPosition = 'bottom';
                                else if (minLocalDistance === distanceToLeft) dropPosition = 'left';
                                else dropPosition = 'right';
                            }
                        });

                        // Очищаем индикаторы
                        blockElements.forEach(block => {
                            block.classList.remove(styles.dragTop, styles.dragBottom, styles.dragLeft, styles.dragRight);
                        });

                        setBlocks(prev => {
                            const draggedBlock = prev.find(block => block.id === blockId);
                            const currentIndex = prev.findIndex(block => block.id === blockId);
                            
                            if (!draggedBlock || currentIndex === -1) return prev;

                            const newBlocks = [...prev];
                            newBlocks.splice(currentIndex, 1);

                            // Корректируем индекс вставки в зависимости от позиции
                            let insertIndex = dropIndex;
                            if (dropPosition === 'bottom' || dropPosition === 'right') {
                                insertIndex++;
                            }
                            if (currentIndex < dropIndex) {
                                insertIndex--;
                            }

                            newBlocks.splice(insertIndex, 0, draggedBlock);
                            return newBlocks;
                        });
                    }}
                >
                    <div className={styles.mainWidgetsContainer}>
                        {blocks.map((block, index) => (
                            <React.Fragment key={block.id}>
                                {block.type === 'widget' ? (
                                    <div
                                        className={`${styles.widgetWrapper} ${styles.draggableItem} ${
                                            block.data.type === 'columns' || block.data.type === 'table' ? styles.fullWidth : ''
                                        }`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, block.id)}
                                    >
                                        {block.data.type !== 'text' && (
                                            <button 
                                                className={styles.deleteWidgetButton}
                                                onClick={() => deleteWidget(block.id)}
                                                title="Удалить виджет"
                                            >
                                                ×
                                            </button>
                                        )}
                                        {block.component}
                                    </div>
                                ) : (
                                    <TextBlock
                                        id={block.id}
                                        text={block.text}
                                        format={block.format}
                                        onChange={handleTextChange}
                                        onKeyDown={handleKeyDown}
                                        onFormatText={handleFormatText}
                                    />
                                )}
                                {showNewBlockPlaceholder && newBlockIndex === index + 1 && (
                                    <div 
                                        className={styles.newBlockPlaceholder}
                                        onClick={handleAddNewBlock}
                                    >
                                        <span>Нажмите, чтобы добавить текст</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {contextMenu.visible && !contextMenu.isFormatting && (
                        <RightClickMenu
                            x={contextMenu.x}
                            y={contextMenu.y}
                            items={getContextMenuItems()}
                            onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
