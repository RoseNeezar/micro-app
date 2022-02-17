import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { combineEpics, Epic } from "redux-observable";
import { catchError, concatMap, EMPTY, filter, map, of, switchMap } from "rxjs";
import agent from "../../../api/agent";
import { errorCatcher } from "../error/error.slice";
import {
  addBoard,
  createBoard,
  fetchBoards,
  globalState,
  setMobilityState,
  setXpState,
} from "./global.slice";

export type MyEpic = Epic<AnyAction, AnyAction, RootState>;

const createBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(createBoard.match),
    switchMap((action) =>
      agent.boardService
        .createBoard({
          boardTitle: action.payload.title,
        })
        .pipe(
          map(({ response }) => addBoard(response)),
          catchError((err) => of(errorCatcher(err.response)))
        )
    )
  );

const fetchBoardEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(fetchBoards.match),
    switchMap((action) =>
      agent.boardService.getAllBoards().pipe(
        map(({ response }) => addBoard(response)),
        catchError((err) => of(errorCatcher(err.response)))
      )
    )
  );

const globalEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    filter(globalState.match),
    concatMap((action) => {
      switch (action.payload.app) {
        case "xp":
          return of(setXpState(action.payload));
        case "mobility":
          return of(setMobilityState(action.payload));
        default:
          return EMPTY;
      }
    })
  );

export default combineEpics(createBoardEpic, fetchBoardEpic, globalEpic);
