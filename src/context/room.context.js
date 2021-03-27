import React,{ createContext, useContext, useEffect, useState } from "react";
import { db } from "../misc/firebase";



const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  console.log(rooms)

  useEffect(() => {
    const roomListRef = db.ref('rooms');

    roomListRef.on('value', (snapshot) => {
      const roomArray = convertToArray(snapshot.val());
      // console.log(roomArray)
      setRooms(roomArray)
    })


    return () => {
      roomListRef.off();
    }

  },[])



  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>
}

const convertToArray = (val => {
  if (val) {
    return Object.keys(val).map(roomId => {
      return { ...val[roomId], id: roomId }
    });
  } else {
    return []
  }
})


export const useRoom = () => {
  return useContext(RoomContext)
}