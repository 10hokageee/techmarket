export const AboutDetailBlock = () => {
  return (
    <div className="bg-[url('/images/about-detail-block-bg.png')] relative px-[25px] pb-[31px] bg-no-repeat bg-cover bg-top w-[100%] h-[500px] flex flex-col justify-end z-0
      after:content-[''] after:inset-0 after:absolute 
      after:bg-[linear-gradient(90deg,#010101_0%,#0E0F10_68.23%,rgba(20,21,23,0)_100%)] 
      after:-z-10 md:justify-center bg-right bg-no-repeat bg-contain ">

      <div className="relative z-10 max-w-[1300px] w-[100%] px-[15px] mx-auto my-0">
        <div className="xl:max-w-[346px] w-[100%] md:max-w-[326px]">
        <h1 className="font-poppins font-medium text-white text-[32px]/[132%] mb-[13px] xl:text-[44px]/[132%] xl:mb-[60px]">
          Outplay the Competittion
        </h1>
        <p className="font-poppins font-light text-[14px]/[20px] text-white xl:text-[18px]/[26px]">
          Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
          <br /><br />
          *Performance compared to i7-9700. Specs varies by model.
          </p>
        </div>
      </div>
    </div>
  );
}