import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_NEW_USER, GET_USER_SIGN_UP_VALIDATION } from "../../libs/client/gql";
import { v4 as uuidv4 } from "uuid";
import styles from "./SignUpPage.module.css";
import { useToast } from '@chakra-ui/react'

const SignUpPage = () => {
  const uuid = uuidv4();
  let [user, setUser] = useState({ email: "", password: "", name: "" });
  let [getUSer, { data, loading, error }] = useLazyQuery(GET_USER_SIGN_UP_VALIDATION);
  let [userExist, setUserExist] = useState(false);
  let [addUSer] = useMutation(CREATE_NEW_USER, {
    onCompleted: ()=>{
      setUserExist(false)
    }
  });
  const navigate = useNavigate();
  const toast = useToast()

  useEffect(() => {
    console.log(data);
    if (data?.users.length === 0) {
      addUSer({
        variables: { id: uuid, email: user.email, password: user.password, name: user.name },
      });
      navigate("/");
    } else {
      console.log(error);
      setUserExist(true);
    }
  }, [data]);

  useEffect(() => {
    setUserExist(false);
  }, []);

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
    getUSer({
      variables: { id: uuid, email: user.email, password: user.password, name: user.name },
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {/* {userExist ? (
        <Stack spacing={3}>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </Stack>
      ) : (
        <Stack spacing={3}>
          <Alert status="success">
            <AlertIcon />
            Account is created
          </Alert>
        </Stack>
      )} */}

      {userExist && (
        <Stack spacing={3}>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </Stack>
      )}

      <FormControl className={styles.form}>
        <FormLabel htmlFor="email" className={styles.formLabel}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          className={styles.input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

        <FormLabel htmlFor="email" className={styles.formLabel}>
          Username
        </FormLabel>
        <Input
          id="name"
          type="text"
          className={styles.input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

        <FormLabel htmlFor="email" className={styles.formLabel}>
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          className={styles.input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

        <Button
          type="submit"
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
        >
          Create Account
        </Button>
      </FormControl>
    </form>
  );
};

export default SignUpPage;
