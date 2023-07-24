
import { BasicLayout } from '@/layouts';
import  {Home } from '@/components/Home';
import {Separator,BarTruts,BannerAdd} from '@/components/Shared';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
  const platformId={
    playstation:"1",
    xbox:"4",
    nintendo:"3",
    pc:"2"
  }
  return (
    <>
      <BasicLayout>
          <Home.BannerLastGame />
          <Separator height={100} />
          <Container>
              <Home.LastestGame title="Ultimos Lanzamientos" />
          </Container>
          <Separator height={100} />
          <BarTruts />
          <Separator height={100} />
          <Container>
            <Home.LastestGame  title='PlayStation' limit='3' platformId={platformId.playstation}/>
          </Container>
          <Separator height={100} />
          <BannerAdd title='Registrate  y obten los mejores premios'
            subtitle="Compara con otros juegos y elige el tuyo!"
            btnTitle="Entra ahora"
            btnLink="/account"
            image="/images/img01.png"
          />
          <Separator height={50} />
          <Container>
            <Home.LastestGame  title='Xbox' limit='3' platformId={platformId.xbox}/>
          </Container>
          <Separator height={100} />
      </BasicLayout>
    </>
  )
}
