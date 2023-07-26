
import { Image } from 'semantic-ui-react';
import styles from './Gallery.module.scss'
import { ENV } from '@/utils';
import {map} from 'lodash';
import { FullModal} from '@/components/Shared';
import { useState } from 'react';
import Slider from 'react-slick';
export  function Gallery(props) {

  const { imagenes }= props;
  const imagenesClones = [...imagenes];
  const principalImage = imagenesClones.shift();
  const [show, setshow] = useState(false)
  const onOpenClose=() => setshow(prevState => !prevState);
  const settings={
    dots:true,
    dotsClass: styles.dots,
    Infinite:true,
    slidersToShow:1,
    slidersToScroll:1,
    arrows: false,
    customPaging: function (index){
      return <Image src={`${ENV.SERVER_HOST}${imagenes[index].attributes.url}`} />
    }
  }
  return (
    <>
      <div className={styles.gallery} >
        <div className={styles.principal}>
          
          <Image src={`${ENV.SERVER_HOST}${principalImage.attributes.url}`} onClick={onOpenClose}/>
        </div>
        <div className={styles.grid}>
          {map(imagenesClones, (imagen) =>(
            <div key={imagen.id}>
              <Image src={`${ENV.SERVER_HOST}${imagen.attributes.url}`} onClick={onOpenClose} />
            </div>
          ))}
        </div>
      </div>
      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
              {
                map(imagenes, (imagen) =>(
                    <div key={imagen.id}>
                        <Image src={`${ENV.SERVER_HOST}${imagen.attributes.url}`} />
                    </div>
                  ))
               }
          </Slider>
        </div>
      </FullModal>
    </>
  )
}
