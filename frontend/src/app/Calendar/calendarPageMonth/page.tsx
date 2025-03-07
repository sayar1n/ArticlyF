'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import SidebarMini from '../../components/SidebarMini/page';
import CalendarLittle from '../../components/CalendarLittle/page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ModalCalendar from '../../components/modalCalendar/page';
import SidebarFull from '../../components/SidebarFull/page';
import MyEventsModal from '../../components/MyEventsModal/page';

type Folder = {
    id: number;
    name: string;
};

export default function CalendarPageMonth() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [folders, setFolders] = useState<Folder[]>([
        { id: 1, name: 'Все события' },
        { id: 2, name: 'Работа' },
        { id: 3, name: 'Дом' }
    ]);
    const [activeFilter, setActiveFilter] = useState<number>(1);
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEventsModal, setShowEventsModal] = useState(false);
    const [events, setEvents] = useState<Array<{
        id: string;
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        tagColor: string;
        emoji: string;
        showInCalendar: boolean;
        description?: string;
        location?: string;
        isTask: boolean;
        isImportant: boolean;
        theme: string;
    }>>([]);

    const pathname = usePathname();

    // Функции для изменения даты
    const handlePrevMonth = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    const handleFilterClick = (folderId: number) => {
        setActiveFilter(folderId);
        // Здесь будет логика фильтрации событий
    };

    const handleAddFolder = () => {
        if (isAddingFolder && newFolderName.trim()) {
            setFolders(prev => [...prev, {
                id: Math.max(...prev.map(f => f.id)) + 1,
                name: newFolderName.trim()
            }]);
            setNewFolderName('');
            setIsAddingFolder(false);
        } else {
            setIsAddingFolder(true);
        }
    };

    // В компоненте добавим функцию для получения дней недели
    const getWeekDays = () => {
        const current = new Date(selectedDate);
        const week = [];
        
        // Получаем понедельник текущей недели
        const first = current.getDate() - current.getDay() + 1;
        current.setDate(first);
        
        // Заполняем массив датами недели
        for (let i = 0; i < 7; i++) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        return week;
    };

    // обавим функцию для получения дней месяца
    const getMonthDays = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        
        // Получаем день недели первого дня месяца (0 - воскресенье)
        let firstDayOfWeek = firstDay.getDay() || 7;
        firstDayOfWeek--; // Корректируем для понедельника как первого дня
        
        // Добавляем дни предыдущего месяца
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false
            });
        }
        
        // Добавляем дни текущего месяца
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }
        
        // Добавляем дни следующего месяца
        const remainingDays = 42 - days.length; // 6 недель по 7 дней
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }
        
        return days;
    };

    const handleCreateEvent = (newEvent: any) => {
        setEvents(prev => [...prev, newEvent]);
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };

    return (
        <>
            <SidebarFull />
            <div className={styles.container}>
                {/* Верхняя панель */}
                <div className={styles.topPanel}>
                    <div className={styles.viewSwitcher}>
                        <Link 
                            href="./calendarPageDay" 
                            className={`${styles.viewButton} ${pathname === './calendarPageDay' ? styles.activeView : ''}`}
                        >
                            День
                        </Link>
                        <Link 
                            href="./calendarPageWeek" 
                            className={`${styles.viewButton} ${pathname === './calendarPageWeek' ? styles.activeView : ''}`}
                        >
                            Неделя
                        </Link>
                        <Link 
                            href="./calendarPageMonth" 
                            className={`${styles.viewButton} ${pathname === './calendarPageMonth' ? styles.activeView : ''}`}
                        >
                            Месяц
                        </Link>
                    </div>
                    
                    <div className={styles.dateControls}>
                        <button 
                            className={styles.dateNav} 
                            onClick={handlePrevMonth}
                        >
                            ←
                        </button>
                        <span className={styles.currentDate}>
                            {selectedDate.toLocaleDateString('ru-RU', { 
                                month: 'long' 
                            })}
                        </span>
                        <button 
                            className={styles.dateNav} 
                            onClick={handleNextMonth}
                        >
                            →
                        </button>
                    </div>
                    
                    <div className={styles.searchContainer}>
                        <input 
                            type="text" 
                            placeholder="Поиск событий"
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Основной контент */}
                <div className={styles.mainContent}>
                    {/* Папки */}
                    <div className={styles.foldersPanel}>
                        {folders.map(folder => (
                            <button 
                                key={folder.id} 
                                className={`${styles.folderButton} ${activeFilter === folder.id ? styles.active : ''}`}
                                onClick={() => handleFilterClick(folder.id)}
                            >
                                {folder.name}
                            </button>
                        ))}
                        {isAddingFolder ? (
                            <div className={styles.addFolderInput}>
                                <input
                                    type="text"
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                    placeholder="Название папки"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddFolder();
                                        if (e.key === 'Escape') {
                                            setIsAddingFolder(false);
                                            setNewFolderName('');
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <button 
                                className={`${styles.folderButton} ${styles.addFolderButton}`}
                                onClick={handleAddFolder}
                            >
                                +
                            </button>
                        )}
                        <div className={styles.createEventContainer}>
                            <button 
                                className={styles.createEventButton}
                                onClick={() => setShowModal(true)}
                            >
                                + Событие
                            </button>
                            <button 
                                className={styles.createEventButton}
                                style={{ background: '#00A3BA' }}
                                onClick={() => setShowEventsModal(true)}
                            >
                                Мои события
                            </button>
                        </div>
                    </div>

                    {showModal && (
                        <ModalCalendar 
                            onClose={() => setShowModal(false)} 
                            onCreateEvent={handleCreateEvent}
                        />
                    )}
                    {showEventsModal && (
                        <MyEventsModal 
                            onClose={() => setShowEventsModal(false)}
                            events={events}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    )}

                    {/* Календарь */}
                    <div className={styles.calendarContainer}>
                        <div className={styles.monthGrid}>
                            {/* Заголвки дней недели */}
                            <div className={styles.weekDays}>
                                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                                    <div key={index} className={styles.weekDay}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Сетка дней */}
                            <div className={styles.daysGrid}>
                                {getMonthDays().map((day, index) => (
                                    <div 
                                        key={index} 
                                        className={`${styles.dayCell} ${!day.isCurrentMonth ? styles.otherMonth : ''}`}
                                    >
                                        <div className={styles.dayNumber}>
                                            {day.date.getDate()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Компонент CalendarLittle */}
                        <div className={styles.upcomingEvents}>
                            <CalendarLittle 
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

