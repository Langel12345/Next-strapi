import { useState, useEffect} from 'react';
import { Address as AddressCtrl } from '@/api';
import { map } from 'lodash';
import styles from './ListAddress.module.scss';
import { useAuth } from '@/hooks';
import {Address} from '../Address';
const addressCtrl = new AddressCtrl();
export function ListAddress(props) {
    const{ reaload ,onReload}= props;
    const [addesses, setAddesses] = useState(null);
    const { user }= useAuth();
    useEffect(() => {
        (async () =>{
            try {
                const response = await addressCtrl.getAll(user.id);
                setAddesses(response.data);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [reaload])
    if(!addesses) return null;
    return (
        <div className={styles.addresses} >
            {map(addesses, (address) =>(
                <Address key={address.id} addressId={address.id} address={address.attributes} onReload={onReload} />
            ))}
        </div>
    )
}
