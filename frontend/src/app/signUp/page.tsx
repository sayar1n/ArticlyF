"use client";

import Link from 'next/link';
import styles from './page.module.css';
import axios from "axios";
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function SignUp(){
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [logo, setLogo] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const api = axios.create({
        baseURL: 'http://localhost:8061',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          setError('Пароли не совпадают.');
          return;
        }

        try {
            const response = await api.post('/register', {
              nickname,
              email,
              password,
              logo,
            });

            if (response.status === 200) {
              router.push('/passResetEmail');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.detail) {
              const detail = error.response.data.detail;
              if (Array.isArray(detail)) {
                const errorMessages = detail.map((err: any) => err.msg).join(', ');
                setError(errorMessages);
              } else {
                setError(detail);
              }
            } else {
              setError('Ошибка регистрации.');
            }
            console.error('Registration error:', error);
        }
    };

    return (
        <div className={styles.SignInBlock}>
          <div className={styles.logo}>Articly</div>
          <div className={styles.welcomeText}>
            <p className={styles.boldHello}>Регистрация</p>
            <span>Зарегистрируйтесь, чтобы начать пользоваться приложением</span>
          </div>

          <form onSubmit={handleRegister}>
            <div className={styles.inputField}>
              <div className={styles.inputNickname}>
                <label className={styles.label}>Никнейм:</label>
                <input
                  type="text"
                  className={styles.nicknameInputBox}
                  placeholder="Введите ваш никнейм"
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

              <div className={styles.inputPassword}>
                <label className={styles.label}>Подтверждение пароля:</label>
                <input
                  type="password"
                  className={styles.passwordInputBox}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputLogo}>
                <label className={styles.label}>URL логотипа:</label>
                <input
                  type="text"
                  className={styles.logoInputBox}
                  placeholder="https://example.com/your-logo.png"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" className={styles.signInButton}>
              Зарегистрироваться
            </button>
          </form>

          <div className={styles.signUpBox}>
            <span>Есть аккаунт?</span>
            <Link href="/signIn" className={styles.signUpText}>
              Войти в аккаунт
            </Link>
          </div>
        </div>
    );
}