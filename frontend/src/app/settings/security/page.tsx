"use client"

import styles from "./page.module.scss";

export default function SecuritySettings() {
    return (
        <form className={styles.container}>
            <h1>Управление аккаунтом</h1>

            <div className={styles.section}>
                <h2>Смена логина</h2>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="логин"
                    />
                    <div className={styles.status}>
                        <span className={styles.available}>Логин свободен</span>
                        <span className={styles.taken}>/Логин занят</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Смена пароля</h2>
                <div className={styles.passwordInputs}>
                    <input
                        type="password"
                        placeholder="Старый пароль"
                    />
                    <input
                        type="password"
                        placeholder="Новый пароль"
                    />
                    <input
                        type="password"
                        placeholder="Повторите новый пароль"
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h2>Аутентификация</h2>
            </div>

            <div className={styles.section}>
                <h2>Смена почты</h2>
                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        placeholder="example@example.com"
                    />
                    <div className={styles.status}>
                        <span className={styles.available}>Свободна</span>
                        <span className={styles.taken}>/Занята</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Язык и регион</h2>
                <div className={styles.locationInputs}>
                    <select defaultValue="Русский">
                        <option value="Русский">Русский</option>
                    </select>
                    <select defaultValue="Россия">
                        <option value="Россия">Россия</option>
                    </select>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Удаление аккаунта</h2>
                <p className={styles.deleteDescription}>
                    Очень много слов про удаление
                    Очень много слов про удаление
                    Очень много слов про удаление
                    Очень много слов про удаление
                </p>
                <button type="button" className={styles.deleteButton}>
                    Удалить аккаунт
                </button>
            </div>

            <button type="submit" className={styles.saveButton}>
                Сохранить изменения
            </button>
        </form>
    );
}