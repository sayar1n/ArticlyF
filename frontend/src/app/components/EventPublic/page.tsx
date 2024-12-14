"use client";

import React from 'react';
import styles from './page.module.scss';
import { Event } from '@/app/types/Event';

interface EventPublicProps {
    event: Event;
    hourHeight: number; // Высота одного часа в пикселях
}

const EventPublic: React.FC<EventPublicProps> = ({ event, hourHeight }) => {
    const calculatePosition = () => {
        // Преобразуем время начала и конца в минуты
        const [startHour, startMinute] = event.startTime.split(':').map(Number);
        const [endHour, endMinute] = event.endTime.split(':').map(Number);
        
        // Рассчитываем позицию и высоту
        // Один час = 80px
        const top = startHour * 90 + (startMinute / 60) * 90;
        const height = (endHour - startHour) * 90 + ((endMinute - startMinute) / 60) * 90;
        
        return { top, height };
    };

    const { top, height } = calculatePosition();

    if (!event.showInCalendar) return null;

    return (
        <div 
            className={styles.eventPublic}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                backgroundColor: event.tagColor
            }}
        >
            <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                    {event.emoji && <span className={styles.emoji}>{event.emoji}</span>}
                    <span className={styles.title}>{event.title}</span>
                </div>
                <span className={styles.time}>
                    {`${event.startTime} - ${event.endTime}`}
                </span>
            </div>
        </div>
    );
};

export default EventPublic; 