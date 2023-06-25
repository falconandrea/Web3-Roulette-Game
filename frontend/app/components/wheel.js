import styles from './wheel.module.css'

export default function Wheel ({selected, setSelected}) {
  return (
    <div className={styles.containerWheel}>
      <div class={styles.containerWheelImage}>
        <img src="roulette.png" className={styles.wheelImage} alt="" />
        <span className={`${styles.wheelResult} ${styles.zero}`}>5</span>
      </div>
    </div>
  )
}
