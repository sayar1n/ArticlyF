"use client";

import styles from './page.module.scss';

interface MyCalendarEventItemProps {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    tagColor: string;
    tagName?: string;
    emoji?: string;
}

export default function MyCalendarEventItem({ 
    title,
    date,
    startTime,
    endTime,
    tagColor,
    tagName,
    emoji
}: MyCalendarEventItemProps) {
    return (
        <div 
            className={styles.eventItem}
            style={{ backgroundColor: tagColor }}
        >
            <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                    {emoji && <span className={styles.emoji}>{emoji}</span>}
                    <span className={styles.title}>{title}</span>
                </div>
                <div className={styles.eventInfo}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.time}>{`${startTime} - ${endTime}`}</span>
                </div>
            </div>
        </div>
    );
}