import classNames from "classnames";

type AboutProps = {
  title: string;
  desc: string;
  source: string;
  bgColor: string;
  textColor: string;
  reverse?: boolean;
}

export const About: React.FC<AboutProps> = ({ title, desc, source, bgColor, textColor, reverse }) => {
  return (
    <section className="pb-[22px]">
      <div style={{ background: bgColor }} className={classNames('md:flex-row md:gap-[34px] md:py-[39px] md:px-[49px] flex items-center justify-center flex-col py-[18px] px-[33px]', {'md:flex-row-reverse': reverse})}>
        <img className="md:w-[260px] h-[270px]" src={source} alt="" />
        <div className="max-w-[1200px] px-[33x] mx-auto">
          <h1 style={{ color: textColor }} className="font-poppins font-medium text-[32px]/[132%] mb-[13px]">{title}</h1>
          <p style={{ color: textColor }} className="font-poppins font-light text-[14px]/[20px]">{desc}</p>
        </div>
      </div>
    </section>
  );
}