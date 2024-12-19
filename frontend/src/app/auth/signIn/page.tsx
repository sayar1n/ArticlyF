"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import api from '@/app/utils/api';
import { handleApiError } from '@/app/utils/errorHandler';
import styles from './page.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();

  useEffect(() => {
    // Загружаем сохраненные email при монтировании
    const emails = JSON.parse(localStorage.getItem('savedEmails') || '[]');
    setSavedEmails(emails);

    // Добавляем обработчик клика вне выпадающего списка
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setShowDropdown(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setShowDropdown(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        // Сохраняем email в localStorage
        const updatedEmails = Array.from(new Set([...savedEmails, email]));
        localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
        
        login(response.data.access_token);
      }
    } catch (error: any) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signInBlock}>
      <div className={styles.formSection}>
        {/* Логотип */}
        <div className={styles.titleBlock}>
          <div className={styles.logo}>Articly</div>
          <span>Войдите в аккаунт, <br/>чтобы продолжить или зарегистрируйтесь</span>
        </div>
        {/* Форма входа */}
        <form onSubmit={handleSignIn}>
          <div className={styles.inputField}>
              {/* Поле ввода Email */}
              <div className={styles.inputEmail}>
                <label className={styles.label}>Почта:</label>
                <div className={styles.emailInputWrapper} ref={dropdownRef}>
                  <input
                    type="email"
                    className={styles.emailInputBox}
                    placeholder="email@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => setShowDropdown(true)}
                    required
                  />
                  {showDropdown && savedEmails.length > 0 && (
                    <div className={styles.emailDropdown}>
                      {savedEmails
                        .filter(savedEmail => savedEmail.includes(email))
                        .map((savedEmail, index) => (
                          <div
                            key={index}
                            className={styles.emailOption}
                            onClick={() => handleEmailSelect(savedEmail)}
                          >
                            {savedEmail}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Поле ввода Пароля */}
              <div className={styles.inputPassword}>
                <label className={styles.label}>Пароль:</label>
                <input
                  type="password"
                  className={styles.passwordInputBox}
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.resetPassContainer}>
                {/* Ссылка на сброс пароля */}
                <Link href="./passResetEmail" className={styles.resetPassText}>
                  Забыли пароль?
                </Link>
              </div>
            </div>

            {/* Отображение ошибки */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={styles.buttonContainer}>
            {/* Кнопка отправки формы */}
            <button type="submit" className={styles.signInButton} disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>

        {/* Ссылка на регистрацию */}
        <div className={styles.signUpBox}>
          <span>Нет аккаунта?</span>
          <Link href="/auth/signUp" className={styles.signUpText}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}