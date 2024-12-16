'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface NoteWidgetData {
    title: string;
    content: string;
}

interface WidgetNoteProps {
    data: NoteWidgetData;
    onUpdate: (data: NoteWidgetData) => void;
}

export default function WidgetNote({ data, onUpdate }: WidgetNoteProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div className={`${styles.widget} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.header}>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название заметки"
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
                <textarea
                    className={styles.noteContent}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Введите текст заметки..."
                />
            </div>
        </div>
    );
} 