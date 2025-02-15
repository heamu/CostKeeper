import { useState } from "react"
import deleteSVG from "/assets/delete.svg?url"
import { Modal } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import {auth, db} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function TransactionListItem({index,item,friendOpen,fetchFriendTransactions}) {
  
    const [descIsOpen , setDescIsOpen] = useState(false);
    const [deleteModalOpen,setDeleteModalOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [user,loading] = useAuthState(auth);
    async function handleDelete(){
      console.log(item)
      try{
        await deleteDoc(doc(db, `users/${user.uid}/friends/${friendOpen.id}/friendTransactions`, item.id));
        toast.success("transaction delted");
        fetchFriendTransactions();
      }
      catch(e){
         toast.error(e);
      }
      
    }

    return (
        <div  style={{width:"auto",minWidth:"40%",cursor:"pointer",margin:"0.8rem"}}  key={index}>
            
                       <span style={{color:`${item.paidBy==="you"?"#5CB338":"#FB4141"}`, borderBottom:"1px solid ", display:"inline-block",width:"100%",textAlign:"center",fontSize:"1.8rem"}}>{item.amount}₹</span>
                        

                        <div style={{margin:"0px",padding:"0.2rem",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",}}>

                        <div  onClick={()=>setDescIsOpen((e)=>!e)} style={{width:"auto",padding:"0px",margin:"0px",color:`${descIsOpen?"white":"grey"}`}}>
                             {
                                `${descIsOpen ? item.descritption:'Description'}`
                            }
                         </div>
                      
                         <div onClick={()=>{
                            Modal.confirm({
                            title: 'Confirm',
                            content: 'are you sure delete the transaction',
                            onOk(){handleDelete()},
                            footer: (_, { OkBtn, CancelBtn }) => (
                              <>
                                <CancelBtn />
                                <OkBtn />
                              </>
                            ),
                          });

                          

                         }} style={{margin:"0px",padding:"0.8rem"}}>
                         <img src={deleteSVG} alt="" style={{padding:"0px" ,margin:"0px",width:"1rem",height:"1rem"}} />
                         </div>
                         
                        <Modal
                           style={{ fontWeight: 600}}
                           title="delete Transacrion"
                           open={deleteModalOpen}
                           onCancel={()=>{setDeleteModalOpen(false)}}
                           footer={null}
                        >
                            
                        </Modal>
                       
                        
                        </div>
                        
      </div>
    
    )
}

export default TransactionListItem
