/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./index.css";
import Input from "../InputComponent/index.jsx"
import { useState } from "react";
import Button from "../Button";
import PasswordEyeSlash from "../Button/PasswordEyeSlash";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import {auth,db, provider} from  "../../firebase"
import { useNavigate } from "react-router-dom";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signup({setSignUp}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [showPasswordConfirm,setShowPasswordConfirm] = useState(false);
  function resetAll(){
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleEmailSubmit(){
    setLoading(true);
      if(name==""){
        toast.error("Enter valid name");
        setLoading(false);
        //resetAll()
        return;
      }
      if(email==""){
        toast.error("Enter valid email");
        setLoading(false);
        //resetAll()
        return;
      }
      if(password==""||confirmPassword==""){
        toast.error("Enter valid password");
        setLoading(false);
        //resetAll()
        return;
      }
      if(password!=confirmPassword){
        
        toast.error("Passwords do not match. Please try again.");
        setLoading(false);
        //resetAll()
      }
      
     //Authenticate
     
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("user has been created");
          setLoading(false);
          resetAll();
          createDoc(user);
          navigate("/dashboard")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          console.log(errorCode);
          toast.error(errorMessage);
          setLoading(false);
          resetAll();
          // ..
        });
  }

  async function createDoc(user){
       if(!user){
        return;
       }
      
       const userRef = doc(db,"users",user.uid);
       const userData = await getDoc(userRef);
       if(userData.exists()){
        toast.error("user already exist");
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
       // eslint-disable-next-line no-unused-vars
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
        Sign Up on <span style={{ color: "var(--theme" }}>Cost keeper</span>
      </h2>
      <form>
        <Input
          placeholder={"John doe"}
          label={"Full Name"}
          state={name}
          setState={setName}
          type={"text"}
        />
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
        <Input
          placeholder={"Example@123"}
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          type={showPasswordConfirm ? 'text' : 'password'} 
          isPassword={true}
        >
            {<PasswordEyeSlash setShowPassword={setShowPasswordConfirm} showPassword={showPasswordConfirm}/>}
        </Input>

        <Button loading={loading} onClick={handleEmailSubmit} text='Signup Using Email and Password'/>
        <p style={{textAlign:"center"}}>or</p>
        <Button loading={loading} onClick={googleAuth} text='Signup Using Google' blue={true}/>
      </form>
      <p style={{textAlign:"center",cursor:"pointer"}}>Already have an account ? <span onClick={()=>setSignUp(false)} style={{ color: "var(--theme" }}>Sign In</span></p>
    </div>
  );
}

export default Signup;


// //
// uid
// : 
// "xBHGUlbGbJMxSnsSwg1oNtO9WGP2"