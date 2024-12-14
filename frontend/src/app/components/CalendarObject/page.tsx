"use client";

import styles from './page.module.scss';

interface CalendarEventProps {
    title: string;
    startTime: string;
    endTime: string;
    tagColor: string;
    emoji?: string;
}

export default function CalendarEvent({ 
    title,
    startTime = "00:00",
    endTime = "00:00",
    tagColor,
    emoji
}: CalendarEventProps) {
    // Вычисляем высоту события на основе времени
    const getEventHeight = () => {
        try {
            const [startHour = "0", startMinute = "0"] = (startTime || "00:00").split(':');
            const [endHour = "0", endMinute = "0"] = (endTime || "00:00").split(':');
            
            const start = parseInt(startHour) * 60 + parseInt(startMinute);
            const end = parseInt(endHour) * 60 + parseInt(endMinute);
            const duration = end - start;
            
            return Math.max(duration / 60 * 90, 30); // Минимальная высота 30px
        } catch (error) {
            console.error('Error calculating event height:', error);
            return 30; // Возвращаем минимальную высоту в случае ошибки
        }
    };

    // Вычисляем позицию сверху
    const getEventTop = () => {
        try {
            const [hour = "0", minute = "0"] = (startTime || "00:00").split(':');
            const start = parseInt(hour) * 60 + parseInt(minute);
            return start / 60 * 90;
        } catch (error) {
            console.error('Error calculating event top position:', error);
            return 0;
        }
    };

    return (
        <div 
            className={styles.calendarEvent}
            style={{
                backgroundColor: tagColor,
                height: `${getEventHeight()}px`,
                top: `${getEventTop()}px`
            }}
        >
            <div className={styles.eventContent}>
                {emoji && <span className={styles.eventEmoji}>{emoji}</span>}
                <span className={styles.eventTitle}>{title}</span>
                <span className={styles.eventTime}>{`${startTime} - ${endTime}`}</span>
            </div>
        </div>
    );
} 