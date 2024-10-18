import styles from "./page.module.scss"

export default function Error() {
    return(
        <div className={styles.mainBox}>
            <div className={styles.logo}>Articly</div>
            <p className={styles.error}> Произошли технические шоколадки...</p>
            <p className={styles.error}>Мы их уже съедаем ツ</p>
        </div>
    )
}