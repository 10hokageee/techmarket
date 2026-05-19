export const ZipBlock = () => {
  return (
    <section className="pb-[14px] md:pb-[17px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <div className="bg-[#f5f7ff] flex items-center justify-center py-[20px] px-[5px] flex-col md:flex-row">
          
          <img
            src="/icons/zip-logo.svg"
            alt=""
            className="w-[37px] h-[13px] mb-[17px] md:mb-0 md:mr-[12px] md:w-[48px] md:h-[17px]"
          />

          <p className="font-poppins font-normal text-[18px] md:text-[14px] leading-[120.5%] text-[#272560] md:pl-[12px] lg:pl-[15px] relative flex flex-col items-center md:block">
            
            <span className="font-poppins font-semibold">own</span> it now, up to 6 months interest free{" "}
            
            <a
              href="#"
              className="font-poppins font-normal text-[18px] md:text-[14px] leading-[120.5%] text-[#272560] underline"
            >
              learn more
            </a>

            <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[17px] lg:h-[23px] bg-[#00aeb8]"></span>
          </p>
        </div>
      </div>
    </section>
  );
};