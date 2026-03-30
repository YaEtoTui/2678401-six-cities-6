import {createReducer} from '@reduxjs/toolkit';
import {OfferType} from '../domain/dto/offer.ts';
import {AuthStatus} from '../const.ts';
import {User} from '../domain/dto/user.ts';
import {TOKEN_KEY} from '../services/api.ts';
import {
  changeCity,
  loadOffers, logout,
  requireAuthorization,
  setOffersDataError,
  setOffersDataLoading,
  setUser
} from './action.ts';

interface State {
  city: string;
  offers: OfferType[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
  authStatus: AuthStatus;
  user: User | null;
}

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
  authStatus: AuthStatus.NoAuth,
  user: null,
};

export const reducerApp = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffersDataError, (state, action) => {
      state.offersDataError = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authStatus = AuthStatus.NoAuth;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
    });
});
