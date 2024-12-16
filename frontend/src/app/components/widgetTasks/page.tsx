'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface TaskWidgetData {
    title: string;
    tasks: { id: string; text: string; completed: boolean; }[];
}

interface WidgetTasksProps {
    data: TaskWidgetData;
    onUpdate: (data: TaskWidgetData) => void;
}

export default function WidgetTasks({ data, onUpdate }: WidgetTasksProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            onUpdate({
                ...data,
                tasks: [...data.tasks, {
                    id: Date.now().toString(),
                    text: newTask,
                    completed: false
                }]
            });
            setNewTask('');
        }
    };

    const toggleTask = (taskId: string) => {
        onUpdate({
            ...data,
            tasks: data.tasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: !task.completed }
                    : task
            )
        });
    };

    const deleteTask = (taskId: string) => {
        onUpdate({
            ...data,
            tasks: data.tasks.filter(task => task.id !== taskId)
        });
    };

    return (
        <div className={`${styles.widget} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.header}>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={data.title}
                    onChange={(e) => onUpdate({
                        ...data,
                        title: e.target.value
                    })}
                    placeholder="Название виджета"
                />
                <div className={styles.headerControls}>
                    <button 
                        className={styles.expandButton}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        ⌄
                    </button>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.taskList}>
                    {data.tasks.map(task => (
                        <div key={task.id} className={styles.taskItem}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className={styles.checkbox}
                            />
                            <span className={task.completed ? styles.completed : ''}>
                                {task.text}
                            </span>
                            <button 
                                className={styles.deleteButton}
                                onClick={() => deleteTask(task.id)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.addTask}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Добавить новое задание"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    />
                    <button onClick={handleAddTask}>+</button>
                </div>
            </div>
        </div>
    );
}
