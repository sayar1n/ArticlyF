"use client";

import styles from './page.module.scss';
import { useState, useRef, useEffect } from 'react';
import CalendarEventItem from '../MyEventModalItem/page';

interface MyEventsModalProps {
    onClose: () => void;
    events: Array<{
        id: string;
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        tagColor: string;
        emoji: string;
    }>;
}

export default function MyEventsModal({ onClose, events }: MyEventsModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.content}>
                    <h2>Мои события</h2>
                    <div className={styles.eventsGrid}>
                        {events.map(event => (
                            <CalendarEventItem
                                key={event.id}
                                title={event.title}
                                date={event.date}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                tagColor={event.tagColor}
                                emoji={event.emoji}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 