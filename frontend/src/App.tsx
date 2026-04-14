import { Outlet } from "react-router-dom";
import { Header } from "./shared/Header/Header";
import { Footer } from "./shared/Footer/Footer";
import { Features } from "./shared/Features/Features";

export const App = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Header />

      <button
        onClick={scrollToTop}
        className="
          z-50
          hidden
          max-[1199px]:fixed max-[1199px]:w-[40px] max-[1199px]:h-[40px]
          max-[1199px]:right-[15px] max-[1199px]:top-1/2 max-[1199px]:-translate-y-1/2
          max-[1199px]:bg-[#0156ff] max-[1199px]:rounded-full
          max-[1199px]:flex max-[1199px]:items-center max-[1199px]:justify-center
          max-[1199px]:cursor-pointer

          max-[768px]:fixed max-[768px]:w-[40px] max-[768px]:h-[40px]
          max-[768px]:right-[15px] max-[768px]:top-1/2 max-[768px]:-translate-y-1/2
          max-[768px]:bg-[#0156ff] max-[768px]:rounded-full
          max-[768px]:flex max-[768px]:items-center max-[768px]:justify-center
          max-[768px]:cursor-pointer

          after:content-['']
          after:absolute after:w-[10px] after:h-[12px]
          after:bg-[url('/icons/slider-arrow.svg')]
          after:bg-center after:bg-no-repeat
          after:rotate-90
        "
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Features />
      <Footer />
    </div>
  );
};