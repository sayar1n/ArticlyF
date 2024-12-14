'use client';

import { useState } from 'react';
import styles from './page.module.scss';

type ColumnType = 'text' | 'checkbox' | 'date';

interface Column {
    id: string;
    name: string;
    type: ColumnType;
    options?: string[]; // Для select
}

interface Row {
    id: string;
    cells: { [columnId: string]: any };
}

export default function WidgetTable() {
    const [columns, setColumns] = useState<Column[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
    const [editingColumn, setEditingColumn] = useState<Column | null>(null);
    const [editingOptions, setEditingOptions] = useState<{
        columnId: string;
        options: string[];
    } | null>(null);
    const [newOption, setNewOption] = useState('');

    const addColumn = () => {
        const newColumn: Column = {
            id: Date.now().toString(),
            name: `Столбец ${columns.length + 1}`,
            type: 'text'
        };
        setColumns([...columns, newColumn]);
    };

    const addRow = () => {
        const newRow: Row = {
            id: Date.now().toString(),
            cells: columns.reduce((acc, col) => ({
                ...acc,
                [col.id]: col.type === 'checkbox' ? false : ''
            }), {})
        };
        setRows([...rows, newRow]);
    };

    const updateCell = (rowId: string, columnId: string, value: any) => {
        setRows(rows.map(row => 
            row.id === rowId 
                ? { ...row, cells: { ...row.cells, [columnId]: value } }
                : row
        ));
    };

    const updateColumnType = (columnId: string, newType: ColumnType) => {
        setColumns(columns.map(col => 
            col.id === columnId 
                ? { ...col, type: newType }
                : col
        ));

        setRows(rows.map(row => ({
            ...row,
            cells: {
                ...row.cells,
                [columnId]: newType === 'checkbox' ? false : ''
            }
        })));

        setEditingColumnId(null);
    };

    const addOption = (columnId: string) => {
        if (!newOption.trim()) return;
        
        setColumns(columns.map(col => {
            if (col.id === columnId) {
                return {
                    ...col,
                    options: [...(col.options || []), newOption.trim()]
                };
            }
            return col;
        }));
        setNewOption('');
    };

    const renderCell = (column: Column, row: Row) => {
        const value = row.cells[column.id];

        switch (column.type) {
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={value || false}
                        onChange={(e) => updateCell(row.id, column.id, e.target.checked)}
                        className={styles.checkbox}
                    />
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={value || ''}
                        onChange={(e) => updateCell(row.id, column.id, e.target.value)}
                        className={styles.dateInput}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => updateCell(row.id, column.id, e.target.value)}
                        className={styles.textInput}
                    />
                );
        }
    };

    const renderColumnTypeMenu = (columnId: string) => {
        const column = columns.find(col => col.id === columnId);
        
        return (
            <div className={styles.columnTypeMenu}>
                <div className={styles.menuHeader}>
                    <span>Тип столбца</span>
                </div>
                <div className={styles.menuContent}>
                    <button onClick={() => updateColumnType(columnId, 'text')}>
                        <span>📝</span> Текст
                    </button>
                    <button onClick={() => updateColumnType(columnId, 'checkbox')}>
                        <span>☑️</span> Чекбокс
                    </button>
                    <button onClick={() => updateColumnType(columnId, 'date')}>
                        <span>📅</span> Дата
                    </button>
                </div>
            </div>
        );
    };

    const renderRow = (row: Row) => (
        <div key={row.id} className={styles.row}>
            {columns.map(column => (
                <div key={column.id} className={styles.cell}>
                    {renderCell(column, row)}
                </div>
            ))}
            <button 
                className={styles.deleteButton}
                onClick={() => deleteRow(row.id)}
            >
                ×
            </button>
        </div>
    );

    const deleteRow = (rowId: string) => {
        setRows(rows.filter(row => row.id !== rowId));
    };

    return (
        <div className={styles.widget}>
            <div className={styles.header}>
                <span>Таблица</span>
                <div className={styles.headerControls}>
                    <button 
                        className={styles.expandButton}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? '▼' : '▶'}
                    </button>
                </div>
            </div>
            
            {isExpanded && (
                <div className={styles.content}>
                    <div className={styles.tableControls}>
                        <button onClick={addColumn}>+ Добавить столбец</button>
                        <button onClick={addRow}>+ Добавить строку</button>
                    </div>
                    
                    <div className={styles.table}>
                        {columns.length > 0 ? (
                            <>
                                <div className={styles.tableHeader}>
                                    {columns.map(column => (
                                        <div key={column.id} className={styles.headerCell}>
                                            <div className={styles.headerContent}>
                                                <span>{column.name}</span>
                                                <button 
                                                    className={styles.columnTypeButton}
                                                    onClick={() => setEditingColumnId(column.id)}
                                                >
                                                    ⚙️
                                                </button>
                                            </div>
                                            {editingColumnId === column.id && renderColumnTypeMenu(column.id)}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className={styles.tableBody}>
                                    {rows.map(row => renderRow(row))}
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <p>Добавьте столбцы для начала работы</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
