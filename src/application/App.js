import "react-toastify/dist/ReactToastify.css";
import MovieListPage from "application/pages/MovieListPage";
import MoviePage from "application/pages/MoviePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationProvider } from "domain/authentication/hooks/useAuthentication";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path=":id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
