

import { Container , Icon} from 'semantic-ui-react'
import{ map} from 'lodash';
import {Data} from './BarTruts.data'
import styles  from './BartTruts.module.scss'
export  function BarTruts() {
    return (
        <div className={styles.barTruts}>
            <Container className={styles.content}>
                {map(Data, (item) =>(
                    <div key={item.id} className={styles.block}>
                        <Icon name={item.icon} />
                        <div>
                            <h5>{item.title}</h5>
                            <span>{item.description}</span>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    )
}
