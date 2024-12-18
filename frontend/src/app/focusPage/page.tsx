'use client';

import { useState, useEffect, useRef } from 'react';
import styles from "./page.module.scss";
import SidebarFull from '../components/SidebarFull/page';

export default function FocusPage() {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);
    const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const wasLongPress = useRef<boolean>(false);
    const [coins, setCoins] = useState<number>(10); // начальный баланс
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [recentSessions, setRecentSessions] = useState<Array<{minutes: number, coins: number}>>([]);
    const [accumulatedTime, setAccumulatedTime] = useState<number>(0);
    const lastRunningTime = useRef<number>(0);
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
    const [selectedCat, setSelectedCat] = useState<string>("./images/cat_focus.png");
    const extendedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isPressedRef = useRef(false);

    const shopItems = [
        { id: 1, image: "./images/focus_dog.jpg", price: 10 },
        { id: 2, image: "./images/focus_parrot.jpg", price: 10 },
        { id: 3, image: "./images/focus_punny.jpg", price: 10 }
    ];

    const handleBuyCat = (image: string, price: number) => {
        if (coins >= price) {
            setCoins(prev => prev - price);
            setSelectedCat(image);
            setIsShopOpen(false);
        }
    };

    useEffect(() => {
        // Запрашиваем разрешение на уведомления при монтировании
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }
        }
    }, []);

    const sendNotification = () => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === "granted") {
                new Notification("Время вышло!", {
                    body: "Таймер завершил отсчет.",
                    icon: "./images/cat_focus.png"
                });
            }
        }
    };

    const startTimer = () => {
        if (timeRemaining > 0) {
            setIsRunning(true);
            lastRunningTime.current = timeRemaining; // Сохраняем начальное время

            if (countdownRef.current) {
                clearInterval(countdownRef.current);
            }

            countdownRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        sendNotification();
                        if (countdownRef.current) {
                            clearInterval(countdownRef.current);
                        }

                        // Подсчитываем все время, включая текущую сессию
                        const timeSpent = lastRunningTime.current;
                        const totalSeconds = accumulatedTime + timeSpent;
                        const totalMinutes = Math.floor(totalSeconds / 60);

                        if (totalMinutes > 0) {
                            const earnedCoins = calculateCoins(totalMinutes);
                            setCoins(prev => prev + earnedCoins);

                            setRecentSessions(prev => [{
                                minutes: totalMinutes,
                                coins: earnedCoins
                            }, ...prev].slice(0, 10));
                        }

                        // Сбрасываем аккумулированное время
                        setAccumulatedTime(0);
                        lastRunningTime.current = 0;

                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    const handlePlusStart = (event: React.MouseEvent) => {
        if (event.button !== 0) return;
        
        isPressedRef.current = true;
        wasLongPress.current = false;

        pressTimeoutRef.current = setTimeout(() => {
            if (!isPressedRef.current) return;
            
            wasLongPress.current = true;
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    const newMinutes = Math.floor(prev / 60) + 5;
                    const hours = Math.floor(newMinutes / 60);
                    if (hours >= 99) return prev;
                    return newMinutes * 60;
                });
            }, 400);
        }, 500);

        extendedTimeoutRef.current = setTimeout(() => {
            if (!isPressedRef.current) return;
            
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    const newMinutes = Math.floor(prev / 60) + 10;
                    const hours = Math.floor(newMinutes / 60);
                    if (hours >= 99) return prev;
                    return newMinutes * 60;
                });
            }, 400);
        }, 3000);
    };

    const handleMinusStart = (event: React.MouseEvent) => {
        if (event.button !== 0) return;
        
        isPressedRef.current = true;
        wasLongPress.current = false;

        pressTimeoutRef.current = setTimeout(() => {
            if (!isPressedRef.current) return;
            
            wasLongPress.current = true;
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    const newMinutes = Math.floor(prev / 60) - 5;
                    return Math.max(0, newMinutes * 60);
                });
            }, 400);
        }, 500);

        extendedTimeoutRef.current = setTimeout(() => {
            if (!isPressedRef.current) return;
            
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    const newMinutes = Math.floor(prev / 60) - 10;
                    return Math.max(0, newMinutes * 60);
                });
            }, 400);
        }, 3000);
    };

    const handlePressEnd = (e: React.MouseEvent) => {
        // Если кнопка не была нажата изначально, игнорируем
        if (!isPressedRef.current) return;
        
        isPressedRef.current = false;

        if (pressTimeoutRef.current) {
            clearTimeout(pressTimeoutRef.current);
            pressTimeoutRef.current = null;
        }

        if (extendedTimeoutRef.current) {
            clearTimeout(extendedTimeoutRef.current);
            extendedTimeoutRef.current = null;
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Если это было короткое нажатие
        if (!wasLongPress.current) {
            if (e.currentTarget.textContent === '+') {
                setTimeRemaining(prev => {
                    const newMinutes = Math.floor(prev / 60) + 1;
                    const hours = Math.floor(newMinutes / 60);
                    if (hours >= 99) return prev;
                    return newMinutes * 60;
                });
            } else if (e.currentTarget.textContent === '-') {
                setTimeRemaining(prev => {
                    const newMinutes = Math.floor(prev / 60) - 1;
                    return Math.max(0, newMinutes * 60);
                });
            }
        }

        wasLongPress.current = false;
    };

    const calculateCoins = (minutes: number) => {
        // Конвертируем минуты в секунды и делим на 30 секунд
        return Math.floor((minutes * 60) / 30) * 2;
    };

    const handleStartPauseClick = () => {
        if (timeRemaining > 0) {
            if (isRunning) {
                // При паузе сохраняем накопленное время
                const timeSpent = lastRunningTime.current - timeRemaining;
                setAccumulatedTime(prev => prev + timeSpent);

                if (countdownRef.current) {
                    clearInterval(countdownRef.current);
                }
                setIsRunning(false);
            } else {
                lastRunningTime.current = timeRemaining;
                startTimer();
            }
        }
    };

    // Добавим функцию для подсчета пройденных 30-секундных интервалов
    const calculateCompletedIntervals = (totalSeconds: number) => {
        return Math.floor(totalSeconds / 30);
    };

    // Изменим handleResetCancelClick
    const handleResetCancelClick = () => {
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
        }

        if (isRunning || accumulatedTime > 0) {
            // одсчитываем финальное время
            const finalAccumulatedSeconds = isRunning
                ? accumulatedTime + (lastRunningTime.current - timeRemaining)
                : accumulatedTime;

            // Подсчитываем количество полных 30-секундных интервалов
            const completedIntervals = calculateCompletedIntervals(finalAccumulatedSeconds);

            if (completedIntervals > 0) {
                // За каждые 30 секунд начисляем 2 монеты
                const earnedCoins = completedIntervals * 2;
                setCoins(prev => prev + earnedCoins);

                // Добавляем сессию в историю (конвертируем секунды в минуты для отображения)
                setRecentSessions(prev => [{
                    minutes: Math.floor(finalAccumulatedSeconds / 60),
                    coins: earnedCoins
                }, ...prev].slice(0, 10));
            }
        }

        setIsRunning(false);
        setTimeRemaining(0);
        setAccumulatedTime(0);
        lastRunningTime.current = 0;
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    };

    // Формирование времени для отображения
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    // Добавим сохранение состояния при перезагрузке
    useEffect(() => {
        // Сохраняем состояние каждую секунду, если таймер запущен
        let saveInterval: NodeJS.Timeout | null = null;

        if (isRunning) {
            saveInterval = setInterval(() => {
                const currentState = {
                    timeRemaining,
                    accumulatedTime,
                    lastRunningTime: lastRunningTime.current,
                    startTime: Date.now()
                };
                localStorage.setItem('timerState', JSON.stringify(currentState));
            }, 1000);
        }

        return () => {
            if (saveInterval) {
                clearInterval(saveInterval);
            }
        };
    }, [isRunning, timeRemaining, accumulatedTime]);

    // Восстанавливаем состояние при загрузке страницы
    useEffect(() => {
        const savedState = localStorage.getItem('timerState');
        if (savedState) {
            const state = JSON.parse(savedState);
            const elapsedTime = Math.floor((Date.now() - state.startTime) / 1000);
            const totalSeconds = state.accumulatedTime + elapsedTime;

            // Проверяем, были ли пройдены 30-секундные интервалы
            const completedIntervals = calculateCompletedIntervals(totalSeconds);

            if (completedIntervals > 0) {
                const earnedCoins = completedIntervals * 2;
                setCoins(prev => prev + earnedCoins);

                setRecentSessions(prev => [{
                    minutes: Math.floor(totalSeconds / 60),
                    coins: earnedCoins
                }, ...prev].slice(0, 10));
            }

            // Очищаем сохраненное состояние
            localStorage.removeItem('timerState');
        }
    }, []);

    // Добавим константу для изначального изображения
    const DEFAULT_CAT_IMAGE = "./images/cat_focus.png";

    return (
        <div className={styles.container}>
            <SidebarFull />
            <div className={styles.shopContainer}>
                <div className={styles.headerRow}>
                    <div className={styles.shopHeader} onClick={() => setIsShopOpen(true)}>
                        <span>Магазин</span>
                        <img
                            src="./images/focus_cart.svg"
                            alt="Shop"
                            className={styles.headerIcon}
                        />
                    </div>
                    <div className={styles.coinsHeader}>
                        <span>Макетоны</span>
                        <div className={styles.coinsBalance}>
                            <span>{coins}</span>
                            <img
                                src="./images/focus_money.svg"
                                alt="Coins"
                                className={styles.coinIcon}
                            />
                        </div>
                    </div>
                </div>

                <div className={`${styles.recentContainer} ${isCollapsed ? styles.collapsed : ''}`}>
                    <div className={styles.recentHeader}>
                        <button
                            className={styles.toggleButton}
                            onClick={handleToggleCollapse}
                        >
                            <span>{isCollapsed ? '≡' : '≡'}</span>
                        </button>
                        <span>Недавние</span>
                    </div>
                    <div className={styles.recentList}>
                        {recentSessions.map((session, index) => (
                            <div key={index} className={styles.recentItem}>
                                <span>{session.minutes} мин</span>
                                <div className={styles.recentReward}>
                                    <span>{session.coins}</span>
                                    <img
                                        src="./images/focus_money.svg"
                                        alt="Coins"
                                        className={styles.smallCoinIcon}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <img
                src={selectedCat}
                alt="Focus Cat"
                className={styles.catImage}
            />

            <div className={styles.timerContainer}>
                <button
                    className={styles.controlButton}
                    onMouseDown={handleMinusStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                >
                    <span>-</span>
                </button>

                <div className={styles.timeDisplay}>
                    <span>{hours.toString().padStart(2, '0')}</span>
                    <span className={styles.separator}>:</span>
                    <span>{minutes.toString().padStart(2, '0')}</span>
                    <span className={styles.separator}>:</span>
                    <span>{seconds.toString().padStart(2, '0')}</span>
                </div>

                <button
                    className={styles.controlButton}
                    onMouseDown={handlePlusStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                >
                    <span>+</span>
                </button>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.actionButton}
                    onClick={handleStartPauseClick}
                >
                    {isRunning ? 'Пауза' : 'Старт'}
                </button>

                <button
                    className={styles.actionButton}
                    onClick={handleResetCancelClick}
                >
                    {isRunning ? 'Отмена' : 'Сброс'}
                </button>
            </div>

            {isShopOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsShopOpen(false)}
                        >
                            ✕
                        </button>
                        <h2>Магазин</h2>
                        <div className={styles.shopItems}>
                            {shopItems.map(item => (
                                <div key={item.id} className={styles.shopItem}>
                                    <img
                                        src={item.image}
                                        alt={`Cat ${item.id}`}
                                        className={styles.shopItemImage}
                                    />
                                    <button
                                        className={styles.buyButton}
                                        onClick={() => handleBuyCat(item.image, item.price)}
                                        disabled={coins < item.price}
                                    >
                                        <span>{item.price}</span>
                                        <img
                                            src="./images/focus_money.svg"
                                            alt="Coins"
                                            className={styles.smallCoinIcon}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            className={styles.resetButton}
                            onClick={() => {
                                setSelectedCat(DEFAULT_CAT_IMAGE);
                                setIsShopOpen(false);
                            }}
                        >
                            Вернуть кота
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
