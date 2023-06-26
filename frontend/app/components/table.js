import { useEffect } from 'react'
import styles from './table.module.css'

export default function Table({selected, setSelected}) {
  useEffect(() => {
    listenerButtons()
  },[])

  const listenerButtons = () => {
    const buttons = document.querySelectorAll(`.${styles.zeroItem}, .${styles.redItem}, .${styles.blackItem}, .${styles.dozItem}, .${styles.outsideSection}`)
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        setSelected(button.children[0].textContent)
      });
    });
  }

  return (
    <div className={styles.rouletteTable}>
      <div className={styles.containerTable}>
        <div className={styles.zeroItem}>
          <div className={styles.value}>0</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>1</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>2</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>3</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>4</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>5</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>6</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>7</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>8</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>9</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>10</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>11</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>12</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>13</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>14</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>15</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>16</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>17</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>18</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>19</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>20</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>21</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>22</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>23</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>24</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>25</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>26</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>27</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>28</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>29</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>30</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>31</div>
        </div>
        <div className={styles.redItem}>
          <div className={styles.value}>32</div>
        </div>
        <div className={styles.blackItem}>
          <div className={styles.value}>33</div>
        </div>
        <div className={`${styles.redItem} ${styles.lastRow}`}>
          <div className={styles.value}>34</div>
        </div>
        <div className={`${styles.blackItem} ${styles.lastRow}`}>
          <div className={styles.value}>35</div>
        </div>
        <div className={`${styles.redItem} ${styles.lastRow}`}>
          <div className={styles.value}>36</div>
        </div>
      </div>
      <div className={styles.containerSecond}>
        <div className={styles.dozItem}>
          <div>1st 12</div>
        </div>
        <div className={styles.dozItem}>
          <div>2nd 12</div>
        </div>
        <div className={styles.dozItem}>
          <div>3rd 12</div>
        </div>
      </div>
      <div className={styles.containerThird}>
        <div className={styles.outsideSection}>
          <div>1-18</div>
        </div>
        <div className={styles.outsideSection}>
          <div>EVEN</div>
        </div>
        <div className={styles.outsideSection}>
          <div><div className={styles.rhombRed}>Red</div></div>
        </div>
        <div className={styles.outsideSection}>
          <div><div className={styles.rhombBlack}>Black</div></div>
        </div>
        <div className={styles.outsideSection}>
          <div>ODD</div>
        </div>
        <div className={styles.outsideSection}>
          <div>19-36</div>
        </div>
      </div>
    </div>
  )
}
