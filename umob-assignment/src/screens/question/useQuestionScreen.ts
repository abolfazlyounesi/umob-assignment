import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getGame } from "../../redux/slices/game.slice";
import { shallowEqual } from "react-redux";
import { useQuestionsList } from "./useQuestionsList";
import PagerView from "react-native-pager-view";
import { UserActions } from "../../redux/slices";

export function useQuestionScreen() {
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false)

  const dispatch = useAppDispatch();

  const gameData = useAppSelector((state) => state.Game, shallowEqual);
  const results = useAppSelector((state)=> state.User.results)

  const { data } = useQuestionsList();

  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    dispatch(getGame());
  }, []);

  function timerCallbackFunc() {
    const prevResults = results?.length > 0 ?results :[]
    dispatch(UserActions.updateResult([...prevResults, score]));
    setShowModal(true);
    setScore(0)
    pagerRef?.current?.setPage(0)
  }

  return {
    isLoading: gameData.isLoading,
    data,
    score,
    setScore,
    pagerRef,
    page,
    setPage,
    showModal, 
    setShowModal,
    timerCallbackFunc
  };
}
