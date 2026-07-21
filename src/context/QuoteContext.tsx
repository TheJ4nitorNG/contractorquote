"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { QuoteState, CompanyInfo, ClientInfo, LineItem, DocumentType, RateType } from "@/lib/types";

interface QuoteContextType {
  quote: QuoteState;
  updateDocumentType: (type: DocumentType) => void;
  updateRateType: (type: RateType) => void;
  updateCompany: (company: CompanyInfo) => void;
  updateClient: (client: ClientInfo) => void;
  addLineItem: (item: LineItem) => void;
  updateLineItem: (id: string, updatedItem: Partial<LineItem>) => void;
  removeLineItem: (id: string) => void;
  updateTaxRate: (rate: number) => void;
  updateNotes: (notes: string) => void;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
}

const defaultState: QuoteState = {
  documentType: "quote",
  rateType: "flat",
  company: { name: "", email: "", phone: "", address: "", logoUrl: "" },
  client: { name: "", projectAddress: "", date: new Date().toISOString().split("T")[0] },
  items: [],
  taxRate: 0,
  notes: "",
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quote, setQuote] = useState<QuoteState>(defaultState);

  const updateDocumentType = (documentType: DocumentType) => {
    setQuote((prev) => ({ ...prev, documentType }));
  };

  const updateRateType = (rateType: RateType) => {
    setQuote((prev) => ({ ...prev, rateType }));
  };

  const updateCompany = (company: CompanyInfo) => {
    setQuote((prev) => ({ ...prev, company }));
  };

  const updateClient = (client: ClientInfo) => {
    setQuote((prev) => ({ ...prev, client }));
  };

  const addLineItem = (item: LineItem) => {
    setQuote((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  const updateLineItem = (id: string, updatedItem: Partial<LineItem>) => {
    setQuote((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem, total: (updatedItem.quantity ?? item.quantity) * (updatedItem.unitPrice ?? item.unitPrice) } : item
      ),
    }));
  };

  const removeLineItem = (id: string) => {
    setQuote((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateTaxRate = (taxRate: number) => {
    setQuote((prev) => ({ ...prev, taxRate }));
  };

  const updateNotes = (notes: string) => {
    setQuote((prev) => ({ ...prev, notes }));
  };

  const subtotal = useMemo(() => {
    return quote.items.reduce((sum, item) => sum + item.total, 0);
  }, [quote.items]);

  const taxAmount = useMemo(() => {
    return subtotal * (quote.taxRate / 100);
  }, [subtotal, quote.taxRate]);

  const grandTotal = useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);

  const value: QuoteContextType = {
    quote,
    updateDocumentType,
    updateRateType,
    updateCompany,
    updateClient,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateTaxRate,
    updateNotes,
    subtotal,
    taxAmount,
    grandTotal,
  };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};
