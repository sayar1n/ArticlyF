'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import SidebarMini from '../../components/SidebarMini/page';
import CalendarLittle from '../../components/CalendarLittle/page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Folder = {
    id: number;
    name: string;
};

export default function CalendarPageDay() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [folders, setFolders] = useState<Folder[]>([
        { id: 1, name: 'Все события' },
        { id: 2, name: 'Работа' },
        { id: 3, name: 'Дом' }
    ]);
    const [activeFilter, setActiveFilter] = useState<number>(1);
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const pathname = usePathname();

    // Функции для изменения даты
    const handlePrevDay = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 1);
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

    console.log('Styles:', styles);

    return (
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
                        className={`${styles.viewButton} ${pathname === '/calendarPageMonth' ? styles.activeView : ''}`}
                    >
                        Месяц
                    </Link>
                </div>
                
                <div className={styles.dateControls}>
                    <button 
                        className={styles.dateNav} 
                        onClick={handlePrevDay}
                    >
                        ←
                    </button>
                    <span className={styles.currentDate}>
                        {selectedDate.toLocaleDateString('ru-RU', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </span>
                    <button 
                        className={styles.dateNav} 
                        onClick={handleNextDay}
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
                </div>

                {/* Календарь */}
                <div className={styles.calendarContainer}>
                    {/* Обертка для синхронного скролла */}
                    <div className={styles.scrollWrapper}>
                        {/* Временная шкала */}
                        <div className={styles.timeScale}>
                            {Array.from({ length: 24 }, (_, i) => (
                                <div key={i} className={styles.timeSlot}>
                                    {`${i.toString().padStart(2, '0')}:00`}
                                </div>
                            ))}
                        </div>

                        {/* Сетка календаря */}
                        <div className={styles.calendarGrid}>
                            {Array.from({ length: 24 }, (_, i) => (
                                <div key={i} className={styles.hourSlot}>
                                    <div className={styles.halfHourMark}></div>
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
    );
}

