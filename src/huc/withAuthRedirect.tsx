import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "../components/redux/reduxStore";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};
type DispatchPropsType = {};

export function withAuthRedirect<WCP extends object>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (
    props
  ) => {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;
    return <WrappedComponent {...(restProps as WCP)} />;
  };
  let ConnectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;
