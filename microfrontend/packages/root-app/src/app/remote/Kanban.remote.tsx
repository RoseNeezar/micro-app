import { StoreProvider, useStore } from "@store/module/global/global.remote";
import { useRemoteStore } from "@store/useRemoteStore";
import { useMount } from "kanban/Kanban";
import * as React from "react";

const Kanban = () => {
  const ref = React.useRef<any>(null);
  // console.log('exp')
  React.useEffect(() => {
    if (!ref.current) return;
    // console.log(ref.current, useMount)
    //@ts-ignore
    useMount(ref.current, "app", useRemoteStore, StoreProvider, useStore);
  }, []);

  return <div ref={ref} />;
};

export default Kanban;
