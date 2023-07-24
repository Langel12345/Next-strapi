import {useState} from 'react'
import {Tab} from 'semantic-ui-react';
import {BasicLayout} from  '@/layouts';
import { useAuth} from '@/hooks'
import { Info,Settings,Address } from '@/components/Account';
import { Separator } from '@/components/Shared'
import { useRouter } from 'next/router'
import styles from './account.module.scss';
export default function AccounPage() {
    const { user,logout } = useAuth();
    const [reaload, setReaload] = useState(false)
    const router = useRouter();
    if(!user){
        router.push('/');
        return null
    }
    const onReload =()=>setReaload( (prevState) => !prevState);
    const panes=[
        { 
            menuItem: "Mis pedidos",
            render:()=>(
                <Tab.Pane attached={false}>
                    <p>Mis pedidos...</p>
                </Tab.Pane>
            )
        },
        { 
            menuItem: "Lista de deseos",
            render:()=>(
                <Tab.Pane attached={false}>
                    <p>Mi lista de deseos...</p>
                </Tab.Pane>
            )
        },
        { 
            menuItem: "Direcciones",
            render:()=>(
                <Tab.Pane attached={false}>
                    <Address.AddAddress onReload={onReload} />
                    <Address.ListAddress reaload={reaload} onReload={onReload}/>
                    <Separator height={80} />
                </Tab.Pane>
            )
        },
        { 
            menuItem: {
                key:20,  icon:"settings",content:"Ajustes"
            },
            render:()=>(
                <Tab.Pane attached={false}>
                    <Settings.ChangeNameForm />
                    <div className={styles.containerForms}>
                        <Settings.ChangeEmailForm />
                        <Settings.ChangePasswordForm />
                    </div>
                    <Separator height={80} />
                </Tab.Pane>
            )
        },
        {
            menuItem:{
                key:21,
                icon:"log out",
                content:"",
                onClick:logout
            }
        }
    ]
    return (
        <>
            <BasicLayout isContainer relative>
                <Info />
                <Tab  
                    menu={{secondary : true, pointing: true}} 
                    panes={panes}  className={styles.tabs} 
                />
            </BasicLayout>
            
        </>
    )
}
