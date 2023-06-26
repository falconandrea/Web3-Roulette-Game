import styles from './wheel.module.css'

export default function Wheel ({selected, setSelected, bid, possibleWin, confirmBid}) {
  return (
    <div className={styles.containerWheel}>
      <div className={styles.containerWheelImage}>
        <img src="roulette.png" className={styles.wheelImage} alt="" />
        <span className={`${styles.wheelResult} ${styles.zero}`}>5</span>
      </div>
      <div className={styles.infoBet}>
        <p>Selected:<br/>{selected ? selected : '-'}</p>
        <p>Bid:<br/>{bid} MATIC</p>
        <p>Possible Win:<br/>{possibleWin ? possibleWin : '-'} MATIC</p>
        { selected  && (
          <button className={styles.bidButton} ng-click={confirmBid}>Bid</button>
        )}
      </div>
    </div>
  )
}
