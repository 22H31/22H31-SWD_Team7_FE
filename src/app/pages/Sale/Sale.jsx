import PageLayOut from "../../layouts/PageLayOut/PageLayOut";
import Banner from "./partials/Banner";
import FlashSale from "./partials/FlashSale";
import OnSale from "./partials/OnSale";
import Voucher from "./partials/Vouchers";

import "./sale.css";

export default function SaleSale() {
  return (
    <PageLayOut>
      <div className="sale-page">
       <Banner /> 
       <Voucher />
       <FlashSale />
       <OnSale />
      </div>
    </PageLayOut>
  );
}
