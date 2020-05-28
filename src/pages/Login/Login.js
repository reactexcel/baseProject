import React, { useState, useEffect } from "react";
import { authApi } from "../../api/auth";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from "reactstrap";
import { getProfileAction } from "../../store/actions/auth";
import { connect } from "react-redux";
import { getProfile } from "../../api/auth";
import styled from "styled-components";
import { googleLoginApi } from "../../api/auth";

const Login = props => {
  const [validateSate, setValidate] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      window.gapi.load("auth2", function() {
        window.gapi.auth2.init({
          client_id:
            "887491611946-s9vqn44a463l0lmhvrj1invc4bkqk4kh.apps.googleusercontent.com"
        });
      });
    }, 500);
  }, []);

  console.log(
    " process.env.REACT_APP_GOOGLE_KEY",
    process.env.REACT_APP_GOOGLE_KEY
  );

  const validateEmail = e => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      setValidate("has-success");
    } else {
      setValidate("has-danger");
    }
  };

  const handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (name !== "email" && validatePassword !== "") {
      setValidatePassword("");
    }
    (await name) === "email" ? setEmail(value) : setPassword(value);
  };

  const submitForm = e => {
    e.preventDefault();
    authApi(email, password)
      .then(response => {
        let promise = new Promise((res, rej) => {
          setEmail("");
          setPassword("");
          setValidate("");
          res(localStorage.setItem("api_token", response.data.api_token));
        });
        promise.then(res => {
          // props.getProfileAction(localStorage.getItem("api_token"));
          return props.history.push("/internal");
        });
      })
      .catch(erros => {
        setErrors(erros.response.data);
        if (
          erros.response.data &&
          erros.response.data.errors &&
          erros.response.data.errors.email
        ) {
          setValidate("has-danger");
        }
        if (
          erros.response.data &&
          erros.response.data.errors &&
          erros.response.data.errors.password
        ) {
          setValidatePassword("has-danger");
        }
      });
  };

  const signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then(googleUser => {
        // метод возвращает объект пользователя
        // где есть все необходимые нам поля
        const profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // не посылайте подобную информацию напрямую, на ваш сервер!
        console.log("Full Name: " + profile.getName());
        console.log("Given Name: " + profile.getGivenName());
        console.log("Family Name: " + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // токен
        const id_token = googleUser.getAuthResponse().id_token;
        localStorage.setItem("id_token", id_token);
        console.log("ID Token: " + id_token);
        googleLoginApi(profile.getEmail());
      })
      .then(() => googleLoginApi());
  };

  return (
    <DIV>
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={e => submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
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
              <Label for="examplePassword">Password</Label>
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
          <Button color="warning" onClick={signIn}>
            Google Login
          </Button>
          <Button color="warning">Submit</Button>
        </Form>
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
`;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  getProfileAction
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
