"use client";

import Link from 'next/link';
import styles from './page.module.css';
import axios from "axios";
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const api = axios.create({
        baseURL: 'http://localhost:8061',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
    });

    // Фуникция для обработки входа в аккаунт
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = new URLSearchParams();
        formData.append('username', email); // или используйте nickname, если бекенд ожидает его
        formData.append('password', password);

        try {
            const response = await api.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                // Успешный вход, перенаправляем на главную страницу или панель управления
                router.push('/dashboard');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.detail) {
                setError(error.response.data.detail);
            } else {
                setError('Ошибка входа. Пожалуйста, проверьте ваши данные и попробуйте снова.');
            }
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                <p className={styles.boldHello}>С возвращением!</p>
                <p>Войдите в аккаунт, чтобы продолжить или зарегистрируйтесь</p>
            </div>
            <form onSubmit={handleSignIn}>
                <div className={styles.inputField}>
                    <div className={styles.inputNickname}>
                        <label className={styles.label}>Никнейм:</label>
                        <input
                            type="text"
                            className={styles.nicknameInputBox}
                            placeholder="Ваш никнейм"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputEmail}>
                        <label className={styles.label}>Почта:</label>
                        <input
                            type="email"
                            className={styles.emailInputBox}
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputPassword}>
                        <label className={styles.label}>Пароль:</label>
                        <input
                            type="password"
                            className={styles.passwordInputBox}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link href="/passResetEmail" className={styles.resetPassText}>Забыли пароль?</Link>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={styles.signInButton}>Войти</button>
            </form>
            <div className={styles.signUpBox}>
                <span>Нет аккаунта?</span>
                <Link href="/signUp" className={styles.signUpText}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}