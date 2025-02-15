/* eslint-disable react/prop-types */
import {List,Avatar} from 'antd'
import "./styles.css"
import { useEffect, useState } from 'react'
import FriendsAddTransactionModal from "./FriendsAddTransactionModal"
import {auth, db} from "../../firebase.js"
import { addDoc, collection, getDocs, query,serverTimestamp,orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import TransactionListItem from './TransactionListItem.jsx'
import useIsMobile from './useIsMobile.jsx'

function FrinedTransactions({friendOpen,setFreindOpen}) {
    const [openModal,setopenModal] = useState(false)
    const [frinedTransactionsLoading,setFrinedTransactionsLoading] = useState(false)
    const [user,loading] = useAuthState(auth);
    const [friendTransactionsArray,setFriendTransactionsArray] = useState([]);
    const [totalMoney,setTotalMoney] = useState(0);
    const isMobile = useIsMobile();
    useEffect(()=>{
      if(friendOpen===null)return
      fetchFriendTransactions();
    },[friendOpen]);

    
    async function onTransacrtionFormFinish(value){
       if(friendOpen===null){
          toast.error("select a friend");
       }
      try{
          // eslint-disable-next-line no-unused-vars
          const newTransaction = {...value,createdAt: serverTimestamp() }
          // eslint-disable-next-line no-unused-vars
          const docref = await addDoc(
              collection(db,`users/${user.uid}/friends/${friendOpen.id}/friendTransactions`),
              newTransaction
          );
  
           
          setTotalMoney(e=>{
            if(newTransaction.paidBy==="you") return (e+  Number(newTransaction.amount))
            else return (e- Number(newTransaction.amount))
          })
          setFriendTransactionsArray([...friendTransactionsArray,newTransaction])
          toast.success("Transaction added");
          setopenModal(false)
      }
      catch(e){
          console.log("Error adding document : ",e);
          
              toast.error("couldn't add freind");
          
      }
    }
    

    

    async function fetchFriendTransactions(){
     let totalmoney = 0;
      setFrinedTransactionsLoading(true);
      if(friendOpen.id){
        const q = query(collection(db,`users/${user.uid}/friends/${friendOpen.id}/friendTransactions`),orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        let friendsTransaction = [];
        querySnapshot.forEach((doc)=>{
          
          if(doc.data().paidBy==="you"){
            totalmoney += Number(doc.data().amount);
          }
          else{
            totalmoney -= Number(doc.data().amount);
          }

         
          friendsTransaction.push({id:doc.id , ...doc.data()});
        });
        setTotalMoney(totalmoney);
        setFriendTransactionsArray(friendsTransaction);
        //console.log(friendsTransaction);
        //toast.success("Transactions Fetched");
      }
      setFrinedTransactionsLoading(false);
    }
    const style = {
      width:"60%",
      height:"98vh",
      display : "flex",
      justifyContent : "center",
      alignItems:"Center"
    }
    if(loading||frinedTransactionsLoading){
      return <div className='loading-data' style={style}> <SyncLoader color="blue"/></div> 
    }
    
  

    return (
        <div  style={{borderRadius:"0rem 1rem 1rem 0rem",borderLeft:"2px solid #0c40ee",background:"",width: `${isMobile?"100vw":"60%"}`, height:"98vh"}}>
            {
            friendOpen===null?<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",color:"grey"}}>select a friend</div> : <>
              <div style={{ display:"flex",padding:"1rem 0.2rem",background:"#0A3981",borderTopRightRadius:"2px"}}>
                                <Avatar
                                style={{background:"black"}}  
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${friendOpen.index}`}  
                                /> 

                               <div style={{width:"100%", margin:"0px",padding:"0px",display:"flex",justifyContent:"space-between"}}>
                               <span onClick={()=>setFreindOpen(null)} style={{cursor:"pointer",textTransform:"capitalize",color:"white",padding:"0.2rem 1.5rem",display:"inline-block",fontSize:"1.2rem"}}> {friendOpen.name}</span>

                              <span style={{borderRadius:"0.5rem 0.5rem 0rem 0rem",backgroundColor:"#09122C",color:`${totalMoney>=0?"#5CB338":"#FB4141"}`, minHeight:"2.5rem",textAlign:"center", borderBottom:"2px solid white",minWidth:"8rem",padding:"0.2rem 1.5rem",display:"inline-block",fontSize:"2rem"}}>
                                {Math.round(totalMoney*100)/100}₹</span>

                                </div> 
                </div>
            <div  style={{width:"100%",overflowY: "auto",height:"75%"}}>
            <List  
                itemLayout="horizontal"  
                dataSource={friendTransactionsArray}  
                renderItem={(item, index) => (  

                     
                <List.Item  className="friend-transaction-list-item" style={{  border:"none", width: '100%', padding: '0.8rem',display:"flex",justifyContent:`${item.paidBy!="you"?"start":"end"}`}}>  
                      <TransactionListItem fetchFriendTransactions={fetchFriendTransactions} friendOpen={friendOpen} item={item} index={index} />
                 </List.Item>  

               
                )}  
            />  
             
            </div>
            <div className='friend-actions' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <button onClick={()=>setopenModal(true)} className='add-transaction-button'>
                     Add a transaction
                  </button>
                  <FriendsAddTransactionModal openModal={openModal} setopenModal={setopenModal} onTransacrtionFormFinish={onTransacrtionFormFinish}/>
             </div>
            </>
                  
            }
             
        </div>
    )
}

export default FrinedTransactions



