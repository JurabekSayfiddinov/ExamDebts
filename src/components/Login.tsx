
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  axiosRequest,
  saveToken,
} from "../utils/token";

const logo = "https://www.adl5-8.tj/adl5-8-logo.svg";

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    fontSize: "17px",
    minHeight: "62px",

    "& fieldset": {
      borderColor: "#cbd5e1",
    },

    "&:hover fieldset": {
      borderColor: "#8eaafa",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#437eff",
    },
  },

  "& .MuiOutlinedInput-input": {
    padding: "18px 20px",
  },
};

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
const logIN = async (info: LoginInfo) => {
  try {
    setLoading(true);
    setError("");

    const { data } =
      await axiosRequest.post<LoginResponse>(
        "/api/auth/login",
        info
      );

    saveToken(
      data.accessToken,
      data.refreshToken
    );

    navigate("/dashboard", { replace: true });

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        setError("Email ё парол нодуруст аст.");
      } else {
        setError("Хатогӣ ҳангоми воридшавӣ.");
      }
    } else {
      setError("Ворид шудан муяссар нашуд.");
    }
  } finally {
    setLoading(false);
  }
};


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Ҳамаи майдонҳоро пур кунед.");
      return;
    }

    void logIN({
      email: email.trim(),
      password,
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f9fc] px-4 py-12">


      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffd9de]/40 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#ffebd5]/40 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-20 left-1/3 h-[400px] w-[500px] rounded-full bg-[#dff5ed]/40 blur-[130px]" />

   
      <div className="relative z-10 w-full max-w-[690px] rounded-[18px] border border-[#e3e8ef] bg-white px-6 py-12 sm:px-12">

  
        <div className="mb-12 flex justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="Adl 5:8"
              className="h-12 w-12 object-contain"
            />
          </Link>
        </div>


        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[36px] font-bold text-[#202936]">
            Войти
          </h1>

          <Link
            to="/register"
            className="text-[18px] text-[#437eff] transition hover:text-[#2454d4]"
          >
            Нет аккаунта?
          </Link>
        </div>

    
        <form onSubmit={handleSubmit} className="space-y-9">


          <div>
            <label
              htmlFor="login-email"
              className="mb-3 block text-[18px] font-medium text-[#64748b]"
            >
              Email
            </label>

            <TextField
              id="login-email"
              fullWidth
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              sx={inputStyles}
            />
          </div>

  
          <div>
            <label
              htmlFor="login-password"
              className="mb-3 block text-[18px] font-medium text-[#64748b]"
            >
              Пароль
            </label>

            <TextField
              id="login-password"
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              sx={inputStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "Скрыть пароль"
                            : "Показать пароль"
                        }
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <div className="mt-5 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[17px] text-[#303b4b] transition hover:text-[#437eff]"
              >
                Забыли пароль?
              </Link>
            </div>
          </div>


          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

     
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              minHeight: "62px",
              borderRadius: "11px",
              backgroundColor: "#437eff",
              fontSize: "20px",
              textTransform: "none",
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#3263e5",
                boxShadow: "none",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={25}
                sx={{ color: "#ffffff" }}
              />
            ) : (
              "Войти"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
