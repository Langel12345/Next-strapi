
import style from './NoResult.module.scss'
export  function NoResult(props) {
    const {text} =props;
    return (
        <div className={style.noResult}>
            <p>{text}</p>
        </div>
    )
}
