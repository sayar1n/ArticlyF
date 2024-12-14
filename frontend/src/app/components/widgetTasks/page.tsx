'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function WidgetTasks() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, {
                id: Date.now().toString(),
                text: newTask,
                completed: false
            }]);
            setNewTask('');
        }
    };

    const toggleTask = (taskId: string) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className={`${styles.widget} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.header}>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    {tasks.map(task => (
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
