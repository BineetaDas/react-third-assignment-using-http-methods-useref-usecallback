import React, { useCallback, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ShoppingBag } from "lucide-react";

import OrderSummary from "../../components/largeForm/OrderSummary";
import OptimizerForm from "../../components/largeForm/OptimizerForm";
import type { FormData } from "../../types/interface/formTypes";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  productName: "",
  category: "Electronics",
  quantity: 1,
  price: 1000,
  discount: 0,
};

const LargeFormOptimizer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "quantity" || name === "price" || name === "discount"
            ? Number(value)
            : value,
      }));

      setSubmitted(false);
    },
    [],
  );

  // Calculate subtotal, discount and final total
  const { subtotal, discountAmount, totalCost } = useMemo(() => {
    const subtotal = formData.quantity * formData.price;
    const discountAmount = (subtotal * formData.discount) / 100;

    return {
      subtotal,
      discountAmount,
      totalCost: subtotal - discountAmount,
    };
  }, [formData.quantity, formData.price, formData.discount]);

  // Handle form submission
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  // Reset form
  const handleReset = useCallback(() => {
    setFormData({ ...initialFormData });
    setSubmitted(false);
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 py-8 text-[#21152B] sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Simple Header */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6F6678]">
              React Practice
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Large Form Optimizer
            </h1>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D7FF64]">
            <ShoppingBag size={23} />
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.8fr_1.5fr]">
          <OrderSummary
            formData={formData}
            subtotal={subtotal}
            discountAmount={discountAmount}
            totalCost={totalCost}
          />

          <OptimizerForm
            formData={formData}
            submitted={submitted}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
      </div>
    </main>
  );
};

export default LargeFormOptimizer;
