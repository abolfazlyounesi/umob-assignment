import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { RootState } from "../redux/root-reducer";

/**
 * @description
 * customizing useSelector and useDispatch hooks to match the types of this app
 * @returns
 * typed useSelector and useDispatch hooks
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
