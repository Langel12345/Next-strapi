import { Container } from 'semantic-ui-react'
import styles from './Info.module.scss'

export  function Info(props) {
    const {game} = props;
    
  return (
    <Container className={styles.info}>
        <div className={styles.summary}>
            <p>{game.summary}</p>
        </div>
        <div className={styles.more}>
            <ul>
                <li>
                    <span>Fecha Lanzamiento : </span> {game.realaseDate}
                </li>
            </ul>
        </div>
    </Container>
  )
}
