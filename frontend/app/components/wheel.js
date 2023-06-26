import styles from './wheel.module.css'
import { redValues, blackValues, evenValues, oddValues } from './../utils'

export default function Wheel ({selected, setSelected, result, bid, possibleWin, confirmBid, contractBalance}) {
  return (
    <div className={styles.containerWheel}>
      <div className={styles.containerWheelImage}>
        <img src="roulette.png" className={styles.wheelImage} alt="" />
        <span className={`${styles.wheelResult} ${result === 0 ? styles.wheelResultZero : (redValues.includes(result) ? styles.wheelResultRed : styles.wheelResultBlack)}`}>{result}</span>
      </div>
      <div className={styles.infoBet}>
        <p>Selected:<br/>{selected ? selected : '-'}</p>
        <p>Bid:<br/>{bid} MATIC</p>
        <p>Contract Balance:<br/>{contractBalance} MATIC</p>
        <p>Possible Win:<br/>{possibleWin ? possibleWin : '0'} MATIC</p>
        { selected && possibleWin < contractBalance && (
          <button className={styles.bidButton} onClick={confirmBid}>Bid</button>
        )}
      </div>
    </div>
  )
}
