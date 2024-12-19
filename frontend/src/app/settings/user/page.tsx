"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { userApi } from '@/app/utils/api';
// import UploadIcon from '/public/tabler_photo-up.svg';
import styles from "./page.module.scss"

interface UserData {
    nickname: string;
    email: string;
    logo: string | null;
}

export default function UserSettings() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userApi.getUserData();
                setUserData(response.data);
                if (response.data.logo) {
                    setSelectedImage(response.data.logo);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Не удалось загрузить данные пользователя');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError('');

        if (file) {
            // Проверка размера файла (4MB = 4 * 1024 * 1024 bytes)
            if (file.size > 4 * 1024 * 1024) {
                setError('Размер файла не должен превышать 4MB');
                return;
            }

            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (imageFile) {
                formData.append('logo', imageFile);
            }
            // Добавьте другие поля формы
            formData.append('nickname', userData?.nickname || '');

            await userApi.updateUserData(formData);
            // Обработка успешного обновления
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Не удалось обновить данные');
        }
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className={styles['container']}>
            <h1>Настройки профиля</h1>

            <div className={styles['username-section']}>
                <div className={styles['username-section__title']}>
                    <h4>Имя пользователя</h4>
                    <p>Отображаемое имя</p>
                </div>
                <div className={styles['username-section__input']}>
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={userData?.nickname || ''}
                        onChange={(e) => setUserData(prev => ({
                            ...prev!,
                            nickname: e.target.value
                        }))}
                    />
                </div>
            </div>

            <div className={styles['user-avatar']}>
                <div className={styles['user-avatar__title']}>
                    <h4>Аватар</h4>
                </div>
                <div className={styles['user-avatar__content']}>
                    <div className={styles['user-avatar__upload-area']}>
                        {selectedImage ? (
                            <img src={selectedImage} alt="Preview" />
                        ) : (
                            <img src="/images/profile_photo.svg" alt="Upload" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles['user-avatar__input']}
                        />
                    </div>
                    {error && <p className={styles['user-avatar__error']}>{error}</p>}
                </div>
            </div>

            <div className={styles['user-location']}>
                <div className={styles['user-location__title']}>
                    <h4>Местоположение</h4>
                </div>
                <div className={styles['user-location__content']}>
                    <select className={styles['user-location__select']}>
                        <option value="UTC-12:00">(UTC-12:00) Линия перемены дат</option>
                        <option value="UTC-11:00">(UTC-11:00) Самоа, Ниуэ</option>
                        <option value="UTC-10:00">(UTC-10:00) Гавайи</option>
                        <option value="UTC-09:00">(UTC-09:00) Аляска</option>
                        <option value="UTC-08:00">(UTC-08:00) Тихоокеанское время (США и Канада)</option>
                        <option value="UTC-07:00">(UTC-07:00) Горное время (США и Канада)</option>
                        <option value="UTC-06:00">(UTC-06:00) Центральное время (США и Канада)</option>
                        <option value="UTC-05:00">(UTC-05:00) Восточное время (США и Канада)</option>
                        <option value="UTC-04:00">(UTC-04:00) Атлантическое время (Канада)</option>
                        <option value="UTC-03:00">(UTC-03:00) Буэнос-Айрес, Бразилия</option>
                        <option value="UTC-02:00">(UTC-02:00) Среднеатлантическое время</option>
                        <option value="UTC-01:00">(UTC-01:00) Азорские острова</option>
                        <option value="UTC+00:00">(UTC+00:00) Лондон, Дублин, Лиссабон</option>
                        <option value="UTC+01:00">(UTC+01:00) Берлин, Париж, Рим</option>
                        <option value="UTC+02:00">(UTC+02:00) Киев, Минск, Калининград</option>
                        <option value="UTC+03:00">(UTC+03:00) Москва, Санкт-Петербург</option>
                        <option value="UTC+04:00">(UTC+04:00) Баку, Ереван, Тбилиси</option>
                        <option value="UTC+05:00">(UTC+05:00) Екатеринбург, Исламабад</option>
                        <option value="UTC+06:00">(UTC+06:00) Астана, Омск</option>
                        <option value="UTC+07:00">(UTC+07:00) Красноярск, Бангкок</option>
                        <option value="UTC+08:00">(UTC+08:00) Пекин, Гонконг, Сингапур</option>
                        <option value="UTC+09:00">(UTC+09:00) Токио, Сеул, Якутск</option>
                        <option value="UTC+10:00">(UTC+10:00) Владивосток, Сидней</option>
                        <option value="UTC+11:00">(UTC+11:00) Магадан, Сахалин</option>
                        <option value="UTC+12:00">(UTC+12:00) Камчатка, Новая Зеландия</option>
                    </select>
                </div>
            </div>

            <div className={styles['user-status']}>
                <div className={styles['user-status__title']}>
                    <h4>Статус</h4>
                </div>
                <div className={styles['user-status__content']}>
                    <input
                        type="text"
                        maxLength={16}
                        className={styles['user-status__input']}
                        placeholder="Введите статус"
                    />
                </div>
            </div>

            <div className={styles['user-language']}>
                <div className={styles['user-language__title']}>
                    <h4>Язык</h4>
                </div>
                <div className={styles['user-language__content']}>
                    <select className={styles['user-language__select']}>
                        <option value="ru">Русский</option>
                        <option value="en">Английский</option>
                    </select>
                </div>
            </div>

            <button type="submit" className={styles['submit-button']}>
                Сохранить изменения
            </button>
        </form>
    );
}