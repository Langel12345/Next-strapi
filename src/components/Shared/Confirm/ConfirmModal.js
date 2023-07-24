import { Confirm as ConfirmUI} from 'semantic-ui-react'
export  function ConfirmModal(props) {
    const {...rest}= props;
    return <ConfirmUI className ="confirm" size="mini" {...rest} />
}
