import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from './const.ts';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

/**
 * Некая проверка на авторизацию, иначе переводим на страницу для авторизации
 */
export function PrivateRoute({authStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
