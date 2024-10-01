import Link from 'next/link';
import styles from './page.module.css';

export default function SignIn(){
    return(
        <div className={styles.SignInBlock}>
            <div className={styles.logo}>Articly</div>
            <div className={styles.welcomeText}>
                {/* <p className={styles.boldHello}>С возвращением!</p> */}
                <p>Пожалуйста, введите Ваш новый пароль <br/> Данный пароль будет использован для входа в сервис</p>
            </div>
            <div className={styles.inputField}>
                <div className={styles.inputEmail}>
                    <label className={styles.label}>Новый пароль:</label>
                    <input type="password" className={styles.emailInputBox} placeholder="********" id="password"/>
                </div>
                <div className={styles.inputPassword}>
                    <label className={styles.label}>Подтверждение:</label>
                    <input type="password" className={styles.passwordInputBox} placeholder="********" id="password" />
                </div>
            </div>
            <Link href="" className={styles.signInButton}>Изменить пароль</Link>
            <div className={styles.signUpBox}>
                <Link href="/signIn" className={styles.signUpText}>Войти в аккаунт</Link>
            </div>
        </div>
    )
}