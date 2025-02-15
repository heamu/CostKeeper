/* eslint-disable react/prop-types */
import { List } from "antd";
import SearchInput from "./SearchInput/SearchInput";
import FriendsAddFriendModal from "./FriendsAddFriendModal"
import {auth, db} from "../../firebase.js"
import { useEffect, useState } from "react";
import "./styles.css"
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import FriendListItem from "./FriendListItem.jsx";
import useIsMobile from "./useIsMobile.jsx";
import { useNavigate } from "react-router-dom";
function FriendsList({friendsArray,setFriendsArray,setFreindOpen,friendOpen}) {
    const [openAddFriendModal,setOpenAddFriendModal] = useState(false);
    const [user,loading] = useAuthState(auth);
    const [friendsLoading,setFriendsLoading] = useState(false);
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    
    


  

  async function onAddFriendFormFinish(value){
    try{
        // eslint-disable-next-line no-unused-vars
        const docref = await addDoc(
            collection(db,`users/${user.uid}/friends`),
            {name:`${value.name}`}
        );

        //console.log("Document written with Id : " , docref.id);
        
            toast.success(`${value.name} added!!!`);
            fetchFriends();
        
    }
    catch(e){
        console.log("Error adding document : ",e);
        
            toast.error("couldn't add freind");
        
    }
  }
  
  async function fetchFriends(){
    
    setFriendsLoading(true);
    if(user){
      const q = query(collection(db,`users/${user.uid}/friends`));
      const querySnapshot = await getDocs(q);
      let friends = [];
      querySnapshot.forEach((doc)=>{
        //console.log(doc.data());
        friends.push({id:doc.id , ...doc.data()});
      });
      setFriendsArray(friends);
      //console.log(friends);
      //toast.success("friends Fetched");
    }
    setFriendsLoading(false);
  }
  
  useEffect(()=>{
     fetchFriends();
  },[user])

  

      const style = {
            padding: "0px",   
            border: "1px solid #ccc",   
            width: "40%",   
            height: "98vh",
            borderRadius:"0.8rem" ,
        display : "flex",
        justifyContent : "center",
        alignItems:"Center"
      }
      
    if(loading||friendsLoading){
       return <div className="loading-data" style={style}> <SyncLoader color="blue"/></div>
    }
  
    

    let filteredFriendsArray = friendsArray.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) 
    );

    function handleCostKeeper(){
      navigate("/dashboard")
    }
    
    
    //console.log(freindsArray);
    return (
        <div style={{  
            padding: "0px",   
            border: "1px solid #ccc",   
            width: `${isMobile?"100vw":"40%"}`,   
            height: "98vh",
            borderRadius:"0.8rem" 
        }}>  
            
            <div className="friends-list-actions" >
                 <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",}} className="">
                 <span onClick={handleCostKeeper} style={{cursor:"pointer",display:"inline-block",padding:"1rem",color:"white",fontWeight:600,fontSize:"1.2rem"}}>Cost Keeper</span>
                 <button onClick={()=>setOpenAddFriendModal(true)} className="split-button">Create friend</button>
                 <FriendsAddFriendModal openAddFriendModal = {openAddFriendModal} setOpenAddFriendModal={setOpenAddFriendModal} onAddFriendFormFinish={onAddFriendFormFinish} />
                 </div>
                 <SearchInput setSearch={setSearch} search={search} />
               
            </div>
            <div style={{width:"100%",overflowY: "auto",height:"78.8%"}}>
            <List  
                itemLayout="horizontal"  
                dataSource={filteredFriendsArray}  
                renderItem={(item, index) => (  
                    <FriendListItem friendOpen={friendOpen} item={item} index={index} setFreindOpen={setFreindOpen}  />
                )}  
            />  

             <div style={{ marginTop:"0.2rem",width:"100%",textAlign:"center",color:"grey",fontSize:"small"}}>
                {friendsArray.length==0?"___create friends___":"___list your transactions with friends___"}
                </div>
            </div>
        </div>
    )
}

export default FriendsList




