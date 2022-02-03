import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mergeMap, Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import CurrencyRef from "../models/currencyRef";
import GlobalStats from "../models/globalStats";
import { currenciesRefService, globalStatsService } from '../services';

type NavbarState = {
    stats: GlobalStats;
    currenciesRef: CurrencyRef[];
    selectedCurrency: CurrencyRef;
}

const initState: NavbarState = {
    stats: {} as GlobalStats,
    currenciesRef: [],
    selectedCurrency: {} as CurrencyRef
}

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: initState,
    reducers: {
        setGlobalStats: (state, action: PayloadAction<GlobalStats>) => {
            state.stats = action.payload;
        },
        setCurrenciesRef: (state, action: PayloadAction<CurrencyRef[]>) => {
            state.currenciesRef = action.payload;
            state.selectedCurrency = action.payload[0];
        },
        setSelectedCurrency: (state, action: PayloadAction<CurrencyRef>) => {
            state.selectedCurrency = action.payload;
        }
    }
});

const { setGlobalStats, setCurrenciesRef, setSelectedCurrency } = navbarSlice.actions;

const initAction = (dispatch: AppDispatch): Observable<any> => {
    return globalStatsService.retrieve().pipe(
        mergeMap(stats => {
            dispatch(setGlobalStats(stats));
            return currenciesRefService.retrieve();
        }),
        tap(currenciesRef => {
            dispatch(setCurrenciesRef(currenciesRef));
        })
    );
}

const selectCurrencyAction = (dispatch: AppDispatch, currencyRef: CurrencyRef) => {
    dispatch(setSelectedCurrency(currencyRef));
}

export { navbarSlice, initAction, selectCurrencyAction };