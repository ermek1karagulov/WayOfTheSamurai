import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/formsControls/FormsControls";
import { required } from "../../utils/validators/validators";

const Element = Input("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="login"
          name="login"
          component={Element}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder="Password"
          name="password"
          component={Element}
          validate={[required]}
        />
      </div>
      <div>
        <Field component={Element} name="rememberMe" type="checkbox" />
        Remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
