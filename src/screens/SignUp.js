import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Separator from "../components/auth/Separator";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState: { errors, isValid }, } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters."
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username?.message)}
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
        <Separator />
      </FormBox>
      <BottomBox
        cta="Have an account?"
        linkText="Log in"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SignUp;
