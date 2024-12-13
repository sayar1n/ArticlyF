"use client";

import styles from './page.module.scss';
import { useState } from 'react';

export default function ModalCalendar() {
    const [selectedEmoji, setSelectedEmoji] = useState('❤');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [title, setTitle] = useState('Название');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTags, setSelectedTags] = useState<Array<{color: string, name: string}>>([]);
    const [showTagPicker, setShowTagPicker] = useState(false);
    const [newTagColor, setNewTagColor] = useState('#FF9898');
    const [newTagName, setNewTagName] = useState('');
    const [isTask, setIsTask] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [theme, setTheme] = useState('Работа');
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [newTheme, setNewTheme] = useState('');
    const [themes, setThemes] = useState(['Работа', 'Личное', 'Учеба']);

    const emojis = ['✎', '✏', '✐', '⚐', '⚑', '✓', '✔', '✗', '✘', '♡', '♥', '❤', '☆', '★', '✦', '✧'];
    const tagColors = [
        '#FF9898', '#98FF98', '#9898FF', '#FFFF98', 
        '#FF98FF', '#98FFFF', '#FFA07A', '#98FB98'
    ];

    const addNewTag = () => {
        if (newTagName.trim()) {
            setSelectedTags([...selectedTags, { color: newTagColor, name: newTagName }]);
            setNewTagName('');
            setShowTagPicker(false);
        }
    };

    return (
        <div className={styles.modalCalendar}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <button className={styles.emojiButton} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        {selectedEmoji}
                    </button>
                    {showEmojiPicker && (
                        <div className={styles.emojiPicker}>
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
                    />
                    {/* сделать рабочий календарь */}
                    <div className={styles.date}>27.12</div> 
                </div>

                <div className={styles.divider} />

                <div className={styles.timeSection}>
                    <div className={styles.timeLabel}>Время</div>
                    <div className={styles.timeInputs}>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className={styles.timeInput}
                        />
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className={styles.timeInput}
                        />
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
                            <div className={styles.tagPicker}>
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
                                                setNewTagColor(color);
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
                    <input
                        type="text"
                        value={theme}
                        readOnly
                        onClick={() => setShowThemePicker(!showThemePicker)}
                        className={styles.themeInput}
                    />
                    {showThemePicker && (
                        <div className={styles.themePicker}>
                            {themes.map((t, index) => (
                                <div key={index} className={styles.themeOption}>
                                    <span onClick={() => {
                                        setTheme(t);
                                        setShowThemePicker(false);
                                    }}>
                                        {t}
                                    </span>
                                    <button 
                                        className={styles.removeThemeButton}
                                        onClick={() => {
                                            const newThemes = themes.filter(theme => theme !== t);
                                            setThemes(newThemes);
                                            if (theme === t) {
                                                setTheme(newThemes[0] || '');
                                            }
                                        }}
                                    >
                                        ×
                                    </button>
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
                                        if (newTheme.trim()) {
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
                </div>

                <div className={styles.divider} />

                <div className={styles.descriptionSection}>
                    <div className={styles.sectionLabel}>Описание</div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.descriptionInput}
                    />
                </div>

                <div className={styles.divider} />

                <div className={styles.locationSection}>
                    <div className={styles.sectionLabel}>Локация</div>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.locationInput}
                        placeholder="Введите место или ссылку на карту"
                    />
                </div>

                <button className={styles.createButton}>Создать</button>
            </div>
        </div>
    );
}

