import Head from "next/head";
export function Seo (props){
    const {title ="Gaming + Tus Juegos Favoritos", description ="Tus juegos favoritos para Strem. PlatStation, Xbox, Switch al mejor precio"} = props
    return(
        <Head>
            <title>{title}</title>
            <meta property="description" content={description}></meta>
        </Head>
    )
}