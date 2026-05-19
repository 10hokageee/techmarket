const featues = [
  { description: 'Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.', source: '/images/intel.png' },
  { description: 'The new GeForce® RTX SUPER™ Series has more cores and higher clocks for superfast performance compared to previous-gen GPUs.', source: '/images/rtx.png' },
  { description: 'Unleash the full potential with the latest SSD technology, the NVM Express. 6 times faster than traditional SATA SSD.', source: '/images/ssd.png' },
  { description: 'Featuring the latest 10th Gen Intel® Core™ processors, memory can support up to DDR4 2933MHz to delivers an unprecedented gaming experience.', source: '/images/memory.png' },
]

export const FeaturesBlock = () => {
  return (
    <section className="bg-[radial-gradient(50%_50%_at_50%_50%,_#242528_0%,_#040404_100%)] text-center px-[25px] py-[31px] md:flex md:flex-col md:items-center">

      <div className="md:max-w-[326px] md:w-[100%]">
        <h1 className="font-poppins font-medium text-[32px]/[48px] text-white mb-[14px] xl:text-[38px]/[57px] xl:mb-[28px]">Featues</h1>
        <p className="text-white font-poppins font-light text-[12px]/[20px] mb-[30px] xl:text-[18px]/[26px]">The MPG series brings out the best in gamers by allowing full expression in color with advanced RGB lighting control and synchronization.</p>
      </div>

      <ul className="flex flex-col gap-[20px] md:flex-row md:flex-wrap md:justify-center">
        {featues.map(featue => (
          <li key={featue.description} className="text-white font-poppins font-light text-[12px]/[22px] md:max-w-[274px] md:w-[100%] xl:text-[14px]/[22px]">
            <span className="w-[80px] h-[80px] rounded-[50%] relative flex items-center justify-center mx-auto bg-black mb-[10px] xl:w-[136px] xl:h-[136px] xl:mb-[28px]">
              <img className="xl:w-[81px] xl:h-[81px]" src={featue.source} alt="" />
            </span>
            {featue.description}
          </li>
        ))}
      </ul>
    </section>
  );
}