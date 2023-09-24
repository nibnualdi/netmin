import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_NEW_USER, GET_USER_SIGN_UP_VALIDATION } from "../../libs/client/gql";
import { v4 as uuidv4 } from "uuid";
import styles from "./SignUpPage.module.css";
import chating from "../../assets/images/chating.svg";
import { Helmet } from "react-helmet";

const SignUpPage = () => {
  const uuid = uuidv4();
  let [user, setUser] = useState({ email: "", password: "", name: "" });
  let [getUSer, { data, loading }] = useLazyQuery(GET_USER_SIGN_UP_VALIDATION);
  let [addUSer, { data: addUserData, loading: addUserLoading }] = useMutation(CREATE_NEW_USER);

  let [isAlreadyLoad, setIsAlreadyLoad] = useState(false);
  let [isAlreadySecondLoad, setIsAlreadySecondLoad] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (data?.users.length === 0 && isAlreadyLoad) {
      addUSer({
        variables: { id: uuid, email: user.email, password: user.password, name: user.name },
      });
    }
  }, [data]);

  useEffect(() => {
    setIsAlreadySecondLoad(true);
  }, [addUserLoading]);

  useEffect(() => {
    if (isAlreadySecondLoad) {
      if (data?.users.length === 0) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      }
      if (data?.users.length > 0) {
        toast({
          title: "Failed.",
          description: "There is already the same name or email.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [data]);

  const handleInput = (e) => {
    if (e.target.id === "email") {
      setUser({ ...user, email: e.target.value });
    }
    if (e.target.id === "password") {
      setUser({ ...user, password: e.target.value });
    }
    if (e.target.id === "name") {
      setUser({ ...user, name: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAlreadyLoad(true);
    if (user.email && user.password && user.name) {
      getUSer({
        variables: {
          email: user.email.toLowerCase(),
          name: user.name.toLowerCase(),
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>netmin | Signup Page</title>
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
            <h1 className={styles.signUp}>Sign Up</h1>
            <p className={styles.desc}>create an account</p>
          </div>
          <span className={styles.line} />
          <div className={styles.formContainer}>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className={styles.input}
              onChange={(e) => {
                handleInput(e);
              }}
            />

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
                Create
              </Button>
            )}
            <Link to="/">
              <p className={styles.toLogIn}>already have an account?</p>
            </Link>
          </div>
        </FormControl>
      </form>
    </>
  );
};

export default SignUpPage;
