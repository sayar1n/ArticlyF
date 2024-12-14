"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.scss';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    onClose: () => void;
}

export default function DatePicker({ value, onChange, onClose }: DatePickerProps) {
    const [selectedDate, setSelectedDate] = useState(value);
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

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const getDaysInMonth = (month: number, year: number) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Получаем день недели первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
        let firstDayOfWeek = firstDay.getDay();
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Преобразуем в формат Пн-Вс

        // Добавляем пустые ячейки для выравнивания
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Добавляем дни месяца
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const days = getDaysInMonth(currentMonth, currentYear);

    const handleDateSelect = (date: Date) => {
        if (!date) return;
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        setSelectedDate(formattedDate);
        onChange(formattedDate);
    };

    const handleMonthChange = (increment: number) => {
        setCurrentMonth(prevMonth => {
            const newMonth = prevMonth + increment;
            if (newMonth > 11) {
                setCurrentYear(prevYear => prevYear + 1);
                return 0;
            }
            if (newMonth < 0) {
                setCurrentYear(prevYear => prevYear - 1);
                return 11;
            }
            return newMonth;
        });
    };

    return (
        <div className={styles.datePickerWrapper} ref={pickerRef}>
            <div className={styles.header}>
                <button 
                    onClick={() => handleMonthChange(-1)}
                    className={styles.navButton}
                >
                    ←
                </button>
                <div className={styles.monthYear}>
                    <div>{new Date(currentYear, currentMonth).toLocaleString('ru', { month: 'long' })}</div>
                    <div className={styles.year}>{currentYear}</div>
                </div>
                <button 
                    onClick={() => handleMonthChange(1)}
                    className={styles.navButton}
                >
                    →
                </button>
            </div>
            <div className={styles.weekDays}>
                {weekDays.map(day => (
                    <div key={day} className={styles.weekDay}>{day}</div>
                ))}
            </div>
            <div className={styles.calendar}>
                {days.map((date, index) => (
                    <div
                        key={index}
                        className={`${styles.dateOption} ${
                            date ? (
                                selectedDate === `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}` 
                                ? styles.selected 
                                : ''
                            ) : styles.empty
                        }`}
                        onClick={() => date && handleDateSelect(date)}
                    >
                        {date ? date.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    );
} 