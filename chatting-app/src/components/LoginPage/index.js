import styles from "./LoginPage.module.css";
import { Button, CircularProgress, FormControl, Input, useToast } from "@chakra-ui/react";
import chating from "../../assets/images/chating.svg";

import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../libs/client/gql";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  let [user, setUser] = useState({ email: "", password: "" });
  let [getUSer, { data, loading, error }] = useLazyQuery(GET_USER);
  let [alreadyLoad, setAlreadyLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (data?.users.length > 0) {
      Cookies.set("auth", data.users[0].name);
      toast({
        title: "You're in.",
        // description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(`/home:${data.users[0].name}`);
    }
    if (data?.users.length === 0 && alreadyLoad) {
      toast({
        title: "Failed.",
        description: "There is no match account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [data]);

  useEffect(() => {
    setAlreadyLoad(true);
  }, [loading]);

  const handleInput = (e) => {
    if (e.target.id === "email") {
      setUser({ ...user, email: e.target.value });
    }
    if (e.target.id === "password") {
      setUser({ ...user, password: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUSer({ variables: { email: user.email.toLowerCase(), password: user.password } });
  };

  return (
    <>
      <Helmet>
        <title>netmin | Login Page</title>
      </Helmet>

      <form
        className={styles.container}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormControl className={styles.form}>
          <div className={styles.logoContainer}>
            <img src={chating} alt="logo" className={styles.logo} />
            <h1 className={styles.logIn}>Log in</h1>
            <p className={styles.desc}>enjoy your time with friends</p>
          </div>
          <span className={styles.line} />
          <div className={styles.formContainer}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className={styles.input}
              onChange={(e) => {
                handleInput(e);
              }}
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={(e) => {
                handleInput(e);
              }}
            />
            {loading ? (
              <CircularProgress isIndeterminate color="teal.300" size="30px" />
            ) : (
              <Button type="submit" className={styles.button}>
                Login
              </Button>
            )}
            <Link to="/signup">
              <p className={styles.toSignUp}>Have not an account yet?</p>
            </Link>
          </div>
        </FormControl>
      </form>
    </>
  );
};

export default LoginPage;
