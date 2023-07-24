
import {useState} from 'react';
import { Button } from 'semantic-ui-react';
import { BasicModal } from '@/components/Shared';
import { AddressFrom } from '../AddressFrom';
import styles  from './AddAddress.module.scss'
export  function AddAddress(props) {
    const{ onReload} = props;
    const [show, setShow] = useState(false);
    const onOpenClose= () => setShow((prevState) => !prevState)
    return (
        <>
            <Button primary className={styles.addBtn} onClick={onOpenClose} >Crear</Button>

            <BasicModal show={show} onClose={onOpenClose} title={"Nueva dirección"}>
                <AddressFrom  onClose={onOpenClose} onReload ={onReload}/>
            </BasicModal>
        </>
    )
}
