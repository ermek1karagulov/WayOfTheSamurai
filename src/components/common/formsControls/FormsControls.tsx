import React from "react";
import s from "./FormsControls.module.css";

export const Element =
  (Element: any) =>
  ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={s.formControl + " " + (hasError ? s.error : "")}>
        <textarea {...input} {...props} />
        {hasError && <span> {meta.error} </span>}
      </div>
    );
  };

export const Input =
  (Element: any) =>
  ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={s.formControl + " " + (hasError ? s.error : "")}>
        <input {...input} {...props} />
        {hasError && <span> {meta.error} </span>}
      </div>
    );
  };
