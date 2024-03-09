import React from 'react';
interface ReportsPriceBreakdownProps {
  subTotal: number;
  discount: number;
  total: number;
  containerStyles: string;
}

export const ReportsPriceBreakdown: React.FC<ReportsPriceBreakdownProps> = ({
  subTotal,
  discount,
  total,
  containerStyles,
}) => {
  return (
    <div
      className={`w-full md:w-[80%] border rounded-xl border-solid px-5 py-3 border-greenText bg-[#EEFFFC] grid grid-cols-[auto_auto] ${containerStyles}`}
    >
      <p>Subtotal:</p>
      <p>₦ {subTotal} </p>
      <p>Discount:</p>
      <p className="text-[red]">- ₦ {discount}</p>
      <p className="text-2xl">Total</p>
      <p className="text-2xl">₦ {total}</p>
    </div>
  );
};
