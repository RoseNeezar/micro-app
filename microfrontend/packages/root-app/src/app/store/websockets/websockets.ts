import { globalState } from "@store/module/global/global.slice";
import { useSocketStore } from "@store/useSocket.store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const useSocket = () => {
  const { setSocket } = useSocketStore();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("socket----");
    const socket = io("http://localhost:5010", {
      path: "/kanban/socket.io",
    });

    setSocket(socket);

    socket.emit("setup", "myid");

    socket.on("connected", (message: any) => {
      dispatch(globalState(message));
    });
  }, []);
};

export default useSocket;
