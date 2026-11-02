import React from "react";
import { CheckCircle2, RotateCcw, ShoppingBag, UserRound } from "lucide-react";

import type { OptimizerFormProps } from "../../types/interface/formTypes";

const OptimizerForm: React.FC<OptimizerFormProps> = ({
  formData,
  submitted,
  handleChange,
  handleSubmit,
  handleReset,
}) => {
  const inputClass =
    "w-full rounded-xl border border-[#E7DFD5] bg-[#FDFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#8AAE25] focus:ring-2 focus:ring-[#D7FF64]/40";

  const labelClass = "mb-2 block text-sm font-medium";

  return (
    <section className="rounded-3xl border border-[#E7DFD5] bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <UserRound size={22} />
        <h2 className="text-xl font-bold">Customer Details</h2>
      </div>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Customer Details */}
        <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-7 border-t border-[#E7DFD5]" />

        {/* Product Details */}
        <div className="mb-4 flex items-center gap-3">
          <ShoppingBag size={20} />
          <h3 className="font-bold">Product Details</h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="productName" className={labelClass}>
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className={labelClass}>
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="price" className={labelClass}>
              Price (₹)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="discount" className={labelClass}>
              Discount (%)
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.discount}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Success Message */}
        {submitted && (
          <div
            role="status"
            className="mt-6 flex items-center gap-2 rounded-xl bg-[#F0F8E5] p-4 text-sm font-medium text-[#344A16]"
          >
            <CheckCircle2 size={19} />
            Form submitted successfully!
          </div>
        )}

        {/* Buttons */}
        <div className="mt-7 flex flex-col gap-3 border-t border-[#E7DFD5] pt-6 sm:flex-row">
          <button
            type="submit"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D7FF64] px-5 py-3.5 text-sm font-bold transition hover:bg-[#c9f34f]"
          >
            <CheckCircle2 size={18} />
            Submit Form
          </button>

          <button
            type="reset"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E7DFD5] px-5 py-3.5 text-sm font-semibold transition hover:bg-[#F7F4EF]"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default OptimizerForm;
