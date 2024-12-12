"use client";

import styles from './page.module.scss';
import { useState } from 'react';

export default function ModalCalendar() {
    const [selectedEmoji, setSelectedEmoji] = useState('❤');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const emojis = ['✎', '✏', '✐', '⚐', '⚑', '✓', '✔', '✗', '✘', '♡', '♥', '❤', '☆', '★', '✦', '✧'];

    return (
        <div className={styles.modalCalendar}>
            <div className={styles.emojiInputContainer}>
                <button
                    className={styles.emojiButton}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    {selectedEmoji}
                </button>

                {showEmojiPicker && (
                    <div className={styles.emojiPicker}>
                        {emojis.map((emoji, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedEmoji(emoji);
                                    setShowEmojiPicker(false);
                                }}
                                className={styles.emojiOption}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}

                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Событие"
                    autoFocus
                />

                <input
                    type="date"
                    className={styles.dateInput}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
        </div>
    );
}

