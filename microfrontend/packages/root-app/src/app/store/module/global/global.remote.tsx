import { RootState, store } from "@store/store";
import { FC } from "react";
import { useSelector, Provider } from "react-redux";

export const useStore = () => {
  const xpState = useSelector((state: RootState) => state.global?.xpState);
  const mobilityState = useSelector(
    (state: RootState) => state.global?.mobilityState
  );

  return {
    xpState,
    mobilityState,
  };
};

export const StoreProvider: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
