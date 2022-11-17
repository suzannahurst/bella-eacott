import { useForm } from "react-hook-form";
import { useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import "./contact.css";
import { Button } from "@material-ui/core";

// const schema = yup.object().shape({
//   name: yup.string().required().min(2).max(20),
//   // email: yup.string().required().min(2).max(20),
//   subject: yup.string().required().min(2).max(5),
//   category: yup.mixed().oneOf(productCategories).required(),
// });

export const Contact = ({ initialValues }) => {
  const [submitText, setSubmitText] = useState(null);
  const [buttonTxt, setButtonTxt] = useState("Send to Bella");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({ mode: "onBlur" });
  const onSubmit = async (event, setSubmitText) => {
    event.preventDefault();
    setSubmitText("Submitting ...");
    const formElements = [...event.currentTarget.elements];
    const isValid =
      formElements.filter((elem) => elem.name === "bot-field")[0].value === "";

    const validFormElements = isValid ? formElements : [];

    if (validFormElements.length < 1) {
      setSubmitText("It looks like you filled out too many fields!");
    } else {
      const filledOutElements = validFormElements
        .filter((elem) => !!elem.value)
        .map(
          (element) =>
            encodeURIComponent(element.name) +
            "=" +
            encodeURIComponent(element.value),
        )
        .join("&");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: filledOutElements,
      })
        .then(() => {
          setSubmitText("Successfully submitted");
          setButtonTxt("Sent!");
          setButtonDisabled(!buttonDisabled);
          //TODO form reset
        })
        .catch((error) => {
          console.log(error);
          setSubmitText(
            "There was an error with your submission, please email me using the address above.",
          );
        });
    }
  };

  return (
    <>
      <section className="contact content skinny">
        <h2 className="pageNameMobile">Contact me</h2>
        <div className="content-item">
          <p>
            If you’d like to discuss your appointment or have any questions
            regarding massage or your treatment with me, please fill in this
            form:
          </p>
        </div>
        <div className="content-item">
          <form
            id="contact"
            name="contact-form"
            method="POST"
            data-netlify="true"
            onSubmit={(e) => onSubmit(e, setSubmitText)}
          >
            <p style={{ display: "none" }}>
              <label>
                Don’t fill this out if you expect to hear from me!
                <input name="bot-field" />
              </label>
            </p>
            <input
              style={{ display: "none" }}
              name="form-name"
              value="contact-form"
              readOnly={true}
            />

            <button type="submit" name="SendMessage" disabled={buttonDisabled}>
              {buttonTxt}
            </button>
            <div>
              <label htmlFor="name">
                <p>Name: </p>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required={true}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="email">
                <p>Email: </p>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required={true}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="message">
                <p>Message:</p>
              </label>
              <textarea
                required={true}
                id="message"
                name="message"
                className="form-control"
              ></textarea>
            </div>

            {submitText}
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
