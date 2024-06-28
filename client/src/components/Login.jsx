import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";

const Login = () => {
  const authStoreLogin = useAuth((state) => state.login);
  const navigate = useNavigate();

  // stores form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // changes form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO:
    // - check if input is valid
    // submit using fetch POST
    const login = async () => {
      try {
        const response = await fetch("/api/users/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        if (response.status === 200) {
          // code to navigate to user profile
          const data = await response.json();
          navigate(`/users/${data.user.id}`);
          authStoreLogin(data.tokenExpiry);
        } else {
          console.log("Failed to login");
        }
      } catch (error) {
        //console.log(error);
      }
    };
    login();
  };

  return (
    <div>
      <h1 className="font-bold text-4xl text-center mt-24 mb-14">
        Delishious Dishes!
      </h1>
      <form
        action=""
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-auto flex-col gap-8 items-center"
      >
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          iconSrc="/icons/person.svg"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          iconSrc="/icons/lock.svg"
        />
        <Button text="Log in" onClick={handleSubmit} />
        <span className="text-center font-light">
          No account yet?{" "}
          <Link to="/signup" className=" font-medium text-c4">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
