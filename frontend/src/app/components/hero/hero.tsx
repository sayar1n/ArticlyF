"use client"

import Image from 'next/image'
import styles from "./page.module.scss"

export default function Hero() {
    return (
        <div className={styles.heroContainer}>
            {/* Hero Section */}
            <section id="hero" className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Articly</h1>
                    <div className={styles.aboutText}>
                        <p>
                            Articly - это современный сервис для управления временем, который помогает
                            профессионалам и командам повысить продуктивность с помощью умных инструментов
                            планирования и искусственного интеллекта.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/hero-img.jpg"
                            alt="Hero image"
                            width={1200}
                            height={800}
                            className={styles.heroImage}
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2>Функционал</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureColumn}>
                            <div className={styles.featureCard}>
                                <h3>Умное планирование</h3>
                                <p>ИИ анализирует ваши задачи и предлагает оптимальное расписание</p>
                            </div>
                            <div className={styles.featureCard}>
                                <h3>Календарь</h3>
                                <p>Удобный календарь с возможностью синхронизации</p>
                            </div>
                        </div>
                        <div className={styles.featureColumn}>
                            <div className={styles.featureCard}>
                                <h3>Заметки</h3>
                                <p>Создавайте и организуйте ваши идеи и мысли</p>
                            </div>
                            <div className={styles.featureCard}>
                                <h3>Задачи</h3>
                                <p>Эффективное управление и отслеживание ваших задач</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2>Стоимость</h2>
                    <div className={styles.pricingGrid}>
                        <div className={styles.pricingCard}>
                            <div className={styles.pricingHeader}>
                                <h3>Базовый</h3>
                                <p className={styles.price}>Бесплатно</p>
                            </div>
                            <ul className={styles.pricingList}>
                                <li>Базовое планирование задач</li>
                                <li>Простой календарь</li>
                                <li>Основные заметки</li>
                                <li>1 проект</li>
                            </ul>
                            <button className={styles.pricingButton}>Выбрать план</button>
                        </div>
                        <div className={`${styles.pricingCard} ${styles.featured}`}>
                            <div className={styles.pricingHeader}>
                                <h3>Про</h3>
                                <p className={styles.price}>$9.99/мес</p>
                            </div>
                            <ul className={styles.pricingList}>
                                <li>Умное планирование с ИИ</li>
                                <li>Расширенный календарь</li>
                                <li>Продвинутые заметки</li>
                                <li>Неограниченные проекты</li>
                                <li>Приоритетная поддержка</li>
                            </ul>
                            <button className={styles.pricingButton}>Выбрать план</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section id="feedback" className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2>Обратная связь</h2>
                    <p className={styles.feedbackDescription}>
                        Мы ценим ваше мнение! Поделитесь своими идеями и предложениями
                        по улучшению сервиса, расскажите о проблемах или просто оставьте отзыв
                        о работе Articly.
                    </p>
                    <div className={styles.feedbackForm}>
                        <div className={styles.formGroup}>
                            <input type="email" placeholder="Ваш email" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea placeholder="Ваше сообщение" className={styles.textarea}></textarea>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.submitButton}>Отправить</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section id="support" className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2>Поддержка</h2>
                    <div className={styles.supportContent}>
                        <p>Нужна помощь? Наша команда поддержки всегда готова помочь вам!</p>
                        <div className={styles.supportOptions}>
                            <div className={styles.supportCard}>
                                <h3>Центр поддержки</h3>
                                <p>Посетите наш центр поддержки для получения подробной информации о работе с сервисом</p>
                                <a href="/HelpPage" className={styles.supportButton}>
                                    Перейти в центр поддержки
                                </a>
                            </div>
                            <div className={styles.supportCard}>
                                <h3>Контакты</h3>
                                <p>Свяжитесь с нами любым удобным способом</p>
                                <div className={styles.supportContacts}>
                                    <a href="mailto:support@articly.com" className={styles.supportLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        support@articly.com
                                    </a>
                                    <a href="tel:+1234567890" className={styles.supportLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-8.9-9-8.9v2c3.9 0 7 3.1 7 6.9z"/>
                                        </svg>
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
