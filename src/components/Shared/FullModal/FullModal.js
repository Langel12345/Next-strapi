import styles from './FullModal.module.scss'
import { Modal,Icon } from 'semantic-ui-react'
export  function FullModal(props) {
    const { children, show, onClose } = props;
  return (
    <Modal open={show} className={styles.fullModal}>
        <Modal.Content>{ children}</Modal.Content>
        <Icon name="close" className={styles.close} onClick={onClose} />
    </Modal>
  )
}
