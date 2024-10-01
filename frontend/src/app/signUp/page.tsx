import Link from 'next/link';
import styles from './page.module.css';

export default function SignUp(){
    return(
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                <p className={styles.boldHello}>Регистрация</p>
                <span>Зарегистрируйтесь, чтобы начать пользоваться приложением</span>
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
                <div className={styles.inputPassword}>
                    <label className={styles.label}>Подтверждение пароля:</label>
                    <input type="password" className={styles.passwordInputBox} placeholder="********" id="password" />
                </div>
            </div>
            <Link href="" className={styles.signInButton}>Зарегистрироваться</Link>
            <div className={styles.signUpBox}>
                <span>Есть аккаунт?</span>
                <Link href="/signIn" className={styles.signUpText}>Войти в аккаунт</Link>
            </div>
        </div>
    )
}