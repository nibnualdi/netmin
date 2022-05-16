import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER } from "../../libs/client/gql";
import styles from "./LoginPage.module.css";
import Cookies from "js-cookie";

const LoginPage = () => {
  let [user, setUser] = useState({ email: "", password: "" });
  let [getUSer, { data, loading, error }] = useLazyQuery(GET_USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.users.length > 0) {
      Cookies.set("auth", true);
      navigate(`/home:${data.users[0].name}`);
    } else {
      console.log("gak boleh masuk");
    }
  }, [data]);

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
    getUSer({ variables: { email: user.email, password: user.password } });
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
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
          Login
        </Button>
        <Link to="/signup"><FormHelperText>Have not an account yet?</FormHelperText></Link>
      </FormControl>
    </form>
  );
};

export default LoginPage;
