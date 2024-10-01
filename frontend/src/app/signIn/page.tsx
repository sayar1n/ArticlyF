import Link from 'next/link';
import styles from './page.module.css';

export default function SignIn(){
    return(
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                <p className={styles.boldHello}>С возвращением!</p>
                <p>Войдите в аккаунт, чтобы продолжить или зарегистрируйтесь</p>
            </div>
            <div className={styles.inputField}>
                <div className={styles.inputEmail}>
                    <label className={styles.label}>Почта:</label>
                    <input type="email" className={styles.emailInputBox} placeholder="email@example.com" id="email"/>
                </div>
                <div className={styles.inputPassword}>
                    <label className={styles.label}>Пароль:</label>
                    <input type="password" className={styles.passwordInputBox} placeholder="********" id="password" />
                </div>
                <Link href="/passReset" className={styles.resetPassText}>Забыли пароль?</Link>
            </div>
            <Link href="" className={styles.signInButton}>Войти</Link>
            <div className={styles.signUpBox}>
                <span>Нет аккаунта?</span>
                <Link href="/signUp" className={styles.signUpText}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}