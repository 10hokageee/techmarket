import { useState, useMemo, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { register } from "@/utils/auth";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState('');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePircute] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
  const nameRegex = /^[A-Za-z0-9]{3,20}$/;

  const isFormValid = useMemo(() => {
    return name.length >= 3 && email.length > 0 && password.length >= 6;
  }, [name, email, password]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replace(/\s/g, ''));
    setErrorName(false);
  }

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

    if (!nameRegex.test(name)) {
      setErrorName(true);
      setErrorNameMessage('Username must be 3-20 characters, Latin letters and numbers only');
      isValid = false;
    }

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

      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email.trim().toLowerCase());
      formData.append("password", password);

      if (profilePicture) {
        formData.append("icon", profilePicture);
      }

      await register(formData);

      navigate('/Login');
      reset();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorEmail(true);
      setErrorEmailMessage(error.message);
    } finally {
      setLoading(false);
    }

    // try {
    //   setLoading(true);

    //   await register(name, email, password);

    //   navigate('/Login')

    //   reset();

    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   setErrorEmail(true);
    //   setErrorEmailMessage(error.message);
    // } finally {

    //   setLoading(false);
    // }
  }

  const reset = () => {
    setEmail('');
    setName('');
    setPassword('');
  }

  if (loading) {
    return <Loader />
  }

  return (
    <section className="pb-[16px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <div className="bg-[#F5F7FF] px-[18px] py-[20px] md:max-w-[564px] w-full flex flex-col md:mx-auto xl:px-[57px] xl:py-[37px]">
          <h2 className="text-[14px] font-semibold font-poppins mb-[19px] xl:text-[18px]">Create your account</h2>

          <form className="flex flex-col gap-[15px]" onSubmit={handleFormSubmit}>

            <label className="flex flex-col" htmlFor="name">
              <input
                onChange={handleNameChange}
                value={name}
                id="name"
                autoComplete="username"
                className={`bg-white py-[12px] px-[13px] border-[1px] rounded-[10px] outline-none ${errorName ? 'border-[#C94D3F]' : 'border-[#A2A6B0]'}`}
                type="text"
                placeholder="Your Username"
              />
              {errorName && <p className="text-[#C94D3F] text-[11px] font-light mt-[5px]">{errorNameMessage}</p>}
            </label>

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
            <label className="flex flex-col" htmlFor="avatar">
              <input
                id="avatar"
                type="file"
                ref={fileInputRef}

                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }

                  if (e.target.files?.[0]) {
                    setProfilePircute(e.target.files[0]);
                  }
                }}
                className="hidden mt-[-10px]"
              />
            </label>


            <div className="flex justify-between items-center">
              <button onClick={() => fileInputRef.current?.click()} type="button" className="bg-[#0156FF] py-[8px] w-[180px] h-[35px] rounded-[20px] text-white text-[14px]/[21px] font-poppins font-semibold cursor-pointer">Add avatar</button>
              {profilePicture && (
                <p className="text-[11px]/[20px] text-[#0156FF] font-poppins font-normal text-center block">
                  Selected: {profilePicture.name}
                </p>
              )}
            </div>


            <button
              className={`py-[8px] rounded-[20px] text-[13px] font-poppins font-semibold text-white  max-w-[133px] w-full transition-colors ${isFormValid ? 'bg-[#0156FF]' : 'bg-[#A2A6B0] cursor-not-allowed'}`}
              type="submit"
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}