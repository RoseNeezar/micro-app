import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

import { combineEpics, Epic } from "redux-observable";
import {
  catchError,
  EMPTY,
  filter,
  ignoreElements,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import agent from "../../../api/agent";
import { errorCatcher } from "../error/error.slice";
import {
  addBoard,
  createBoard,
  fetchBoards,
  globalState,
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
  action$
    .pipe(
      filter(globalState.match),
      switchMap((action) => {
        console.log("rxjs--", action.payload);
        return EMPTY;
      })
    )
    .pipe(ignoreElements());

export default combineEpics(createBoardEpic, fetchBoardEpic, globalEpic);
