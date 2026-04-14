import type { AppDispatch, RootState } from '@/services/store';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();