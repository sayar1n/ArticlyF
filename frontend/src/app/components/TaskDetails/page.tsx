'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface TaskDetailsProps {
    task: {
        id: string;
        title: string;
        content: string;
    };
    onClose: () => void;
    onUpdate: (taskId: string, updates: { title?: string; content?: string }) => void;
}

export default function TaskDetails({ task, onClose, onUpdate }: TaskDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(task.content);

    const handleSave = () => {
        onUpdate(task.id, { content: editedContent });
        setIsEditing(false);
    };

    return (
        <div className={styles.detailsPanel}>
            <div className={styles.header}>
                <h2>{task.title}</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <div className={styles.content}>
                {isEditing ? (
                    <div className={styles.editContent}>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            placeholder="Добавьте описание задачи"
                        />
                        <div className={styles.editButtons}>
                            <button onClick={() => setIsEditing(false)}>Отмена</button>
                            <button onClick={handleSave}>Сохранить</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.viewContent} onClick={() => setIsEditing(true)}>
                        {task.content || 'Нажмите, чтобы добавить описание'}
                    </div>
                )}
            </div>
        </div>
    );
}