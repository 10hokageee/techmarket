import { AccordionContent, AccordionItem, AccordionTrigger, Accordion } from "../ui/accordion";

const items = [
  {
    title: 'Definitions & Interpretation',
    text: `In the following Terms and Conditions of sale, unless the context requires otherwise

      (a) "Shop" means Shop Pty Ltd ABN 11 222 333 444;
      (b) "Customer" means the person or corporation placing an order for the purchase of goods or services from Shop;
      (c) "Products" means any goods, materials, equipment or services provided to the Customer by Shop;
      (d) if the Customer comprises more than one person, each of those person’s liability is joint and several;
      (e) references to a party or a person includes any form of entity and their respective successors, assigns and representatives;
      (f) for all periods and times specified in clauses 5 and 11, time is of the essence; and
      (g) all references to currency are references to Australian dollars.`, id: 'definitions',
  },
  { title: 'General', text: `By ordering the Products and/or accepting delivery of the Products from Shop, the Customer agrees that it is bound by these Terms and Conditions of sale. Customer orders, including orders placed via the internet, are subject to acceptance by Shop. The acceptance of the Customer's order by Shop is expressly made conditional upon the Customer's assent to these Terms and Conditions which will prevail notwithstanding anything that may be stated to the contrary on the Customer's order. Shop reserves the right to vary any of these terms at any time and any subsequent orders placed by the Customer will constitute an acceptance of the terms as varied. Once a Customer order has been placed and accepted by Shop, the Customer agrees that the Customer has no right to cancel or vary the order at any time, unless agreed upon in writing by both parties.`, id: 'general', },

  { title: 'Quotations', text: `Any quotation by Shop to the Customer will be open for acceptance by the Customer within the period stated in the quotation or, where no period is stated, within seven (7) days from the date of the quotation. Thereafter, prices stated in the quotation may be varied by Shop without notice to the Customer`, id: 'quotations', },

  { title: 'Prices / Taxes', text: `The prices charged by and payable to Shop will be the ruling prices applicable at the time of order placement, provided that the Products are accepted for delivery within a reasonable time. Prices are subject to change without notice. Recommended retail prices are provided for indicative purposes only and there is no obligation for Shop to comply with that recommendation. It as agreed that should the Customer fail for any reason to acquire the quantity of Products sold then without limiting Shop' other rights and remedies the unit price charged for the goods sold may be amended to take into account any variation in the total quantity purchased by the Customer. Prices include GST, but do not include any other tax or duty, which is in addition to the price and is to be paid by the Customer at the time of payment for the Products.`, id: 'prices', },

  {
    title: 'Terms of Payment', text: `Credit Card Payments may attract a surcharge, and Shop will inform the Customer if this is to be the case before processing the transaction.

    Unless otherwise agreed in writing by Shop, where Shop has not agreed in writing to provide commercial credit to the Customer, the total purchase price for Products supplied will be due for payment in cash prior to delivery.

    Where Shop has agreed in writing to provide commercial credit to the Customer, the Customer must make payments in accordance with the payment terms provided by Shop.

    Where Shop has approved the provision of a commercial credit arrangement with the Customer but has not provided notice of the payment terms to the Customer, the Customer must pay the total purchase price for Products supplied within seven days of the statement date.

    Credit Card Payment at an Invoice or transaction level may also be offered to the Customer as a stand-alone payment method, or in conjunction with Credit Card Direct Debit Authorisation.`, id: 'termsofpayment',
  },

  { title: 'Credit Accounts', text: `Any commercial credit arrangements that are provided to the Customer by Shop will continue until terminated by Shop at it sole discretion. In the event    that Shop terminates the Customer's commercial credit arrangement, the Customer will be notified in writing and termination will take effect upon receipt of that notification by the Customer.`, id: 'creditaccounts', },
  {
    title: 'Change of Ownership', text: `Trading accounts are approved by Shop based on the information supplied and the representations made by the Customer. In the event that there is a change in ownership of the Customer, whether total or partial, the Customer must immediately provide written notice to Shop informing Shop of these changes. Until Shop receives written notice from the Customer of a change in ownership, the Customer (including where it is a company or trustee, each of the Directors thereof) holds Shop indemnified against any and all losses, unpaid accounts, interest, damages, costs, charges, fees and expenses incurred or suffered by Shop in trading with any person, company (including the same company but with a different shareholder or shareholders) or other entity (including a trust) which may have purchased the Customer's business or any interest in the Customer's business or any of the shares in the Customer and used the Customer's previously approved account for trading.

    Where a Customer has been authorised by Shop to make payments through Credit Card Direct Debit, the Customer must provide notice in writing at least five (5) days prior to any change in ownership of the business to allow Shop sufficient time to contact the new owner to obtain and confirm new Credit Card information if applicable.`,
    id: 'changeofownership',
  },

  { title: 'Information on the Products supplied', text: `All descriptive specifications, illustrations, drawings, data, dimensions and weights furnished by Shop or otherwise contained in catalogues or other advertising material are approximate only and are intended to be merely a general description of the goods, are not incorporated within this agreement and no not form part of the description of the goods sold under this or any other agreement unless otherwise agreed to in writing by Shop in which case such information will be subject to recognised trade tolerances.`, id: 'informationproducts', },
  {
    title: 'Delivery', text: `The means of delivering the Products to the Customer will be at Shop' discretion. Shop reserves the right to deliver Products in part deliveries. In the event that Shop incurs additional costs for meeting special (i.e. Tasmania / Northern Territory Deliveries) or urgent delivery arrangements, these additional costs may be charged to the Customer and may include the cost of airfreight where it is not the normal method of delivery. The Customer agrees to accept delivery of the Products sold at any time during normal business hours.

    Shop will not be liable for any loss or damage resulting from any late delivery of the Products and late delivery will not entitle the Customer to rescind or repudiate the Customer's order for the Products`, id: 'delivery',
  },
];

