import clsx from "clsx";
import { useRef } from "react";
import Button, { Variants } from "ui/Button/Button";
import { signIn } from "./api/authentication";
import { useAuthentication } from "./hooks/useAuthentication";

const LoginModal = ({ isVisible, onCancel }) => {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const { login } = useAuthentication();
  const onSubmit = async (event) => {
    event.preventDefault();
    const token = await signIn(
      usernameInput.current.value,
      passwordInput.current.value
    );
    login(token);
    onCancel();
  };
  return (
    <div
      className={clsx(
        "fixed bg-white shadow-lg p-8 right-0 h-full lg:w-1/4 md:w-1/2 w-3/4 transition-all",
        !isVisible && "translate-x-full"
      )}
    >
      <h1 className="text-2xl mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="flex flex-col items-start space-y-4">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          ref={usernameInput}
          type="text"
          className="p-2 w-full border border-color-gray-300"
          placeholder="Your username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          ref={passwordInput}
          type="password"
          className="p-2 w-full border border-color-gray-300"
          placeholder="Your password"
          required
        />
        <div className="flex space-x-4">
          <Button type="submit">Sign in</Button>
          <Button variant={Variants.SECONDARY} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
