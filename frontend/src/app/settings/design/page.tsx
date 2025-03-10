"use client"

import { useState, useEffect } from 'react';
import styles from "./page.module.scss"
import api from '@/app/utils/api';

interface ThemeOption {
    id: string;
    name: string;
    value: string;
}

interface ColorScheme {
    id: string;
    name: string;
    colors: string[];
}

interface ThemeSettings {
    theme: string;
    color: string;
    scheme: string;
    fontSize: number;
}

export default function DesignSettings() {
    const [selectedTheme, setSelectedTheme] = useState('system');
    const [selectedColor, setSelectedColor] = useState('default');
    const [selectedScheme, setSelectedScheme] = useState('green');
    const [fontSize, setFontSize] = useState(16);
    const [loading, setLoading] = useState(false);

    // Загрузка сохраненных настроек при монтировании компонента
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const response = await api.get('/user/theme-settings');
                const settings = response.data;
                setSelectedTheme(settings.theme || 'system');
                setSelectedColor(settings.color || 'default');
                setSelectedScheme(settings.scheme || 'green');
                setFontSize(settings.fontSize || 16);
                // Применяем тему
                document.documentElement.setAttribute('data-theme', settings.theme || 'system');
            } catch (error) {
                console.error('Ошибка при загрузке настроек:', error);
            }
        };
        loadSettings();
    }, []);

    const themeOptions: ThemeOption[] = [
        { id: 'system', name: 'Системная', value: 'system' },
        { id: 'light', name: 'Светлая', value: 'light' },
        { id: 'dark', name: 'Темная', value: 'dark' }
    ];

    const colorOptions: ThemeOption[] = [
        { id: 'default', name: 'По умолчанию', value: 'default' },
        { id: 'blue', name: 'Синяя', value: 'blue' },
        { id: 'green', name: 'Зеленая', value: 'green' },
        { id: 'purple', name: 'Фиолетовая', value: 'purple' }
    ];

    const colorSchemes: ColorScheme[] = [
        {
            id: 'green',
            name: 'Зелёный',
            colors: ['#000000', '#1A4D2E', '#45B26B', '#E8F5E9']
        },
        {
            id: 'burgundy',
            name: 'Бордовый',
            colors: ['#2C0B0E', '#842029', '#DC3545', '#F8D7DA']
        },
        {
            id: 'gray',
            name: 'Серый',
            colors: ['#212529', '#343A40', '#45B26B', '#FFFFFF']
        },
        {
            id: 'blue',
            name: 'Голубой',
            colors: ['#343A40', '#495057', '#CED4DA', '#F8F9FA']
        }
    ];

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setFontSize(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Сохраняем настройки на бэкенде
            await api.post('/user/theme-settings', {
                theme: selectedTheme,
                color: selectedColor,
                scheme: selectedScheme,
                fontSize
            });

            // Применяем настройки
            document.documentElement.setAttribute('data-theme', selectedTheme);
            document.documentElement.style.fontSize = `${fontSize}px`;
            document.documentElement.setAttribute('data-color-scheme', selectedScheme);
            document.documentElement.setAttribute('data-accent-color', selectedColor);

        } catch (error) {
            console.error('Ошибка при сохранении настроек:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleThemeChange = (value: string) => {
        setSelectedTheme(value);
        document.documentElement.setAttribute('data-theme', value);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h1>Дизайн</h1>
            
            <div className={styles.section}>
                <h2>Тема</h2>
                <div className={styles.optionsGrid}>
                    {themeOptions.map((option) => (
                        <label
                            key={option.id}
                            className={`${styles.themeOption} ${selectedTheme === option.value ? styles.selected : ''}`}
                        >
                            <input
                                type="radio"
                                name="theme"
                                value={option.value}
                                checked={selectedTheme === option.value}
                                onChange={(e) => handleThemeChange(e.target.value)}
                            />
                            <span className={styles.optionContent}>
                                <span className={styles.optionName}>{option.name}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2>Акцентный цвет</h2>
                <div className={styles.optionsGrid}>
                    {colorOptions.map((option) => (
                        <label
                            key={option.id}
                            className={`${styles.colorOption} ${selectedColor === option.value ? styles.selected : ''}`}
                        >
                            <input
                                type="radio"
                                name="color"
                                value={option.value}
                                checked={selectedColor === option.value}
                                onChange={(e) => setSelectedColor(e.target.value)}
                            />
                            <span className={styles.optionContent}>
                                <span className={`${styles.colorPreview} ${styles[option.value]}`}></span>
                                <span className={styles.optionName}>{option.name}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2>Цвет контрастности</h2>
                <div className={styles.schemesGrid}>
                    {colorSchemes.map((scheme) => (
                        <label
                            key={scheme.id}
                            className={`${styles.schemeOption} ${selectedScheme === scheme.id ? styles.selected : ''}`}
                        >
                            <input
                                type="radio"
                                name="scheme"
                                value={scheme.id}
                                checked={selectedScheme === scheme.id}
                                onChange={(e) => setSelectedScheme(e.target.value)}
                            />
                            <span className={styles.schemeContent}>
                                <span className={styles.schemeName}>{scheme.name}</span>
                                <div className={styles.colorBoxes}>
                                    {scheme.colors.map((color, index) => (
                                        <span
                                            key={index}
                                            className={styles.colorBox}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2>Размер текста</h2>
                <div className={styles.fontSizeControl}>
                    <input
                        type="range"
                        min="12"
                        max="24"
                        step="2"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                    />
                    <span className={styles.fontSizeValue}>{fontSize}</span>
                </div>
                <div className={styles.fontSizePreview}>
                    AaBbCc..
                </div>
            </div>

            <button
                type="submit"
                className={styles['submit-button']}
                disabled={loading}
            >
                {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
        </form>
    );
}