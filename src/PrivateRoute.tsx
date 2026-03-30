import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute, AuthStatus} from './const.ts';
import {RootState} from './store/indexStore.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

/**
 * Некая проверка на авторизацию, иначе переводим на страницу для авторизации
 */
export function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.authStatus);
  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
