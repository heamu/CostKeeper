/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles.css";

function Input({ name ,label, state, setState, placeholder,type,children,isPassword}) {
    const [passwordError ,setPasswordError] = useState(false);

    function handleChange(e){
      if(state.length<7){
        setPasswordError(true);
      }
      else{
        setPasswordError(false);
      }
      setState(e.target.value);
    }
  
  return (<>
    <div className="input-wrapper">
      <div className="wrap">
      <p className="label-input">{label}</p>
      {children}
      </div>
      <input
        name={name}
        value={state}
        onChange={handleChange}
        type={type||"text"}
        placeholder={placeholder}
        className="custom-input"
      />
     
      
      <span className="input-highlight"></span>
      
    </div>
    {isPassword&&passwordError&&<p style={{marginLeft:"20px",color:"red"}}>Password must be at least 8 characters long</p>}
    </>
    
  );
}

export default Input;
