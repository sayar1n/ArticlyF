"use client"

import styles from "./page.module.scss"

interface HelpItem {
    title: string;
    description: string;
}

export default function HelpPage() {
    const gettingStarted: HelpItem[] = [
        {
            title: "Начало работы с Articly",
            description: "Зарегистрируйтесь или войдите в аккаунт, чтобы получить доступ к планированию задач, календарю и другим инструментам управления временем."
        },
        {
            title: "Настройка рабочего пространства",
            description: "Настройте свой профиль, часовой пояс и предпочтительное время для задач в разделе настроек."
        },
        {
            title: "Персонализация интерфейса",
            description: "Выберите удобную для вас тему оформления (светлую или тёмную), настройте цветовую схему и размер шрифта в разделе «Дизайн»."
        },
    ];

    const calendarAndTasks: HelpItem[] = [
        {
            title: "Работа с календарём",
            description: "Используйте календарь для планирования встреч, дедлайнов и важных событий. Переключайтесь между дневным, недельным и месячным видом."
        },
        {
            title: "Создание задач",
            description: "Добавляйте новые задачи, указывая название, описание, приоритет, дедлайн и категорию. Используйте быстрое добавление через кнопку «+»."
        },
        {
            title: "Управление задачами",
            description: "Отмечайте выполненные задачи, устанавливайте напоминания и группируйте задачи по проектам или категориям."
        },
        {
            title: "Повторяющиеся задачи",
            description: "Создавайте регулярные задачи с нужной периодичностью: ежедневные, еженедельные или ежемесячные."
        },
        {
            title: "Приоритизация",
            description: "Используйте систему приоритетов для организации задач по важности и срочности."
        },
    ];

    const productivity: HelpItem[] = [
        {
            title: "Отслеживание времени",
            description: "Используйте встроенный таймер для отслеживания времени, потраченного на задачи. Анализируйте свою продуктивность."
        },
        {
            title: "Статистика и отчёты",
            description: "Просматривайте детальную статистику по выполненным задачам, затраченному времени и продуктивности в разных категориях."
        },
        {
            title: "Фокус-режим",
            description: "Включайте режим фокусировки для концентрации на важных задачах без отвлечений."
        },
        {
            title: "Уведомления",
            description: "Настройте уведомления о предстоящих задачах, дедлайнах и важных событиях."
        },
    ];


    const renderHelpItems = (items: HelpItem[]) => {
        return items.map((item, index) => (
            <div key={index} className={styles.helpItem}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        ));
    };

    return (
        <div className={styles.container}>
            <h1>Поддержка</h1>

            <div className={styles.helpSection}>
                <h2>Начало работы</h2>
                {renderHelpItems(gettingStarted)}
            </div>

            <div className={styles.helpSection}>
                <h2>Календарь и управление задачами</h2>
                {renderHelpItems(calendarAndTasks)}
            </div>

            <div className={styles.helpSection}>
                <h2>Продуктивность</h2>
                {renderHelpItems(productivity)}
            </div>

        </div>
    );
}