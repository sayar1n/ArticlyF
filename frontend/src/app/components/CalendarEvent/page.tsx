interface CalendarEventProps {
    title: string;
    startTime: string;
    endTime: string;
    tagColor: string;
    emoji?: string;
}

export default function CalendarEvent({ title, startTime, endTime, tagColor, emoji }: CalendarEventProps) {
    // Вычисляем высоту события на основе времени
    const getEventHeight = () => {
        const start = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        const end = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
        const duration = end - start;
        return (duration / 60) * 90; // 90px - высота часового слота
    };

    // Вычисляем позицию сверху
    const getEventTop = () => {
        const start = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        return (start / 60) * 90;
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