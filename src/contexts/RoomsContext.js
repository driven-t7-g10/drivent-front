import { createContext, useState } from 'react';

const RoomContext = createContext();
export default RoomContext;

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
