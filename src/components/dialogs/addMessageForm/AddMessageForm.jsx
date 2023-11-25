import React from "react";
import { Field, reduxForm } from "redux-form";
import { Element } from "../../common/formsControls/FormsControls.tsx";
import {
  maxlengthCreator,
  required,
} from "../../../utils/validators/validators";

const maxLength50 = maxlengthCreator(50);
const Textarea = Element("textarea");

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLength50]}
          placeholder="Enter your message"
          name="newMessageBody"
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "dialog-add-message-form",
})(AddMessageForm);
