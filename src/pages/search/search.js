import {useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import {size} from 'lodash';
import { GridGames,NoResult,Pagination,Separator} from '@/components/Shared'
import { BasicLayout } from '@/layouts';
export default function SearchPage(props) {
    const {games,pagination,searchText} = props;
    const hastResult = size(games) > 0;
    console.log(hastResult)
    useEffect(() => {
        document.getElementById("search-games").focus()
    }, [])
    
    return (
        <>
            <BasicLayout relative isOpenSearch={true}>
                <Container>
                    <Separator height={50} />
                    <h2>Buscando: {searchText} </h2>
                    {hastResult ? (
                        <>
                            <GridGames games ={games} />
                            <Separator height={30} />
                            <Pagination  currentPage={pagination.page} totalPage={pagination.pageCount} />
                            <Separator height={100} />
                        </>
                    ):(
                        <>
                            <NoResult text="No se han encontrado resultados" /> 
                            <Separator height={30} />
                        </>
                    )}
                </Container>
            </BasicLayout>
        </>
    )
}
