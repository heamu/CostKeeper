
import {  useNavigate } from "react-router-dom";
import { auth } from "../../firebase"
import "./styles.css"
import {useAuthState} from "react-firebase-hooks/auth"
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "/assets/user.svg?url";





function Header() {
    
  // eslint-disable-next-line no-unused-vars
  const [user,loading] = useAuthState(auth);
    const navigate = useNavigate();
    
    function logoutFunc(){
        try{
          signOut(auth).then(()=>{
            toast.success("logged out successfully!!!");
            navigate("/")
          })
        }
        catch(e){
          toast.error(e.message)
        }
    }
    
    
     
    return (
        <div className="navbar">
           <p style={{color:"var(--white)",margin:0,fontWeight:600,fontSize:"1.2rem"}}>Cost keeper</p>

            {user&&<div style={{margin:"0px",padding:"0px",display:"flex",width:"30%",justifyContent:"space-around"}}>
              <div className="friends-button" onClick={()=>{navigate('/dashboard/friends')}} style={{margin:"0.7rem",padding:"0.5rem 1rem 0.5rem 1rem",color:"white",cursor:"pointer",fontWeight:600}}>
                Friends
              </div>
            <>
             {user&&<div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
               <img style={{width:"2rem ",height:"2rem",borderRadius:"50%"}} src={user.photoURL?user?.photoURL:userImg}  alt="" />
              <p className="logout"style={{cursor:"pointer"}} onClick={logoutFunc}>Logout</p>
              </div>}
             </> 
            </div>}
             
               </div>
    )
}

export default Header
