"use client"

import { useState, useEffect } from 'react';
import styles from "./page.module.scss"

interface ChatMessage {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function FeedbackSettings() {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [comment, setComment] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            text: 'Здравствуйте! я вы рыбов продаете?',
            isUser: false,
            timestamp: new Date()
        },
        {
            id: 2,
            text: 'Добрый день! Нет,просто показываю',
            isUser: true,
            timestamp: new Date()
        },
        {
            id: 3,
            text: 'Красивое :3',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [isFAQOpen, setIsFAQOpen] = useState(false);

    const faqList: FAQ[] = [
        {
            id: 1,
            question: "Испугался?",
            answer: "Бу, испугался? Не бойся! Я друг! Я тебя не обижу! Иди сюда, иди ко мне, сядь рядом со мной."
        },
        {
            id: 2,
            question: "Кто я?",
            answer: "Пока нет ответа"
        },
        {
            id: 3,
            question: "Когда же наконец-то стану счастливым?",
            answer: "Ответа нет...."
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Отправлено:', {
            message: feedbackMessage,
            comment,
            additionalInfo
        });
        // Очистка формы после отправки
        setFeedbackMessage('');
        setComment('');
        setAdditionalInfo('');
    };

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newMessage: ChatMessage = {
            id: chatMessages.length + 1,
            text: chatMessage.trim(),
            isUser: true,
            timestamp: new Date()
        };

        setChatMessages([...chatMessages, newMessage]);
        setChatMessage('');
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('Articly@gmail.com');
            // Можно добавить уведомление о успешном копировании
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const handleFAQ = () => {
        setIsFAQOpen(true);
    };

    // Эффект для блокировки скролла при открытии модальных окон
    useEffect(() => {
        if (isFAQOpen || isChatOpen) {
            // Блокируем скролл
            document.body.style.overflow = 'hidden';
            // Добавляем отступ равный ширине скроллбара, чтобы избежать прыжка контента
            document.body.style.paddingRight = 'var(--scrollbar-width)';
        } else {
            // Возвращаем скролл при закрытии
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        }

        // Очистка при размонтировании
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        };
    }, [isFAQOpen, isChatOpen]);

    // Добавляем обработчики для закрытия по клику вне модального окна
    const handleModalClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            if (isFAQOpen) setIsFAQOpen(false);
            if (isChatOpen) setIsChatOpen(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Обратная связь</h1>

            <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                <div className={styles.section}>
                    <h2>Сообщения</h2>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            placeholder="Сообщение..."
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Комментарии</h2>
                    <div className={styles.inputWrapper}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Комментарий...Комментарий..."
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Тех.Поддержка</h2>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            value="Articly@gmail.com"
                            readOnly
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Предложения/Сотрудничество</h2>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            value="Articly@gmail.com"
                            readOnly
                        />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Отправить
                    </button>
                </div>

                <div className={styles.chatActions}>
                    <button type="button" className={styles.chatButton} onClick={() => setIsChatOpen(true)}>
                        Чат со специалистом
                    </button>
                </div>
            </form>

            <div className={styles.bottomPanel}>
                <button
                    className={styles.bottomButton}
                    onClick={handleFAQ}
                >
                    Возможные вопросики
                </button>
                <button
                    className={styles.bottomButton}
                    onClick={copyEmail}
                >
                    Тех.поддержка: <span className={styles.email}>Articly@gmail.com</span>
                </button>
                <button
                    className={styles.bottomButton}
                    onClick={() => setIsChatOpen(true)}
                >
                    Чат с специалистом
                </button>
            </div>

            {isChatOpen && (
                <div className={styles.chatModal} onClick={handleModalClick}>
                    <div className={styles.chatContent}>
                        <div className={styles.chatHeader}>
                            <h3>Чат со специалистом</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsChatOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.chatMessages}>
                            {chatMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.supportMessage}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleChatSubmit} className={styles.chatInputForm}>
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="....."
                            />
                            <button type="submit">
                                <span>📎</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isFAQOpen && (
                <div className={styles.faqModal} onClick={handleModalClick}>
                    <div className={styles.faqContent}>
                        <div className={styles.faqHeader}>
                            <div className={styles.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Возможные вопросы..."
                                    className={styles.searchInput}
                                />
                                <button className={styles.filterButton}>
                                    <span>🔍</span>
                                </button>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsFAQOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className={styles.faqList}>
                            {faqList.map((faq) => (
                                <div key={faq.id} className={styles.faqItem}>
                                    <div className={styles.question}>
                                        {faq.question}
                                    </div>
                                    <div className={styles.answer}>
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
