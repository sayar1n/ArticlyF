'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.scss';

interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

interface Task {
    id: string;
    title: string;
    content: string;
}

export default function TaskDashboard() {
    const [columns, setColumns] = useState<Column[]>([
        { id: '1', title: 'К выполнению', tasks: [] },
        { id: '2', title: 'В процессе', tasks: [] }
    ]);
    const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskContent, setNewTaskContent] = useState('');

    // Обработчики для колонок
    const handleAddColumn = () => {
        if (columns.length >= 8) return;
        const newColumn: Column = {
            id: Date.now().toString(),
            title: 'Новый столбец',
            tasks: []
        };
        setColumns([...columns, newColumn]);
    };

    const handleColumnTitleChange = (columnId: string, newTitle: string) => {
        setColumns(columns.map(column =>
            column.id === columnId ? { ...column, title: newTitle } : column
        ));
    };

    // Обработчики для задач
    const handleAddTaskClick = (columnId: string) => {
        setSelectedColumnId(columnId);
        setIsCreatingTask(true);
        setNewTaskTitle('');
        setNewTaskContent('');
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setNewTaskTitle(task.title);
        setNewTaskContent(task.content);
    };

    const handleSaveTask = () => {
        if (!selectedColumnId || !newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            content: newTaskContent
        };

        setColumns(columns.map(column =>
            column.id === selectedColumnId
                ? { ...column, tasks: [...column.tasks, newTask] }
                : column
        ));

        setIsCreatingTask(false);
        setSelectedColumnId(null);
        setNewTaskTitle('');
        setNewTaskContent('');
    };

    const handleUpdateTask = () => {
        if (!selectedTask) return;

        setColumns(columns.map(column => ({
            ...column,
            tasks: column.tasks.map(task =>
                task.id === selectedTask.id
                    ? { ...task, title: newTaskTitle, content: newTaskContent }
                    : task
            )
        })));

        setSelectedTask(null);
        setNewTaskTitle('');
        setNewTaskContent('');
    };

    // Добавляем функцию удаления задачи
    const handleDeleteTask = () => {
        if (!selectedTask) return;

        setColumns(columns.map(column => ({
            ...column,
            tasks: column.tasks.filter(task => task.id !== selectedTask.id)
        })));

        setSelectedTask(null);
        setNewTaskTitle('');
        setNewTaskContent('');
    };

    // Обработчики для drag-n-drop
    const handleTaskDragStart = (e: React.DragEvent, task: Task) => {
        e.stopPropagation();
        setDraggedTask(task);
    };

    const handleTaskDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleTaskDrop = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedTask) return;

        const sourceColumn = columns.find(col =>
            col.tasks.some(task => task.id === draggedTask.id)
        );

        if (!sourceColumn) return;

        const updatedColumns = columns.map(column => {
            if (column.id === sourceColumn.id) {
                return {
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== draggedTask.id)
                };
            }
            if (column.id === columnId) {
                return {
                    ...column,
                    tasks: [...column.tasks, draggedTask]
                };
            }
            return column;
        });

        setColumns(updatedColumns);
        setDraggedTask(null);
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.columnsContainer}>
                {columns.map(column => (
                    <div
                        key={column.id}
                        className={styles.column}
                    >
                        <div className={styles.columnHeader}>
                            {editingColumnId === column.id ? (
                                <input
                                    type="text"
                                    value={column.title}
                                    onChange={(e) => handleColumnTitleChange(column.id, e.target.value)}
                                    onBlur={() => setEditingColumnId(null)}
                                    autoFocus
                                />
                            ) : (
                                <h3
                                    onDoubleClick={() => setEditingColumnId(column.id)}
                                    className={styles.columnTitle}
                                >
                                    {column.title}
                                </h3>
                            )}
                            <button
                                className={styles.addTaskButton}
                                onClick={() => handleAddTaskClick(column.id)}
                            >
                                +
                            </button>
                        </div>
                        <div
                            className={styles.taskList}
                            onDragOver={handleTaskDragOver}
                            onDrop={(e) => handleTaskDrop(e, column.id)}
                        >
                            {column.tasks.map(task => (
                                <div
                                    key={task.id}
                                    className={styles.task}
                                    draggable
                                    onDragStart={(e) => handleTaskDragStart(e, task)}
                                    onClick={() => handleTaskClick(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {columns.length < 8 && (
                    <button
                        className={styles.addColumnButton}
                        onClick={handleAddColumn}
                    >
                        + Добавить столбец
                    </button>
                )}
            </div>

            <AnimatePresence>
                {(isCreatingTask || selectedTask) && (
                    <motion.div
                        className={styles.taskPanel}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <div className={styles.taskPanelHeader}>
                            <h3>{isCreatingTask ? 'Новая задача' : 'Редактирование задачи'}</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => {
                                    setIsCreatingTask(false);
                                    setSelectedTask(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.taskPanelContent}>
                            <div className={styles.inputGroup}>
                                <label>Название задачи</label>
                                <input
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="Введите название задачи"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Описание</label>
                                <textarea
                                    value={newTaskContent}
                                    onChange={(e) => setNewTaskContent(e.target.value)}
                                    placeholder="Добавьте описание задачи"
                                    rows={4}
                                />
                            </div>
                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.saveButton}
                                    onClick={isCreatingTask ? handleSaveTask : handleUpdateTask}
                                >
                                    {isCreatingTask ? 'Создать' : 'Сохранить'}
                                </button>
                                {!isCreatingTask && (
                                    <button
                                        className={styles.deleteButton}
                                        onClick={handleDeleteTask}
                                    >
                                        Удалить задачу
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}