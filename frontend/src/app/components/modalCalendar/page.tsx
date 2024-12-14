"use client";

import styles from './page.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import TimePicker from '../TimePicker/page';
import DatePicker from '../DatePicker/page';


interface ModalCalendarProps {
    onClose: () => void;
    onCreateEvent: (event: {
        id: string;
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        isFullDay: boolean;
        tagColor: string;
        emoji: string;
        showInCalendar: boolean;
        description?: string;
        location?: string;
        isTask: boolean;
        isImportant: boolean;
        theme: string;
    }) => void;
}



export default function ModalCalendar({ onClose, onCreateEvent }: ModalCalendarProps) {
    const [selectedEmoji, setSelectedEmoji] = useState('❤');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTags, setSelectedTags] = useState<Array<{color: string, name: string}>>([]);
    const [showTagPicker, setShowTagPicker] = useState(false);
    const [isTask, setIsTask] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [theme, setTheme] = useState('Общее');
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [newTheme, setNewTheme] = useState('');
    const [themes, setThemes] = useState(['Общее', 'Личное', 'Учеба']);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState('');
    const [showInCalendar, setShowInCalendar] = useState(true);

    const emojis = ['✎', '✏', '✐', '⚐', '⚑', '✓', '✔', '✗', '✘', '♡', '♥', '❤', '☆', '★', '✦', '✧'];
    const tagColors = [
        '#FF9898', '#98FF98', '#9898FF', '#FFFF98', 
        '#FF98FF', '#98FFFF', '#FFA07A', '#98FB98'
    ];

    const themePickerRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const tagPickerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside(themePickerRef, () => setShowThemePicker(false));
    useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
    useClickOutside(tagPickerRef, () => setShowTagPicker(false));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleCreateEvent = () => {
        // Валидация
        if (!title.trim()) {
            alert('Пожалуйста, введите название события');
            return;
        }
        if (!date) {
            alert('Пожалуйста, выберите дату');
            return;
        }

        // Если время не указано, устанавливаем событие на весь день
        const eventStartTime = startTime || '00:00';
        const eventEndTime = endTime || '23:59';

        // Создаем объект события
        const newEvent = {
            id: Date.now().toString(),
            title,
            date,
            startTime: eventStartTime,
            endTime: eventEndTime,
            isFullDay: !startTime || !endTime, // Флаг события на весь день
            tagColor: selectedTags[0]?.color || '#CCCCCC',
            emoji: selectedEmoji,
            showInCalendar,
            description,
            location,
            isTask,
            isImportant,
            theme
        };

        // Передаем событие родительскому компоненту
        onCreateEvent(newEvent);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalCalendar} ref={modalRef}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <button className={styles.emojiButton} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            {selectedEmoji}
                        </button>
                        {showEmojiPicker && (
                            <div ref={emojiPickerRef} className={styles.emojiPicker}>
                                {emojis.map((emoji, index) => (
                                    <button key={index} onClick={() => {
                                        setSelectedEmoji(emoji);
                                        setShowEmojiPicker(false);
                                    }} className={styles.emojiOption}>
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.titleInput}
                            placeholder="Название"
                        />
                        <div className={styles.dateContainer}>
                            <div 
                                className={styles.date}
                                onClick={() => setShowDatePicker(!showDatePicker)}
                            >
                                {date || 'дд.мм'}
                            </div>
                            {showDatePicker && (
                                <DatePicker
                                    value={date}
                                    onChange={(value) => {
                                        setDate(value);
                                        setShowDatePicker(false);
                                    }}
                                    onClose={() => setShowDatePicker(false)}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.dividerHeader} />

                    <div className={styles.timeSection}>
                        <div className={styles.timeLabel}>Время</div>
                        <div className={styles.timeInputs}>
                            <div className={styles.timeInputWrapper}>
                                <input
                                    type="text"
                                    value={startTime || '--:--'}
                                    onClick={() => setShowStartTimePicker(true)}
                                    readOnly
                                    className={styles.timeInput}
                                />
                                {showStartTimePicker && (
                                    <TimePicker
                                        value={startTime}
                                        onChange={(value) => setStartTime(value)}
                                        onClose={() => setShowStartTimePicker(false)}
                                    />
                                )}
                            </div>
                            <div className={styles.timeInputWrapper}>
                                <input
                                    type="text"
                                    value={endTime || '--:--'}
                                    onClick={() => setShowEndTimePicker(true)}
                                    readOnly
                                    className={styles.timeInput}
                                />
                                {showEndTimePicker && (
                                    <TimePicker
                                        value={endTime}
                                        onChange={(value) => setEndTime(value)}
                                        onClose={() => setShowEndTimePicker(false)}
                                    />
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.tagSection}>
                            <div className={styles.tagLabel}>Тэг</div>
                            <div className={styles.selectedTags}>
                                {selectedTags.map((tag, index) => (
                                    <div 
                                        key={index} 
                                        className={styles.tag}
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.name}
                                        <button 
                                            className={styles.removeTag}
                                            onClick={() => {
                                                const newTags = [...selectedTags];
                                                newTags.splice(index, 1);
                                                setSelectedTags(newTags);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.addTagButton} onClick={() => setShowTagPicker(!showTagPicker)}>+</button>
                            
                            {showTagPicker && (
                                <div ref={tagPickerRef} className={styles.tagPicker}>
                                    <div className={styles.colorPicker}>
                                        <button 
                                            className={styles.colorOption}
                                            onClick={() => {
                                                setSelectedTags([]);
                                                setShowTagPicker(false);
                                            }}
                                        >
                                            <span className={styles.noTagIcon}>✕</span>
                                        </button>
                                        {tagColors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={styles.colorOption}
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    setSelectedTags([{ color, name: '' }]);
                                                    setShowTagPicker(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.themeSection}>
                        <div className={styles.themeLabel}>Тема</div>
                        <div
                            className={styles.themeInput}
                            onClick={() => setShowThemePicker(!showThemePicker)}
                        >
                            {theme}
                            <span className={styles.themeArrow}>▼</span>
                        </div>
                        {showThemePicker && (
                            <div ref={themePickerRef} className={styles.themePicker}>
                                {themes.map((t, index) => (
                                    <div key={index} className={styles.themeOption}>
                                        <span onClick={() => {
                                            setTheme(t);
                                            setShowThemePicker(false);
                                        }}>
                                            {t}
                                        </span>
                                        {t !== 'Общее' && (
                                            <button 
                                                className={styles.removeThemeButton}
                                                onClick={() => {
                                                    const newThemes = themes.filter(theme => theme !== t);
                                                    setThemes(newThemes);
                                                    if (theme === t) {
                                                        setTheme('Общее');
                                                    }
                                                }}
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div className={styles.addThemeOption}>
                                    <input
                                        type="text"
                                        value={newTheme}
                                        onChange={(e) => setNewTheme(e.target.value)}
                                        placeholder="Новая тема"
                                        className={styles.addThemeInput}
                                    />
                                    <button 
                                        className={styles.addThemeButton}
                                        onClick={() => {
                                            if (newTheme.trim() && !themes.includes(newTheme.trim())) {
                                                setThemes([...themes, newTheme.trim()]);
                                                setNewTheme('');
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.checkboxSection}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={isTask}
                                onChange={(e) => setIsTask(e.target.checked)}
                            />
                            Сделать задачей
                        </label>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={isImportant}
                                onChange={(e) => setIsImportant(e.target.checked)}
                            />
                            Добавить в важное
                        </label>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={showInCalendar}
                                onChange={(e) => setShowInCalendar(e.target.checked)}
                            />
                            Отобразить в календаре
                        </label>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.descriptionSection}>
                        <div className={styles.sectionLabel}>Описание</div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.descriptionInput}
                            placeholder="Описание события"
                        />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.locationSection}>
                        <div className={styles.sectionLabel}>Локация</div>
                        <textarea
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={styles.locationInput}
                            placeholder="Введите место или ссылку на карту"
                        />
                    </div>

                    <button className={styles.createButton} onClick={handleCreateEvent}>Создать</button>
                </div>
            </div>
        </div>
    );
}