const links = [
  { title: 'General', to: 'general' },
  { title: 'Quotations', to: 'quotations' },
  { title: 'Prices / Taxes', to: 'prices' },
  { title: 'Terms of Payment', to: 'termsofpayment' },
  { title: 'Credit Accounts', to: 'creditaccounts' },
  { title: 'Change of Ownership', to: 'changeofownership' },
  { title: 'Information on the Products supplied', to: 'informationproducts' },
  { title: 'Delivery', to: 'delivery' },
];

const handleScroll = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()

  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

const renderLinks = () => {
  return (
    <ul className="flex flex-col gap-[12px] bg-[#F5F7FF] px-[16px] py-[25px] xl:gap-[15px]">
      <li className="hidden font-poppins font-semibold text-[12px]/[16px] mb-[12px] md:block xl:text-[14px]/[18px] xl:mb-[15px]">Definitions & Interpretation</li>
      {links.map((item) => (
        <li key={item.title}>
          <a
            href={`#${item.to}`}
            onClick={handleScroll(item.to)}
            className="font-poppins font-normal text-[12px]/[16px] xl:text-[14px]/[18px]"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export const FaqBlock = () => {
  return (
    <section className="pt-[10px] pb-[63px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <div className="flex justify-between">
          <div className="md:max-w-[444px] md:w-[100%] xl:max-w-[1039px]">
            <h1 className="text-[18px]/[27px] font-semibold font-poppins mb-[19px] xl:text-[32px]/[48px] xl:mb-[26px]">Terms & Conditions</h1>

            <Accordion className="mb-[16px] md:hidden" type="single" collapsible defaultValue="shipping">
              <AccordionItem value="Definitions & Interpretation">
                <AccordionTrigger className="text-[14px]/[21px] font-poppins font-semibold bg-[#F5F7FF] rounded-[0px] px-[17px] border-b-[1px] border-b-[#CACDD8]">Definitions & Interpretation</AccordionTrigger>
                <AccordionContent>
                  {renderLinks()}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-[14px]/[21px] font-po ppins font-semibold mb-[25px] xl:text-[24px]/[36px] xl:mb-[19px]">GENERAL TERMS AND CONDITIONS FOR SALE OF PRODUCTS AND SERVICES</h2>
            <ul className="flex flex-col gap-[44px]">
              {items.map(item => (
                <li key={item.title} id={item.id}>
                  <h3 className="font-semibold font-poppins text-[12px]/[26px] mb-[35px] xl:text-[16px]/[26px] xl:mb-[40px]">{item.title}</h3>
                  <p className="font-light font-poppins text-[12px]/[26px] xl:text-[16px]/[26px]">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="hidden md:block">
            {renderLinks()}
          </aside>
        </div>
      </div>
    </section>
  );
}