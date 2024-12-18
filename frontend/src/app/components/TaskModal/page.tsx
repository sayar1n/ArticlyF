'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface TaskModalProps {
    onClose: () => void;
    onSave: (taskData: { title: string; content: string }) => void;
    initialData?: { title: string; content: string };
}

export default function TaskModal({ onClose, onSave, initialData }: TaskModalProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, content });
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>{initialData ? 'Редактировать задачу' : 'Новая задача'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Название задачи</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название задачи"
                            autoFocus
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Описание</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Добавьте описание задачи"
                            rows={4}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Отмена
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}