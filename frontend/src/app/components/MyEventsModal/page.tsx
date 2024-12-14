"use client";

import styles from './page.module.scss';
import { useState, useRef, useEffect } from 'react';

interface MyEventsModalProps {
    onClose: () => void;
}

export default function MyEventsModal({ onClose }: MyEventsModalProps) {
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
                        {/* Здесь будет сетка событий 4xN */}
                    </div>
                </div>
            </div>
        </div>
    );
} 