import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function CheckSignIn({children}) {
   const [user,loading] = useAuthState(auth);
    const navigate = useNavigate();

    
    useEffect(()=>{
       if(!user){
        navigate('/')
       }

    },[user,loading,navigate])

    return (
       <>
       {children}
       </>
    )
}

export default CheckSignIn
