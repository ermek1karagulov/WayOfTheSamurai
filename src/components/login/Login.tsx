import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/formsControls/FormsControls.tsx";
import { required } from "../../utils/validators/validators.jsx";
import { connect } from "react-redux";
import { login } from "../redux/authReducer.ts";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore.ts";

const Element = Input("input");

type LoginFormOwnProps = {
  captchaUrl?: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = (handleSubmit, error) => {
  return (
    // <form onSubmit={handleSubmit}>
    <>
      <div>
        <Field
          placeholder="Email"
          name="email"
          component={Element}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder="Password"
          name="password"
          type="password"
          component={Element}
          validate={[required]}
        />
      </div>
      <div>
        <Field component={Element} name="rememberMe" type="checkbox" />
        Remember me
      </div>
      {error && <div style={{ color: "red", fontSize: "20px" }}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </>
    // </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean;
};
type MapDispatchPropsType = {
  login: (
    email: string,
    password: string | number,
    rememberMe: boolean
  ) => void;
};
type LoginFormValuesType = {
  email: string;
  password: string | number;
  rememberMe: boolean;
};
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
