import Link from 'next/link';
import styles from './page.module.css';

export default function ResetEmailPage(){
    return(
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                <p className={styles.boldHello}>Восстановление пароля</p>
                <p>На указанную почту придет ссылка для восстановления</p>
            </div>
            <div className={styles.inputField}>
                <div className={styles.inputEmail}>
                    <label className={styles.label}>Почта:</label>
                    <input type="email" className={styles.emailInputBox} placeholder="email@example.com" id="email"/>
                    <button type="button" className={styles.submitButton}>Отправить</button>
                </div>
                <div className={styles.inputPassword}>
                    <label className={styles.label}>Код восстановления:</label>
                    <input type="password" className={styles.passwordInputBox} placeholder="********" id="password" />
                </div>
            </div>
            <Link href="/passResetPass" className={styles.signInButton}>Продолжить</Link>
            <div className={styles.signUpBox}>
                <Link href="/signIn" className={styles.signUpText}>Войти в аккаунт</Link>
            </div>
        </div>
    )
}