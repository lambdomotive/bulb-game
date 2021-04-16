import React, { useContext } from "react";
import { useFormik } from "formik";
import { string as yupString, object as yupObject } from "yup";
import { useHistory } from "react-router-dom";
import { UserDataContext } from "../providers/UserDataProvider";

const IntroduceSchema = yupObject().shape({
  userName: yupString()
    .min(1, "Type your name, please")
    .required("Type your name, please"),
});

function WelcomePage() {
  const { push } = useHistory();

  const [, dispatch] = useContext(UserDataContext);

  const { handleSubmit, handleChange, values, errors, isValid } = useFormik({
    initialValues: { userName: "" },
    validationSchema: IntroduceSchema,
    onSubmit: ({ userName }) => {
      push("/game");
      dispatch({type: "SET_USERNAME", userName})
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor={"userName"}>How should we call you?</label>
        <input
          name={"userName"}
          type="text"
          onChange={handleChange}
          value={values.username}
        />
        <button type="submit" disabled={!isValid || !values.userName}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default WelcomePage;
