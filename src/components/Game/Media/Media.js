import { Separator } from '@/components/Shared';
import {Container} from 'semantic-ui-react';
import { Video } from './Video';
import { Gallery } from './Gallery';
export  function Media(props) {
    const {video, imagenes} = props;
   
    return (
        <Container>
            <h2>Visuales</h2>
            <Separator height={30} />
            <Video video={video}/>
            <Separator height={30} />
            <Gallery imagenes={imagenes}/>
        </Container>
    )
}
