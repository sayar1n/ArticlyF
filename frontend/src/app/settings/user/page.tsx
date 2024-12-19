import React from 'react';
import styles from './page.module.scss';

export default function UserSettings() {
    return (
        <div className={styles.container}>
            <h1>Настройки профиля</h1>
            
            <div className={styles['username-section']}>
                <div className={styles['username-section__title']}>
                    <h4>Имя пользователя</h4>
                    <p>Отображаемое имя</p>
                </div>
                <div className={styles['username-section__content']}>
                    <input 
                        type="text"
                        className={styles['username-section__input']}
                        placeholder="Имя пользователя"
                    />
                </div>
            </div>

            <div className={styles['user-avatar']}>
                <div className={styles['user-avatar__title']}>
                    <h4>Аватар</h4>
                    <p>Загрузите изображение</p>
                </div>
                <div className={styles['user-avatar__content']}>
                    <div className={styles['user-avatar__upload-area']}>
                        <img src="/images/profile_photo.svg" alt="Upload" />
                        <input 
                            type="file"
                            className={styles['user-avatar__input']}
                            accept="image/*"
                        />
                    </div>
                    <span className={styles['user-avatar__hint']}>
                        Рекомендуемый размер 200x200px
                    </span>
                </div>
            </div>

            <div className={styles['user-location']}>
                <div className={styles['user-location__title']}>
                    <h4>Местоположение</h4>
                    <p>Выберите ваш часовой пояс</p>
                </div>
                <div className={styles['user-location__content']}>
                    <select className={styles['user-location__select']}>
                        <option value="UTC+3">Москва (UTC+3)</option>
                        <option value="UTC+2">Калининград (UTC+2)</option>
                        <option value="UTC+4">Самара (UTC+4)</option>
                        <option value="UTC+5">Екатеринбург (UTC+5)</option>
                        <option value="UTC+6">Омск (UTC+6)</option>
                        <option value="UTC+7">Красноярск (UTC+7)</option>
                    </select>
                </div>
            </div>

            <div className={styles['user-status']}>
                <div className={styles['user-status__title']}>
                    <h4>Статус</h4>
                    <p>Добавьте статус профиля</p>
                </div>
                <div className={styles['user-status__content']}>
                    <input 
                        type="text"
                        className={styles['user-status__input']}
                        placeholder="Введите статус"
                    />
                </div>
            </div>

            <div className={styles['user-language']}>
                <div className={styles['user-language__title']}>
                    <h4>Язык</h4>
                    <p>Выберите язык интерфейса</p>
                </div>
                <div className={styles['user-language__content']}>
                    <select className={styles['user-language__select']}>
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>

            </div>

            <button className={styles['submit-button']}>
                Сохранить изменения
            </button>
        </div>
    );
}