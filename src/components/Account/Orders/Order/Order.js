import { DateTime } from 'luxon';
import styles from './Order.module.scss'
import { add, forEach, map } from 'lodash';
import { useState } from 'react';
import { Image } from 'semantic-ui-react';
import {BasicModal} from '@/components/Shared';
import { ENV, fn } from '@/utils';
export  function Order(props) {
    const{order} = props;
    console.log(order)
    const [showModal, setModal] = useState(false);
    const createdAt =new Date(order.attributes.createdAt).toISOString();
    const products = order.attributes.products;
    const address = order.attributes.addressShoping.attributes;
    const openCloseModal = ()=> setModal(prevState => !prevState);
    const getTotalProduct = () =>{
        let total =0;
        forEach(products,(product) =>{
            total +=product.quantity
        })
        return total;
    }
    return (
        <>
            <div className={styles.order} onClick={openCloseModal}>
                <div>
                    <span>{DateTime.fromISO(createdAt,
                    {locale:"es"}).toFormat(
                        "dd/MM/yyyy"
                    )}</span>
                  <p>{getTotalProduct() } Productos</p>
                </div>
                <p>${order.attributes.totalPayment.toFixed(2)}</p>
            </div>
            <BasicModal show={showModal} onClose={openCloseModal}
                title="Información del pedido"
            >
                {map(products, (product)=>(
                    <div className={styles.product}>
                        <Image src={`${ENV.SERVER_HOST}${product.attributes.cover.data.attributes.url}`} />
                        <div>
                            <div className={styles.info}>
                                <div>
                                    <p>{product.attributes.title}</p>
                                    <p>{product.attributes.plataform.data.attributes.title}</p>
                                </div>
                            </div>
                            <div className={styles.quantity}>
                                <span>X{product.quantity}</span>
                                <span>${fn.calcDiscountedPrice(product.attributes.price,product.attributes.discount)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={styles.address}>
                    <div>
                        <p className={styles.title}>
                            {address.title}
                        </p>
                        <p className={styles.addressInfo}>
                            {address.name}, {address.address}, {" "}
                            {address.state}, {address.city}, {" "}
                            {address.postal_code}
                        </p>
                    </div>
                </div>
                <div className={styles.total}>
                    <p>Total: ${order.attributes.totalPayment.toFixed(2)} </p>
                </div>
            </BasicModal>
        </>
    )
}
