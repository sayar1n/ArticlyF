"use client";

import { p } from 'framer-motion/client';
import styles from './page.module.scss';

interface MyCalendarEventItemProps {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    tagColor: string;
    emoji?: string;
    onDelete?: () => void;
}

export default function MyCalendarEventItem({ 
    title,
    date,
    startTime,
    endTime,
    tagColor,
    emoji,
    onDelete
}: MyCalendarEventItemProps) {
    return (
        <div 
            className={styles.eventItem}
            style={{ backgroundColor: tagColor }}
        >
            <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                    <div className={styles.headerLeft}>
                        {emoji && <span className={styles.emoji}>{emoji}</span>}
                        <span className={styles.title}>{title}</span>
                    </div>
                    {onDelete && (
                        <button 
                            className={styles.deleteButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className={styles.eventInfo}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.time}>{`${startTime} - ${endTime}`}</span>
                    
                </div>
            </div>
        </div>
    );
}