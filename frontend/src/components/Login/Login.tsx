import { useState, useMemo, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import type { User } from "@/types/User";
import { getMe } from "@/utils/getMe";
import { login, updateProfilePicture } from "@/utils/auth";
import { clearCart } from "@/features/addToCart";
import { useAppDispatch } from "@/hooks/hook";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
  const dispatch = useAppDispatch();

  const isFormValid = useMemo(() => {
    return email.length > 0 && password.length >= 6;
  }, [email, password]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    getMe()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      })
  }, []);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorPassword(false);
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;


    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorEmail(true);
      setErrorEmailMessage('Email is required');
      isValid = false;
    } else if (cleanEmail.length > 254) {
      setErrorEmail(true);
      setErrorEmailMessage("Email is too long");
      isValid = false;
    } else if (!emailRegex.test(cleanEmail)) {
      setErrorEmail(true);
      setErrorEmailMessage("Invalid email format (e.g. user@mail.com)");
      isValid = false;
    }

    if (password.length < 6 || password.length > 15) {
      setErrorPassword(true);
      setErrorPasswordMessage('Password must be 6-15 characters long');
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorPassword(true);
      setErrorPasswordMessage("Only Latin letters, numbers and symbols allowed");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      await login(cleanEmail, password);

      const userData = await getMe();
      setUser(userData);

      reset();

    } catch (error) {
      console.error(error);

      setErrorPassword(true);
      setErrorPasswordMessage("Wrong email or password");
    } finally {
      dispatch(clearCart());
      setLoading(false);
    }
  }

  const reset = () => {
    setEmail('');
    setPassword('');
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    dispatch(clearCart());
  };

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return (
      <section className="pb-[50px] pt-[30px]">
        <div className="max-w-[1370px] px-[15px] mx-auto my-0">
          <h1 className="font-semibold mb-[10px] font-poppins font-bold text-[18px]/[27px] xl:text-[27px]/[34px] mb-[15px] text-center">Welcome {user.username}!</h1>
          <div className="flex flex-col items-center">
            <div className="flex flex-col justify-between w-full items-center md:flex-row md:justify-around">
              <div>
                <img className="w-[80px] h-[80px] rounded-[50%] xl:w-[120px] xl:h-[120px] mb-[15px] mx-auto md:mx-0" src={user.icon} alt="" />
                <p className="text-[14px]/[20px] font-poppins font-light mb-[5px] xl:text-[18px]/[24px]">Your Email: {user.email}</p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <button onClick={() => fileInputRef.current?.click()} className="bg-[#0156FF] py-[8px] w-[180px] h-[35px] rounded-[20px] text-white text-[14px]/[21px] font-poppins font-semibold cursor-pointer">Edit profile picture</button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-[30px] font-poppins font-semibold text-[14px]/[20px] w-[180px] h-[35px] cursor-pointer"
                >
                  Logout
                </button>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }

                  try {
                    setLoading(true);

                    await updateProfilePicture(file);

                    const updatedUser = await getMe();
                    setUser(updatedUser);

                  } catch (e) {
                    console.log(e);
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-[16px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <div className="bg-[#F5F7FF] px-[18px] py-[20px] md:max-w-[564px] w-full flex flex-col md:mx-auto xl:px-[57px] xl:py-[37px]">
          <h2 className="text-[14px] font-semibold font-poppins mb-[19px] xl:text-[18px]">Sign in to your account</h2>

          <form className="flex flex-col gap-[15px]" onSubmit={handleFormSubmit}>

            <label className="flex flex-col" htmlFor="email">
              <input
                onChange={handleEmailChange}
                value={email}
                id="email"
                className={`bg-white py-[12px] px-[13px] border-[1px] rounded-[10px] outline-none ${errorEmail ? 'border-[#C94D3F]' : 'border-[#A2A6B0]'}`}
                type="email"
                placeholder="Your Email"
              />
              {errorEmail && <p className="text-[#C94D3F] text-[11px] font-light mt-[5px]">{errorEmailMessage}</p>}
            </label>

            <label className="flex flex-col relative" htmlFor="password">
              <div className="relative">
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  id="password"
                  className={`w-full bg-white py-[12px] px-[13px] pr-[40px] border-[1px] rounded-[10px] outline-none ${errorPassword ? 'border-[#C94D3F]' : 'border-[#A2A6B0]'}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#A2A6B0]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errorPassword && <p className="text-[#C94D3F] text-[11px] font-light mt-[5px]">{errorPasswordMessage}</p>}
            </label>


            <div className="flex justify-between items-center mt-[16px] ">
              <button
                className={`py-[8px] rounded-[20px] text-[13px] font-poppins font-semibold text-white max-w-[133px] w-full transition-colors ${isFormValid ? 'bg-[#0156FF]' : 'bg-[#A2A6B0] cursor-not-allowed'}`}
                type="submit"
                disabled={!isFormValid}
              >
                Submit
              </button>
              <NavLink className="text-[11px]/[20px] text-[#0156FF] font-poppins font-normal" to="/Register">Create account</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}