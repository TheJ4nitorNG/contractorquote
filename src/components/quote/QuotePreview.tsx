"use client";

import React, { forwardRef } from "react";
import { useQuote } from "@/context/QuoteContext";
import { formatCurrency } from "@/lib/utils";

export const QuotePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { quote, subtotal, taxAmount, grandTotal } = useQuote();
  const { company, client, items, taxRate, notes, documentType, rateType } = quote;

  const docTitle = documentType === 'quote' ? 'Quote' : 'Rate Sheet';
  const qtyLabel = rateType === 'hourly' ? 'Hours' : rateType === 'daily' ? 'Days' : 'Qty';
  const priceLabel = rateType === 'hourly' ? 'Hourly Rate' : rateType === 'daily' ? 'Daily Rate' : 'Unit Price';

  return (
    <div ref={ref} className="bg-white p-8 sm:p-12 text-black max-w-4xl mx-auto shadow-sm min-h-[1056px] print:shadow-none print:p-0 print:bg-white print:text-black">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-8 mb-8">
        <div className="flex gap-4 items-center">
          {company.logoUrl && (
            <img src={company.logoUrl} alt={`${company.name} Logo`} className="w-20 h-20 object-contain" />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight print:text-black">{company.name || "Company Name"}</h1>
            <div className="mt-4 text-gray-600 space-y-1 print:text-black">
              <p>{company.address}</p>
              <p>{company.email}</p>
              <p>{company.phone}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-gray-400 uppercase tracking-widest print:text-gray-500">{docTitle}</h2>
          <div className="mt-4 text-gray-600 print:text-black">
            <p><span className="font-semibold">Date:</span> {client.date}</p>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 print:text-black">Prepared For:</h3>
        <div className="text-gray-600 space-y-1 print:text-black">
          <p className="font-medium text-gray-900 print:text-black">{client.name || "Client Name"}</p>
          <p>{client.projectAddress || "Project Address"}</p>
        </div>
      </div>

      {/* Line Items */}
      <table className="w-full mb-8 text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-3 font-semibold text-gray-900 print:text-black">Description</th>
            <th className="py-3 font-semibold text-gray-900 text-center print:text-black">{qtyLabel}</th>
            <th className="py-3 font-semibold text-gray-900 text-right print:text-black">{priceLabel}</th>
            <th className="py-3 font-semibold text-gray-900 text-right print:text-black">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-4 text-gray-800 print:text-black">{item.description}</td>
              <td className="py-4 text-gray-800 text-center print:text-black">{item.quantity}</td>
              <td className="py-4 text-gray-800 text-right print:text-black">{formatCurrency(item.unitPrice)}</td>
              <td className="py-4 text-gray-800 text-right print:text-black">{formatCurrency(item.total)}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-400 italic print:text-gray-500">No items added to this document yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full sm:w-1/2 md:w-1/3 space-y-3">
          <div className="flex justify-between text-gray-600 print:text-black">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 print:text-black">
            <span>Tax ({taxRate}%):</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3 print:text-black">
            <span>Total:</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="border-t pt-8 mt-8">
          <h4 className="font-semibold text-gray-900 mb-2 print:text-black">Notes:</h4>
          <p className="text-gray-600 whitespace-pre-wrap print:text-black">{notes}</p>
        </div>
      )}
    </div>
  );
});

QuotePreview.displayName = "QuotePreview";
