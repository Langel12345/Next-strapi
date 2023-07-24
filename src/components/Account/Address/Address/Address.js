
import {useState} from 'react';
import { Button,Icon } from 'semantic-ui-react';
import { BasicModal,ConfirmModal } from '@/components/Shared'
import styles from './Address.module.scss';
import { AddressFrom} from '../AddressFrom';
import { Address as AddressCtrl} from '@/api'
export  function Address(props) {
    const addresCtrl = new AddressCtrl();
    const {addressId, address,onReload} = props;
    const [showEdit, setshowEdit] = useState(false);
    const [showConfirm, setshowConfirm] = useState(false);
    const openCloseEdit =() => setshowEdit((prevState) => !prevState);
    const openCloseConfirm =() => setshowConfirm((prevState) => !prevState);
    const onDelete =async() =>{
        try {
            await addresCtrl.delete(addressId);
            onReload()
        } catch (error) {
            throw error
        }
    }
    return (
        <>
            <div className={styles.address}>
                <div>
                    <p className={styles.title}>{ address.title} </p>
                    <p className={styles.info}>{ address.name},
                    {address.address}, {address.state}, {address.city},{" "} {address.postal_code},
                    {address.phone}
                    </p>
                </div>
                <div className={styles.acctions}>
                    <Button primary icon>
                        <Icon name="pencil" onClick={openCloseEdit}/>
                    </Button>
                    <Button primary icon>
                        <Icon name="delete" onClick={openCloseConfirm} />
                    </Button>
                </div>
            </div> 
            <ConfirmModal 
                open={showConfirm}
                onCancel={openCloseConfirm}
                onConfirm={onDelete}
                content="¿Estas seguro de que deseas eliminar esta dirección?"
            />
            <BasicModal show={showEdit} onClose={openCloseEdit} title='Editar dirección'>
                <AddressFrom
                    onClose={openCloseEdit}
                    onReload={onReload} 
                    addressId={addressId} 
                    address={address} 
                />
            </BasicModal>
        </>
    )
}
