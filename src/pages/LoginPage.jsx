import LoginForm from "../auth/LoginForm";

const LoginPage = ({ handleAuthSuccess }) => {
  return (
    <>
      <LoginForm handleAuthSuccess={handleAuthSuccess} />
    </>
  );
};

export default LoginPage;
