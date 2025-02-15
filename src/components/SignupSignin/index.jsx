import { useEffect, useState } from "react";
import './index.css'
import Signup from "./Signup";
import Signin from "./SignIn";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
function SignupSignInComponent() {
   const [isSignUp,setIsSignUp] = useState(true);
   const [user,loading] = useAuthState(auth);
 const navigate = useNavigate();

   useEffect(()=>{
    console.log("Header : user : ",user);
      if(user!=null){
        console.log("Hellooo");
          navigate("/dashboard");
      }
  },[user,loading,navigate]);

  return <>
      {
        isSignUp ? <Signup  setSignUp={setIsSignUp}/> : <Signin setSignUp={setIsSignUp} />
      }
  </>
}

export default SignupSignInComponent;





// import "./index.css";
// import Input from "../InputComponent";
// import { useState } from "react";
// import Button from "../Button";
// import PasswordEyeSlash from "../Button/PasswordEyeSlash";
// import {createUserWithEmailAndPassword } from "firebase/auth";
// import { toast } from "react-toastify";
// import {auth} from  "../../firebase"



// function SignupSignInComponent() {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading,setLoading] = useState(false);

//   const [showPassword,setShowPassword] = useState(false);
//   const [showPasswordConfirm,setShowPasswordConfirm] = useState(false);
//   function resetAll(){
//     setName("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//   }

//   function handleEmailSubmit(){
//     setLoading(true);
//       if(name==""){
//         toast.error("Enter valid name");
//         setLoading(false);
//         resetAll()
//         return;
//       }
//       if(email==""){
//         toast.error("Enter valid email");
//         setLoading(false);
//         resetAll()
//         return;
//       }
//       if(password==""||confirmPassword==""){
//         toast.error("Enter valid password");
//         setLoading(false);
//         resetAll()
//         return;
//       }
//       if(password!=confirmPassword){
        
//         toast.error("Passwords do not match. Please try again.");
//         setLoading(false);
//         resetAll()
//       }
      
//      //Authenticate
     
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           console.log(user);
//           toast.success("user has been created");
//           setLoading(false);
//           resetAll();
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log(errorMessage)
//           console.log(errorCode);
//           toast.error("error has occured");
//           setLoading(false);
//           resetAll();
//           // ..
//         });
//   }


//   return (
//     <div className="signup-wrapper">
//       <h2 className="title">
//         Sign Up on <span style={{ color: "var(--theme" }}>Cost keeper</span>
//       </h2>
//       <form>
//         <Input
//           placeholder={"John doe"}
//           label={"Full Name"}
//           state={name}
//           setState={setName}
//           type={"text"}
//         />
//         <Input
//           placeholder={"John_doe@mail.com"}
//           label={"Email"}
//           state={email}
//           setState={setEmail}
//           type={"email"}
//         />
//         <Input
//           placeholder={"Example@123"}
//           label={"Password"}
//           state={password}
//           setState={setPassword}
//           type={showPassword ? 'text' : 'password'}
//         >
//             {<PasswordEyeSlash setShowPassword={setShowPassword} showPassword={showPassword}/>}
//         </Input>
//         <Input
//           placeholder={"Example@123"}
//           label={"Confirm Password"}
//           state={confirmPassword}
//           setState={setConfirmPassword}
//           type={showPasswordConfirm ? 'text' : 'password'} 
//         >
//             {<PasswordEyeSlash setShowPassword={setShowPasswordConfirm} showPassword={showPasswordConfirm}/>}
//         </Input>

//         <Button loading={loading} onClick={handleEmailSubmit} text='Signup Using Email and Password'/>
//         <p style={{textAlign:"center"}}>or</p>
//         <Button loading={loading} text='Signup Using Google' blue={true}/>
//       </form>
//     </div>
//   );
// }

// export default SignupSignInComponent;


// // //
// // uid
// // : 
// // "xBHGUlbGbJMxSnsSwg1oNtO9WGP2"