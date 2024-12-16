'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import TextBlock from '../TextBlock/page';
import WidgetTasks from '../widgetTasks/page';
import WidgetNote from '../widgetNote/page';
import WidgetTable from '../widgetTable/page';
import WidgetText from '../widgetText/page';
import RightClickMenu, { MenuItem } from '../rightClickMenu/page';

export interface Column {
    id: string;
    blocks: ContentBlock[];
}

export interface ColumnsWidgetData {
    columns: Column[];
    columnsCount: 2 | 3;
}

interface WidgetColumnsProps {
    data: ColumnsWidgetData;
    onUpdate: (data: ColumnsWidgetData) => void;
}

type ContentBlock = {
    id: string;
    type: 'widget' | 'text';
    text?: string;
    isPlaceholder?: boolean;
    format?: {
        bold?: boolean;
        italic?: boolean;
        backgroundColor?: string;
        color?: string;
        fontSize?: number;
    };
    data?: any;
    component?: JSX.Element;
};

const WidgetColumns: React.FC<WidgetColumnsProps> = ({ data, onUpdate }) => {
    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        columnId: string;
        insertIndex: number;
    } | null>(null);
    const [showNewBlockPlaceholder, setShowNewBlockPlaceholder] = useState<{columnId: string; index: number} | null>(null);

    const createWidget = (type: 'task' | 'note' | 'table' | 'text', columnId: string, insertAt?: number) => {
        const id = Date.now().toString();
        const widgetData: any = {
            id,
            type,
            data: type === 'task'
                ? { title: '', tasks: [] }
                : type === 'note'
                    ? { title: '', content: '' }
                    : type === 'text'
                        ? { text: '' }
                        : { columns: [], rows: [] }
        };

        const newWidget: ContentBlock = {
            id,
            type: 'widget',
            data: widgetData,
            component: type === 'task'
                ? <WidgetTasks key={id} data={widgetData.data} onUpdate={(newData) => updateWidgetData(columnId, id, { ...widgetData, data: newData })} />
                : type === 'note'
                    ? <WidgetNote key={id} data={widgetData.data} onUpdate={(newData) => updateWidgetData(columnId, id, { ...widgetData, data: newData })} />
                    : type === 'text'
                        ? <WidgetText key={id} data={widgetData.data} onUpdate={(newData) => updateWidgetData(columnId, id, { ...widgetData, data: newData })} />
                        : <WidgetTable key={id} data={widgetData.data} onUpdate={(newData) => updateWidgetData(columnId, id, { ...widgetData, data: newData })} />
        };

        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    const blocks = [...col.blocks];
                    blocks.splice(insertAt ?? blocks.length, 0, newWidget);
                    return { ...col, blocks };
                }
                return col;
            })
        });
    };

    const updateWidgetData = (columnId: string, widgetId: string, newData: any) => {
        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    return {
                        ...col,
                        blocks: col.blocks.map(block => 
                            block.id === widgetId ? { ...block, data: newData } : block
                        )
                    };
                }
                return col;
            })
        });
    };

    const handleTextChange = (columnId: string, blockId: string, text: string) => {
        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    return {
                        ...col,
                        blocks: col.blocks.map(block => 
                            block.id === blockId && block.type === 'text'
                                ? { ...block, text, isPlaceholder: false }
                                : block
                        ).filter(block => {
                            if (block.type === 'text' && block.text?.trim() === '') {
                                return block.id === blockId;
                            }
                            return true;
                        })
                    };
                }
                return col;
            })
        });
    };

    const handleKeyDown = (columnId: string, e: React.KeyboardEvent<HTMLTextAreaElement>, blockId: string) => {
        const currentText = (e.target as HTMLTextAreaElement).value;
        
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            onUpdate({
                ...data,
                columns: data.columns.map(col => {
                    if (col.id === columnId) {
                        const blockIndex = col.blocks.findIndex(b => b.id === blockId);
                        if (blockIndex === -1) return col;

                        const newBlocks = [...col.blocks];
                        const newBlockId = Date.now().toString();
                        newBlocks.splice(blockIndex + 1, 0, {
                            id: newBlockId,
                            type: 'text',
                            text: '',
                            isPlaceholder: true
                        });
                        return { ...col, blocks: newBlocks };
                    }
                    return col;
                })
            });
        } else if (e.key === 'Backspace' && currentText === '') {
            e.preventDefault();
            onUpdate({
                ...data,
                columns: data.columns.map(col => {
                    if (col.id === columnId) {
                        return {
                            ...col,
                            blocks: col.blocks.filter(block => block.id !== blockId)
                        };
                    }
                    return col;
                })
            });
        }
    };

    const handleFormatText = (columnId: string, blockId: string, formatType: string, value: any) => {
        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    return {
                        ...col,
                        blocks: col.blocks.map(block => {
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
                        })
                    };
                }
                return col;
            })
        });
    };

    const handleAddNewBlock = (columnId: string) => {
        if (!showNewBlockPlaceholder) return;

        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    const newBlocks = [...col.blocks];
                    newBlocks.splice(showNewBlockPlaceholder.index, 0, {
                        id: Date.now().toString(),
                        type: 'text',
                        text: '',
                        isPlaceholder: true
                    });
                    return { ...col, blocks: newBlocks };
                }
                return col;
            })
        });

        setShowNewBlockPlaceholder(null);
    };

    const getContextMenuItems = (columnId: string): MenuItem[] => {
        return [
            {
                label: 'Добавить текст',
                onClick: () => createWidget('text', columnId, contextMenu?.insertIndex)
            },
            {
                label: 'Создать задание',
                onClick: () => createWidget('task', columnId, contextMenu?.insertIndex)
            },
            {
                label: 'Создать заметку',
                onClick: () => createWidget('note', columnId, contextMenu?.insertIndex)
            },
            {
                label: 'Создать таблицу',
                onClick: () => createWidget('table', columnId, contextMenu?.insertIndex)
            }
        ];
    };

    const handleMouseMove = (columnId: string, e: React.MouseEvent) => {
        const container = e.currentTarget as HTMLElement;
        const rect = container.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const blockElements = Array.from(container.children);
        
        let foundGap = false;
        for (let i = 0; i < blockElements.length; i++) {
            const block = blockElements[i];
            const blockRect = block.getBoundingClientRect();
            const blockTop = blockRect.top - rect.top;
            const blockBottom = blockRect.bottom - rect.top;
            
            if (mouseY >= blockBottom && mouseY <= blockBottom + 40) {
                setShowNewBlockPlaceholder({ columnId, index: i + 1 });
                foundGap = true;
                break;
            }
        }
        
        if (!foundGap) {
            setShowNewBlockPlaceholder(null);
        }
    };

    const deleteWidget = (columnId: string, widgetId: string) => {
        onUpdate({
            ...data,
            columns: data.columns.map(col => {
                if (col.id === columnId) {
                    return {
                        ...col,
                        blocks: col.blocks.filter(block => block.id !== widgetId)
                    };
                }
                return col;
            })
        });
    };

    const handleDragStart = (e: React.DragEvent, columnId: string, blockId: string) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
            sourceColumnId: columnId,
            blockId: blockId
        }));
        const draggedElement = e.target as HTMLElement;
        draggedElement.style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const draggedElement = e.target as HTMLElement;
        draggedElement.style.opacity = '1';
    };

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    };

    const handleDragLeave = (e: React.DragEvent) => {
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = '';
    };

    const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
        e.preventDefault();
        const column = e.currentTarget as HTMLElement;
        column.style.backgroundColor = '';

        try {
            const { sourceColumnId, blockId } = JSON.parse(e.dataTransfer.getData('application/json'));
            
            if (!sourceColumnId || !blockId) return;
            if (sourceColumnId === targetColumnId) return;

            const sourceColumn = data.columns.find(col => col.id === sourceColumnId);
            const blockToMove = sourceColumn?.blocks.find(block => block.id === blockId);
            
            if (!blockToMove) return;

            // Определяем позицию для вставки блока
            const rect = column.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            const blocks = Array.from(column.children);
            let insertIndex = blocks.length;

            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const blockRect = block.getBoundingClientRect();
                const blockMiddle = blockRect.top + blockRect.height / 2 - rect.top;
                
                if (mouseY < blockMiddle) {
                    insertIndex = i;
                    break;
                }
            }

            onUpdate({
                ...data,
                columns: data.columns.map(col => {
                    if (col.id === sourceColumnId) {
                        return {
                            ...col,
                            blocks: col.blocks.filter(block => block.id !== blockId)
                        };
                    }
                    if (col.id === targetColumnId) {
                        const newBlocks = [...col.blocks];
                        newBlocks.splice(insertIndex, 0, blockToMove);
                        return {
                            ...col,
                            blocks: newBlocks
                        };
                    }
                    return col;
                })
            });
        } catch (error) {
            console.error('Error during drop:', error);
        }
    };

    return (
        <div className={`${styles.columnsWidget} columnsWidget`} onClick={() => {
            if (contextMenu?.visible) {
                setContextMenu(null);
            }
        }}>
            <div className={styles.columnsHeader}>
                <button onClick={() => {
                    onUpdate({
                        ...data,
                        columnsCount: data.columnsCount === 2 ? 3 : 2,
                        columns: data.columnsCount === 2 
                            ? [...data.columns, { id: Date.now().toString(), blocks: [] }]
                            : data.columns.slice(0, 2)
                    });
                }}>
                    {data.columnsCount === 2 ? '3 колонки' : '2 колонки'}
                </button>
            </div>
            <div className={`${styles.columnsContainer} ${styles[`columns${data.columnsCount}`]}`}>
                {data.columns.map(column => (
                    <div
                        key={column.id}
                        className={styles.column}
                        onMouseMove={(e) => handleMouseMove(column.id, e)}
                        onMouseLeave={(e: React.MouseEvent) => {
                            setShowNewBlockPlaceholder(null);
                            handleDragLeave(e as unknown as React.DragEvent);
                        }}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, column.id)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setContextMenu({
                                visible: true,
                                x: e.clientX,
                                y: e.clientY,
                                columnId: column.id,
                                insertIndex: column.blocks.length
                            });
                        }}
                    >
                        {column.blocks.map((block, index) => (
                            <React.Fragment key={block.id}>
                                {block.type === 'widget' ? (
                                    <div 
                                        className={styles.blockWrapper}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, column.id, block.id)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <button 
                                            className={styles.deleteWidgetButton}
                                            onClick={() => deleteWidget(column.id, block.id)}
                                            title="Удалить виджет"
                                        >
                                            ×
                                        </button>
                                        {block.component}
                                    </div>
                                ) : (
                                    <TextBlock
                                        id={block.id}
                                        text={block.text || ''}
                                        format={block.format}
                                        onChange={(text) => handleTextChange(column.id, block.id, text)}
                                        onKeyDown={(e) => handleKeyDown(column.id, e, block.id)}
                                        onFormatText={(formatType, value) => handleFormatText(column.id, block.id, formatType, value)}
                                    />
                                )}
                                {showNewBlockPlaceholder?.columnId === column.id && 
                                 showNewBlockPlaceholder.index === index + 1 && (
                                    <div 
                                        className={styles.newBlockPlaceholder}
                                        onClick={() => handleAddNewBlock(column.id)}
                                    >
                                        <span>Нажмите, чтобы добавить текст</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            {contextMenu?.visible && (
                <RightClickMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    items={getContextMenuItems(contextMenu.columnId)}
                    onClose={() => setContextMenu(null)}
                />
            )}
        </div>
    );
};

export default WidgetColumns; 