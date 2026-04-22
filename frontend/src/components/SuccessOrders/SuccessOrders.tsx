import type { Order } from "@/types/Order";
import { getOrders } from "@/utils/order";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { CustomSelect } from "../CustomeSelect/CustomeSelect";

const PER_PAGE_OPTIONS = [
  { label: "4", value: "4" },
  { label: "8", value: "8" },
  { label: "16", value: "16" },
];

const statusMap: Record<
  Order["payment_status"],
  string
> = {
  PAID: "text-green-600",
  UNPAID: "text-yellow-600",
  CANCELED: "text-red-600",
};

export const SuccessOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") || "1");
  const perPageParam = searchParams.get("perPage") || "4";
  const perPage = +perPageParam;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders(page, perPage);
      setOrders(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, perPage]);

  useEffect(() => {
    const handleFocus = () => fetchOrders();

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [page, perPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage !== 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }

    setSearchParams(params);
  };

  const handlePerPage = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("perPage", value);
    params.set("page", "1");

    setSearchParams(params);
  };

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return (
      <section className="p-10 text-center flex items-center justify-center flex-col">
        <p className="xl:text-[32px]/[48px] mb-[10px] font-poppins font-semibold">
          No orders yet
        </p>

        <button
          onClick={() => navigate(-1)}
          className="bg-[#0156FF] py-[8px] max-w-[130px] w-[100%] rounded-[20px] text-white text-[14px]/[21px] font-poppins font-normal hover:bg-[#0044cc] transition-all duration-300 ease-in-out cursor-pointer"
        >
          Back
        </button>
      </section>
    );
  }

  return (
    <section className="pb-[50px] pt-[20px]">
      <div className="max-w-[1370px] mx-auto my-0 px-[15px]">
        <h1 className="font-semibold font-poppins text-[18px]/[27px] mb-[13px] xl:text-[32px]/[48px] xl:font-bold xl:mb-[19px]">
          My Orders
        </h1>

        <div className="mb-[20px]">
          <CustomSelect
            value={perPageParam}
            onChange={handlePerPage}
            options={PER_PAGE_OPTIONS}
          />
        </div>

        {orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded flex justify-between flex-wrap items-center">
            <div className="flex flex-col gap-[5px]">
              <p className="font-poppins font-semibold text-[12px]/[22px] xl:text-[14px]/[30px]">
                Order #{order.id}
              </p>

              <p className="font-poppins font-light text-[12px]/[22px] xl:text-[14px]/[30px]">
                Status:{' '}
                <span className={`font-semibold ${statusMap[order.payment_status]}`}>
                  {order.payment_status}
                </span>
              </p>
            </div>

            <div className="max-w-[370px] w-full">
              <Accordion type="single" collapsible className="w-full mb-[10px] md:mb-0">
                <p className="font-poppins font-light text-[12px]/[22px] xl:text-[14px]/[30px] mb-[5px]">
                  Products:
                </p>

                {order.items.map((item) => (
                  <AccordionItem key={item.id} value={`${item.id}`}>
                    <AccordionTrigger className="font-poppins font-light text-[12px]/[22px] xl:text-[14px]/[30px] py-0 px-0">
                      {item.product}
                    </AccordionTrigger>

                    <AccordionContent>
                      <span>
                        {item.quantity} × ${item.unit_price}
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {order.payment_status === "PAID" ? (
              <button
                className="w-[175px] bg-[#0156FF] h-[35px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white cursor-pointer xl:text-[14px]/[21px] xl:py-[5px] hover:bg-[#0044cc] transition-all duration-300 ease-in-out"
                onClick={() => window.open(order.receipt, "_blank")}
              >
                View receipt
              </button>
            ) : (
              <button
                className="w-[175px] bg-[#0156FF] h-[35px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white cursor-pointer xl:text-[14px]/[21px] xl:py-[5px] hover:bg-[#0044cc] transition-all duration-300 ease-in-out"
                onClick={() => window.open(order.payment_url, "_blank")}
              >
                Pay
              </button>
            )}
          </div>
        ))}

        <Pagination
          currentPage={page}
          perPage={perPage}
          itemsLength={orders.length}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};