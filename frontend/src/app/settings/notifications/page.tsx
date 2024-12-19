"use client"

import { useState } from 'react';
import styles from "./page.module.scss"

export default function NotificationsSettings() {
    const [notifications, setNotifications] = useState({
        projectChanges: true,
        messages: true,
        comments: true,
        requests: true,
        deviceLogin: true,
        serviceUpdates: true,
        newsletter: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь будет логика сохранения настроек уведомлений
        console.log('Сохранено:', notifications);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h1>Уведомления</h1>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Изменения в проекте</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.projectChanges}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                projectChanges: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Сообщения</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.messages}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                messages: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Комментарии</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.comments}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                comments: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Запросы</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.requests}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                requests: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Вход с устройства</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.deviceLogin}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                deviceLogin: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Обновления сервиса</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.serviceUpdates}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                serviceUpdates: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles['notification-section']}>
                <div className={styles['notification-section__title']}>
                    <h4>Рассылка</h4>
                </div>
                <div className={styles['notification-section__content']}>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notifications.newsletter}
                            onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                newsletter: e.target.checked
                            }))}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <button type="submit" className={styles['submit-button']}>
                Сохранить изменения
            </button>
        </form>
    );
}
