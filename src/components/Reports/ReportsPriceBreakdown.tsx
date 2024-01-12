import React from "react";

export const ReportsPriceBreakdown = ({ subTotal, discount, total }: any) => {
  return (
    <div className="gap justify-between grid grid-auto  md:grid-cols-2 mt-6">
      <div className="border rounded-xl border-solid px-5 py-3 bg-[edfffc] border-ce-green grid grid-cols-[auto_auto]">
        <p>Subtotal:</p>
        <p>₦ {subTotal} </p>
        <p>Discount:</p>
        <p>₦ {discount}</p>
        <p className="text-2xl">Total</p>
        <p className="text-2xl">₦ {total}</p>
      </div>
    </div>
  );
};
