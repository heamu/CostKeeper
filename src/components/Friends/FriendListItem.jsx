/* eslint-disable react/prop-types */
import { Avatar, List } from "antd"
import { useState } from "react";

function FriendListItem({item,index,setFreindOpen,friendOpen}) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <List.Item  onMouseEnter={() => setIsHovered(true)} // Set to true on mouse enter  
            onMouseLeave={() => setIsHovered(false)}   style={{ height:"4rem",borderRadius:"0.6rem" ,borderBottom:"1px solid" ,width: '100%', padding: '0.8rem',background:`${ friendOpen?.index==index?"#2d336b85": isHovered?"#2d336b85":"#2D336B"}`}}>  
                        <List.Item.Meta 
                            
                            avatar={  
                                <Avatar 
                                style={{backgroundColor:"black",}} 
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}  
                                />  
                            }  
                            title={<span style={{ textTransform:"capitalize" ,borderLeft:"1px solid #09122C",paddingLeft:"0.4rem",fontWeight:"normal",fontSize:"1.3rem",fontFamily:"serif",cursor:"pointer",margin:"0.2rem",color:"white"}} onClick={()=>{setFreindOpen({...item,index:index})}}>{item.name}</span>}  
                            />  
                    </List.Item>  
    )
}

export default FriendListItem
