import { useEffect, useState } from 'react';
import FriendsList from "./FriendsList"
import FrinedTransactions from "./FrinedTransactions"
import useIsMobile from './useIsMobile';

function FriendsLayout() {
    const [friendsArray,setFriendsArray] = useState([]);
    const [friendOpen,setFreindOpen] = useState(null); 
    const isMobile = useIsMobile();
      
   
     

    

    return (
        <div >
            {/* <Header /> */}
          <div className="" style={{backgroundColor:"#09122C",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh"}}>
          <div  className="friends-all-wrapper">

            {
              !isMobile?<><FriendsList friendOpen={friendOpen}  friendsArray={friendsArray} setFriendsArray={setFriendsArray} setFreindOpen={setFreindOpen} />
             <FrinedTransactions friendOpen={friendOpen} setFreindOpen={setFreindOpen}/></>
            :
              friendOpen==null?<FriendsList friendOpen={friendOpen}  friendsArray={friendsArray} setFriendsArray={setFriendsArray} setFreindOpen={setFreindOpen} />
             :<FrinedTransactions friendOpen={friendOpen} setFreindOpen={setFreindOpen}/>
            }
          
          </div>
            
        </div>
        </div>
        
    )
}

export default FriendsLayout
