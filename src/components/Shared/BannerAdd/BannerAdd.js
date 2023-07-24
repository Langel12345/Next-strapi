import Link from 'next/link';
import styles  from './BannerAdd.module.scss';
import {Button,Container,Image} from 'semantic-ui-react';

export  function BannerAdd(props) {
    const {title, subtitle, btnTitle,btnLink,image} = props
  return (
    <div className={styles.container}>
        <Container className={styles.containerImage}>
            <Image src={image} />
        </Container>
        <div className={styles.infoContainer}>
            <Container>
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                
                <Button as={Link} href={btnLink} primary>
                    {btnTitle}
                </Button>
            </Container>
        </div>
    </div>
  )
}
