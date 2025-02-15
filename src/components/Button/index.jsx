/* eslint-disable react/prop-types */
import './styles.css'


function Button({text,onClick,blue,loading,style}) {
    
    return (
        <div style={style} className={blue?"btn-blue":"btn"} onClick={onClick}>
            {loading ? "Loading...":text}
        </div>
    )
}

export default Button;
