export const Features = () => {
  const features = [
    {
      title: "Product Support",
      text: "Up to 3 years on-site warranty available for your peace of mind.",
      icon: "/icons/headphones-icon.svg",
    },
    {
      title: "Personal Account",
      text: "With big discounts, free delivery and a dedicated support specialist.",
      icon: "/icons/profile-icon.svg",
    },
    {
      title: "Amazing Savings",
      text: "Up to 70% off new Products, you can be sure of the best price..",
      icon: "/icons/sale-icon.svg",
    },
  ];

  return (
    <section className="pb-[60px] pt-[20px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <ul className="flex flex-col items-center justify-center gap-[20px] md:flex-row md:justify-between lg:justify-around">
          {features.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center text-center max-w-[265px] md:max-w-[219px] w-[100%]"
            >
              <span className="w-[45px] h-[45px] lg:w-[65px] lg:h-[65px] bg-[#0156ff] rounded-[50%] relative mb-[7px] lg:mb-[24px] flex items-center justify-center">
                <img
                  src={item.icon}
                  alt=""
                  className="w-[17px] h-[17px] lg:w-[25px] lg:h-[25px]"
                />
              </span>

              <span className="font-poppins font-bold text-[14px] lg:text-[18px] leading-[132.5%] text-black mb-[5px] lg:mb-[13px]">
                {item.title}
              </span>

              <p className="font-poppins font-normal text-[14px] leading-[140%] text-black opacity-[0.7]">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};