import "./Signup.css";

const Signup = () => {
  return (
    <button
      onClick={() => {
        localStorage.setItem("isLogged", "false");
      }}>
      Temporary Log Out
    </button>
  );
};

export default Signup;
