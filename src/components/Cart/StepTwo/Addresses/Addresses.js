import { useAuth } from '@/hooks';
import styles from './Addresses.module.scss'
import {Address} from '@/api';
import { useEffect, useState } from 'react';
import { map } from 'lodash';
import classNames from 'classnames';
const addressCtrl = new Address();
export  function Addresses(props) {
  const {addressSelected,setAddressSelected} = props;
  console.log(addressSelected)
  const [address, setAddress] = useState(null);
  const {user} = useAuth();
  useEffect(() => {
     (async () =>{
        try {
          const response = await addressCtrl.getAll(user.id);
          setAddress(response.data);
        } catch (error) {
          console.log(error);
        }
     })()
  }, [])
  
  return (
    <div className={styles.addresses}>
      <h2>Dirección</h2>
      {
        map(address, (address) =>(
          <div key={address.id} 
              className={classNames(styles.address,{
                [styles.active]: address.id === addressSelected?.id,
              })} 
              onClick={() => setAddressSelected(address)}>
              <p>
                {address.attributes.name} ({address.attributes.title})
              </p>
              <p>
                {address.attributes.address}, {address.attributes.postal_code},{" "}
                {address.attributes.state}, {address.attributes.city}
              </p>
          </div>
        ))
      }
    </div>
  )
}
