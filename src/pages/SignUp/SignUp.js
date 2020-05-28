import React, { useState } from "react";
import { authApi } from "../../api/auth";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  CustomInput
} from "reactstrap";
import { getProfileAction } from "../../store/actions/auth";
import { connect } from "react-redux";
import { signUpApi } from "../../api/auth";
import styled from "styled-components";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const SignUp = props => {
  const [validateSate, setValidate] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [validatePasswordComfirm, setValidatePasswordComfirm] = useState("");
  const [validateAvatar, setValidateAvatar] = useState("");
  const [validateName, setValidateName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const validateEmail = e => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      setValidate("has-success");
    } else {
      setValidate("has-danger");
    }
  };

  const handleChange = event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (name === "password") {
      setValidatePassword("");
      setPassword(value);
    }
    if (name === "name") {
      setValidateName("");
      setName(value);
    }

    if (name === "password_confirmation") {
      setValidatePasswordComfirm("");
      setPasswordConfirmation(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "avatar") {
      console.log(value);
      // setValidateAvatar("");
      // let reader = new FileReader();
      // let file = event.target.files[0];

      // reader.onloadend = () => {
      //   setAvatar(file);
      // };
    }
  };

  // const uploadButtonClick = (e, item) => {
  //   e.preventDefault();
  //   setValidateAvatar("");
  //   let reader = new FileReader();
  //   let file = event.target.files[0];

  //   reader.onloadend = () => {
  //     setAvatar(file);
  //   };
  // };

  const submitForm = e => {
    e.preventDefault();
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);
    data.append("avatar", avatar);
    data.append("name", name);
    signUpApi(data)
      .then(response => {
        toast.success(`Registration successfully completed!`);
      })
      .then(() => {
        props.history.push("/login");
      })
      .catch(errors => {
        console.log(errors.response.data);
        setErrors(errors.response.data);
        if (
          errors.response.data &&
          errors.response.data.errors &&
          errors.response.data.errors.email
        ) {
          setValidate("has-danger");
        }
        if (
          errors.response.data &&
          errors.response.data.errors &&
          errors.response.data.errors.password
        ) {
          setValidatePassword("has-danger");
        }
        if (
          errors.response.data &&
          errors.response.data.errors &&
          errors.response.data.errors.password_confirmation
        ) {
          setValidatePasswordComfirm("has-danger");
        }

        if (
          errors.response.data &&
          errors.response.data.errors &&
          errors.response.data.errors.avatar
        ) {
          setValidateAvatar("has-danger");
        }

        if (
          errors.response.data &&
          errors.response.data.errors &&
          errors.response.data.errors.name
        ) {
          setValidateName("has-danger");
        }
      });
  };

  const handleFileChange = files => {
    setValidateAvatar("");
    let reader = new FileReader();
    let file = files.target.files[0];

    console.log("sdsdsdsd", file);
    reader.onloadend = () => {
      setAvatar(file);
    };
  };

  return (
    <DIV>
      <Container className="App">
        <h2>Sign Up</h2>
        <Form className="form" onSubmit={e => submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>User name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                invalid={validateName === "has-danger"}
                onChange={e => {
                  handleChange(e);
                }}
              />
              <FormFeedback>
                {errors.errors && errors.errors.name
                  ? errors.errors.name[0]
                  : "Please input your name."}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>User email</Label>
              <Input
                type="email"
                name="email"
                placeholder="myemail@email.com"
                value={email}
                valid={validateSate === "has-success"}
                invalid={validateSate === "has-danger"}
                onChange={e => {
                  validateEmail(e);
                  handleChange(e);
                }}
              />

              <FormFeedback valid>
                That's looking like a correct email .
              </FormFeedback>
              <FormFeedback>
                {errors.errors && errors.errors.email
                  ? errors.errors.email[0]
                  : "Please input a correct email."}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                invalid={validatePassword === "has-danger"}
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={e => handleChange(e)}
              />
              <FormFeedback>
                {errors.errors && errors.errors.password
                  ? errors.errors.password[0]
                  : ""}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password_confirmation">Password confirmation</Label>
              <Input
                invalid={validatePasswordComfirm === "has-danger"}
                type="password"
                name="password_confirmation"
                placeholder="********"
                value={password_confirmation}
                onChange={e => handleChange(e)}
              />
              <FormFeedback>
                {errors.errors && errors.errors.password_confirmation
                  ? errors.errors.password_confirmation[0]
                  : ""}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="avatar">Avatar</Label>
              <CustomInput
                id="file"
                type="file"
                name="customFile"
                label={"choose an image file"}
                onChange={e => handleFileChange(e)}
                invalid={validateAvatar === "has-danger"}
              />
              <FormFeedback>
                {errors.errors && errors.errors.avatar
                  ? errors.errors.avatar[0]
                  : ""}
              </FormFeedback>
            </FormGroup>
          </Col>

          <Button color="warning">Submit</Button>
        </Form>
        <div className="link">
          {" "}
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </div>
      </Container>
    </DIV>
  );
};

const DIV = styled.div`
  max-width: 600px;
  text-align: left;
  padding: 1em;
  margin: 1em;
  border: 2px solid #ffb740;
  border-radius: 3px;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;

  .form {
    padding: 1em;
  }

  label {
    display: flex;
    font-weight: 600;
  }

  button {
    justify-content: flex-end;
  }

  .App-title {
    font-size: 1.5em;
  }

  .App-intro {
    font-size: large;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .btn-warning,
  .btn-warning:hover,
  .btn-warning:focus {
    color: white;
  }

  #file,
  .custom-file {
    cursor: pointer;
  }

  .link {
    padding-top: 10px;
    text-align: center;
    border-top: 1px solid #ced4da;
  }
`;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  getProfileAction
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
