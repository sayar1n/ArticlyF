"use client"

import Image from 'next/image'
import styles from "./page.module.scss"

export default function Hero() {
    return (
        <div className={"hero-section"}>
            <h2 className={"hero-section_title"}>Приложение по администрированию времени</h2>
            <p className={"hero-section_description"}>Организовывайте ваше время при помощи Искуственного Интелекта встроенного</p>
            {/* <Image
                src="/images/hero-img.png"
                alt="Hero image"
                width={1920}  // укажите нужную ширину
                height={1080} // укажите нужную высоту
            /> */}
        </div>
    )
}
