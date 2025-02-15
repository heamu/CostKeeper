/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  
import './styles.css'


function PasswordEyeSlash({setShowPassword,showPassword}) {
    
    function handleTogglePasswordVisibility(){
        setShowPassword(!showPassword)
    }
    return (
        <button  style={{border:"none",backgroundColor:"transparent",display:"inline"}}
        type="button"  
        className="toggle-password-visibility"  
        onClick={handleTogglePasswordVisibility}  
        aria-label={showPassword ? 'Hide password' : 'Show password'}  
      >  
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />  
      </button>
    )
}

export default PasswordEyeSlash
