/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./index.css";
import Input from "../InputComponent/index.jsx"
import { useState } from "react";
import Button from "../Button";
import PasswordEyeSlash from "../Button/PasswordEyeSlash";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import {auth, db, provider} from  "../../firebase"
import { useNavigate } from "react-router-dom";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signin({setSignUp}) {

  
  const [email, setEmail] = useState("john_doe@gmail.com");
  const [password, setPassword] = useState("Example@123");
  const [loading,setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  function resetAll(){
    setEmail("");
    setPassword("");
  }

  function handleEmailSubmit(){
    setLoading(true);
      if(email==""){
        toast.error("Enter valid email");
        setLoading(false);
        //resetAll()
        return;
      }
      if(password==""){
        toast.error("Enter valid password");
        setLoading(false);
        //resetAll()
        return;
      }
     signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         toast.success("You are logged in successfully");
         createDoc(user);
         setLoading(false);
         resetAll();
         navigate("/dashboard");
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         toast.error(errorMessage);
         setLoading(false);
         resetAll();
       });
  }

  async function createDoc(user){
    if(!user){
     return;
    }
   
    const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef);
    if(userData.exists()){
      toast.error("doc has been already created")
     return;
    }
   try{
     await setDoc(userRef,{
       name: user.displayName || "name",
       email:user.email,
       photoURL:user.photoURL||"",
       createdAt:new Date(),
     });
    toast.success("doc has been created");
   }
   catch(e){
      toast.error(e);
   }
   toast.success("user doc has been created")
}



function googleAuth(){
 setLoading(true);
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log("token>>>>>",token);
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    toast.success("Logged in succesfully")
    createDoc(user);
    navigate("/dashboard");
    setLoading(false);
    resetAll();
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("credential>>>>",credential);
    // ...
    setLoading(false);
  });
}




  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign In on <span style={{ color: "var(--theme" }}>Cost keeper</span>
      </h2>
      <form>
        <Input
          placeholder={"John_doe@mail.com"}
          label={"Email"}
          state={email}
          setState={setEmail}
          type={"email"}
        />
        <Input
          placeholder={"Example@123"}
          label={"Password"}
          state={password}
          setState={setPassword}
          type={showPassword ? 'text' : 'password'}
          isPassword={true}
        >
            {<PasswordEyeSlash setShowPassword={setShowPassword} showPassword={showPassword}/>}
        </Input>

        <Button loading={loading} onClick={handleEmailSubmit} text='Login In using Email'/>
        <p style={{textAlign:"center"}}>or</p>
        <Button loading={loading} onClick={googleAuth} text='Login Using Google' blue={true}/>
      </form>
      <p style={{textAlign:"center",cursor:"pointer"}}>Want to Sign Up? <span onClick={()=>setSignUp(true)} style={{ color: "var(--theme" }}>  Sign Up</span></p>
    </div>
  );
}

export default Signin;
