import React from 'react';
import numeral from 'numeral';
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
      className={`w-full md:w-[80%] max-w-[500px] border rounded-xl border-solid px-5 py-3 border-greenText bg-[#EEFFFC] grid grid-cols-[auto_auto] ${containerStyles}`}
    >
      <p>Subtotal:</p>
      <p>₦ {numeral(subTotal).format('0,0.00')}</p>
      <p>Discount:</p>
      <p className="text-[red]">- ₦ {numeral(discount).format('0,0.00')}</p>
      <p className="text-2xl">Total</p>
      <p className="text-2xl"> ₦ {numeral(total).format('0,0.00')}</p>
    </div>
  );
};
