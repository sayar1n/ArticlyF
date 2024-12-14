"use client";

import styles from './page.module.scss';
import { useState } from 'react';
import ModalCalendar from '../modalCalendar/page';

interface CalendarLittleProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export default function CalendarLittle({ selectedDate, onDateChange }: CalendarLittleProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const daysArray = [];
        const firstDayOfWeek = firstDay.getDay() || 7;
        
        // Дни предыдущего месяца
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i > 0; i--) {
            daysArray.push({
                day: prevMonthLastDay - i + 1,
                currentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i + 1)
            });
        }
        
        // Дни текущего месяца
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push({
                day: i,
                currentMonth: true,
                date: new Date(year, month, i)
            });
        }
        
        // Дни следующего месяца
        const remainingDays = 42 - daysArray.length;
        for (let i = 1; i <= remainingDays; i++) {
            daysArray.push({
                day: i,
                currentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }
        
        return daysArray;
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
        onDateChange(date);
        if (!isCurrentMonth) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
        }
    };

    return (
        <div className={styles.calendarLittle
        }>
            <div className={styles.calendarLittle_title}>
                <p>Календарь</p>
            </div>
            <div className={styles.calendarLittle_month}>
                <p>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                <div className={styles.calendarLittle_month_buttons}>
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
            </div>
            <div className={styles.calendarLittle_days}>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                    <div key={index} className={styles.weekday}>{day}</div>
                ))}
                {getDaysInMonth().map((day, index) => (
                    <div 
                        key={index} 
                        className={`${styles.day} 
                                    ${!day.currentMonth ? styles.otherMonth : ''} 
                                    ${selectedDate && isSameDay(day.date, selectedDate) ? styles.active : ''}`}
                        onClick={() => handleDateClick(day.date, day.currentMonth)}
                    >
                        {day.day}
                    </div>
                ))}
            </div>
            <div className={styles.calendarLittle_events}>
                <p>Предстоящие события</p>
            </div>
        </div>
    );
}
