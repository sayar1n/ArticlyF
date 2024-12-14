"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.scss';

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    onClose: () => void;
}

export default function TimePicker({ value, onChange, onClose }: TimePickerProps) {
    const [hours, setHours] = useState(value ? parseInt(value.split(':')[0]) : 12);
    const [minutes, setMinutes] = useState(value ? parseInt(value.split(':')[1]) : 0);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    const handleSelect = (type: 'hours' | 'minutes', value: number) => {
        if (type === 'hours') {
            setHours(value);
            onChange(`${String(value).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
        } else {
            setMinutes(value);
            onChange(`${String(hours).padStart(2, '0')}:${String(value).padStart(2, '0')}`);
        }
    };

    return (
        <div className={styles.timePickerWrapper} ref={pickerRef}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    {hoursArray.map((hour) => (
                        <div
                            key={hour}
                            className={`${styles.timeOption} ${hours === hour ? styles.selected : ''}`}
                            onClick={() => handleSelect('hours', hour)}
                        >
                            {String(hour).padStart(2, '0')}
                        </div>
                    ))}
                </div>
                <div className={styles.column}>
                    {minutesArray.map((minute) => (
                        <div
                            key={minute}
                            className={`${styles.timeOption} ${minutes === minute ? styles.selected : ''}`}
                            onClick={() => handleSelect('minutes', minute)}
                        >
                            {String(minute).padStart(2, '0')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 