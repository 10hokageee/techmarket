export const OurTeam = () => {
  const teammates = [
    {
      id: 1,
      name: "Olga Skrypnyk",
      role: "QA Engineer",
      picture: "/images/olga-profile.png",
      tools: "Postman, Chrome DevTools, Jira, TestRail, Test Documentation, STLC",
      socials: [
        {
          id: 1,
          icon: "/icons/linkedin-svgrepo-com.svg",
          to: "https://www.linkedin.com/in/olga-skrypnyk/",
        },
      ],
    },

    {
      id: 2,
      name: "Iryna Savelieva",
      role: "Data Analyst",
      picture: "/images/irina-profile.jpg",
      tools: "Python (Pandas, NumPy, Matplotlib, Seaborn), Tableau Public",
      socials: [
        {
          id: 2,
          icon: "/icons/linkedin-svgrepo-com.svg",
          to: "https://www.linkedin.com/in/iryna-savelieva-0a056a383",
        },
      ],
    },

    {
      id: 3,
      name: "Mykyta Serdiukov",
      role: "Frontend Developer",
      picture: "/images/nikita-profile.png",
      tools: "React, TypeScript, JavaScript, Redux, Tailwind, Git",
      socials: [
        {
          id: 3,
          icon: "/icons/linkedin-svgrepo-com.svg",
          to: "https://www.linkedin.com/in/mykyta-serdiukov-761883404",
        },

        {
          id: 4,
          icon: "/icons/github-svgrepo-com.svg",
          to: "https://github.com/10hokageee",
        },
      ],
    },

    {
      id: 4,
      name: "Arseniy Kushnir",
      role: "Backend Developer",
      picture: "/images/arsenii-profile.jpg",
      tools: "Python(Django, DjangoRESTframework, gunicorn) PyCharm, Git, Docker, StripeAPI, PostgreSQL, Ip-API, Cloudinary",
      socials: [
        {
          id: 5,
          icon: "/icons/linkedin-svgrepo-com.svg",
          to: "https://www.linkedin.com/in/arseniy-kushnir-0212a0404/",
        },

        {
          id: 6,
          icon: "/icons/github-svgrepo-com.svg",
          to: "https://github.com/PythonBossUA",
        },
      ],
    },
  ];

  return (
    <section className="pb-[75px] pt-[30px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <h1 className="font-poppins font-semibold text-[18px]/[27px] mb-[17px] xl:text-[32px]/[48px]">Our Team</h1>
        <ul className="flex flex-col justify-center items-center gap-[25px] md:flex-row xl:gap-[40px]">
          {teammates.map(t => (
            <li className="flex flex-col items-center max-w-[254px] w-full text-center xl:max-w-[274px] justify-between xl:min-h-[300px] min-h-[261px]" key={t.id}>
              <img className="rounded-[50%] w-[80px] h-[80px] object-cover xl:w-[136px] xl:h-[136px]" src={t.picture} alt="" />
              <span className="font-poppins font-bold text-[16px]/[22px] xl:text-[16px]/[22px]">{t.name}</span>
              <span className="font-poppins font-bold text-[16px]/[22px] xl:text-[16px]/[22px]">{t.role}</span>
              <p className="font-poppins font-light text-[12px]/[22px] xl:text-[14px]/[22px]">Tools & Skills - {t.tools}</p>

              <div className="flex gap-[10px]">
                {t.socials.map(s => (
                  <a href={s.to} target="blank" key={s.id}>
                    <img className="w-[16px] h-[16px] xl:w-[18px] xl:h-[18px]" src={s.icon} alt="Social link" />
                  </a>

                ))}
              </div>
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}