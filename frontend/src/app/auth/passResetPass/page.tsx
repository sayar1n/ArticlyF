import Link from 'next/link';
import styles from './page.module.scss';

export default function ResetPassPage(){
    return(
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                <p className={styles.boldHello}>Восстановление пароля</p>
                <p>Пожалуйста, введите Ваш новый пароль</p>
            </div>
            <div className={styles.inputField}>
                <div className={styles.inputEmail}>
                    <label className={styles.label}>Новый пароль:</label>
                    <input type="password" className={styles.emailInputBox} placeholder="********" id="password"/>
                </div>
                <div className={styles.inputPassword}>
                    <label className={styles.label}>Подтверждение пароля:</label>
                    <input type="password" className={styles.passwordInputBox} placeholder="********" id="password" />
                </div>
            </div>
            <Link href="/" className={styles.signInButton}>Изменить пароль</Link>
            <div className={styles.signUpBox}>
                <Link href="./signIn" className={styles.signUpText}>Войти в аккаунт</Link>
            </div>
        </div>
    )
}