export const Brands = () => {
  const brands = [
    { imgUrl: "images/roccat.png", alt: "roccat brand" },
    { imgUrl: "images/msi.png", alt: "msi brand" },
    { imgUrl: "images/razer.png", alt: "razer brand" },
    { imgUrl: "images/thermaltake.png", alt: "thermaltake brand" },
    { imgUrl: "images/adata.png", alt: 'adata brand"' },
    { imgUrl: "images/hp.png", alt: "hp brand" },
    { imgUrl: "images/gigabyte.png", alt: "gigabyte brand" },
  ];

  return (
    <section className="pb-[90px] max-[768px]:pb-[16px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <ul className="flex items-center justify-between max-[1199px]:flex-wrap max-[1199px]:gap-[50px] max-[768px]:flex-wrap max-[768px]:gap-[20px]">
          {brands.map((img, index) => (
            <li
              key={index}
              className="max-[1199px]:mr-0 max-[768px]:mr-0"
            >
              <img src={img.imgUrl} alt={img.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};