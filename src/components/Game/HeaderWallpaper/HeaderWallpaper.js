import { Image } from 'semantic-ui-react';
import styles from './HeaderWallpaper.module.scss';
import { ENV } from '@/utils';
export  function HeaderWallpaper(props) {
    const { image} = props;
  return (
    <div className={styles.HeaderWallpaper}>
        <Image  src={`${ENV.SERVER_HOST}${image}`}/>
    </div>
  )
}
