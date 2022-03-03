import { useAuthentication } from "domain/authentication/hooks/useAuthentication";
import LoginModal from "domain/authentication/LoginModal";
import Button from "ui/Button/Button";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const { isAuthenticated, isLoginFormOpen, toggleLoginForm, logout } =
    useAuthentication();
  return (
    <div className="container mx-auto flex flex-col h-screen">
      <header className="flex justify-between items-center p-8">
        <h1 className="text-2xl font-semibold text-rose-800">Peanut Movies</h1>
        {isAuthenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button onClick={() => toggleLoginForm(true)}>Login</Button>
        )}
      </header>
      <main className="rounded p-8 flex-grow">{children}</main>
      <ToastContainer position="top-center" />
      <LoginModal
        isVisible={isLoginFormOpen}
        onCancel={() => toggleLoginForm(false)}
      />
    </div>
  );
};

export default Layout;
