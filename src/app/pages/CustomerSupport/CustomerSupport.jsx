import PageLayOut from "../../layouts/PageLayOut/PageLayOut";

import "./index.css";
import FAQ from "./partials/FAQ";
import ShippingPolicy from "./partials/ShippingPolicy";

export default function CustomerSupport() {
  return (
    <PageLayOut>
      <div className="customerSupport-page">
        <FAQ />
        <ShippingPolicy/>
      </div>
    </PageLayOut>
  );
}
