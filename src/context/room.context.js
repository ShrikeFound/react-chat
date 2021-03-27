import { createContext, useEffect, useState } from "react";
import { db } from "../misc/firebase";



const RoomContext = createContext();

export const RoomProvider = (children) => {
  const [rooms, setRooms] = useState(null);


  useEffect(() => {
    const roomListRef = db.ref('rooms');

    roomListRef.on('value', (snapshot) => {
      console.log(snapshot.val())
    })


    return () => {
      roomListRef.off();
    }

  },[])



  return <RoomContext.Provider value="hello">{children}</RoomContext.Provider>
}