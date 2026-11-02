import React from "react";
import { Calculator } from "lucide-react";
import type { OrderSummaryProps } from "../../types/interface/formTypes";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  subtotal,
  discountAmount,
  totalCost,
}) => {
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <aside className="rounded-3xl bg-[#21152B] p-6 text-[#F7F4EF] shadow-lg sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C8BDCF]">
            Order Summary
          </p>
          <h2 className="mt-2 text-xl font-bold">Total Amount</h2>
        </div>

        <Calculator size={24} className="text-[#D7FF64]" />
      </div>

      <p className="mt-8 wrap-break-word text-4xl font-bold text-[#D7FF64] sm:text-5xl">
        {formatCurrency(totalCost)}
      </p>

      <div className="my-8 border-t border-white/15" />

      <div className="space-y-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[#C8BDCF]">Quantity</span>
          <span>{formData.quantity}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-[#C8BDCF]">Price per Item</span>
          <span>{formatCurrency(formData.price)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-[#C8BDCF]">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-[#C8BDCF]">
            Discount ({formData.discount}%)
          </span>
          <span className="font-semibold text-[#D7FF64]">
            -{formatCurrency(discountAmount)}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-white/15" />

      <div className="flex justify-between gap-4 font-semibold">
        <span>Final Total</span>
        <span className="text-[#D7FF64]">{formatCurrency(totalCost)}</span>
      </div>
    </aside>
  );
};

export default OrderSummary;
