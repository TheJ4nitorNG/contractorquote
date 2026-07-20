"use client";

import React, { useRef } from "react";
import { CompanyForm } from "./CompanyForm";
import { ClientForm } from "./ClientForm";
import { LineItems } from "./LineItems";
import { QuotePreview } from "./QuotePreview";
import { useQuote } from "@/context/QuoteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export function QuoteBuilder() {
  const { quote, updateTaxRate, updateNotes } = useQuote();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Quote-${quote.client.name || "Client"}`,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      {/* Builder Form Side */}
      <div className="w-full lg:w-1/2 space-y-6">
        <CompanyForm />
        <ClientForm />
        <LineItems />
        
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input 
                id="taxRate" 
                type="number" 
                min="0"
                step="0.1"
                value={quote.taxRate || ""} 
                onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)} 
                placeholder="e.g. 8.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={quote.notes} 
                onChange={(e) => updateNotes(e.target.value)} 
                placeholder="Any additional notes or terms..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Side */}
      <div className="w-full lg:w-1/2 relative">
        <div className="sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Live Preview</h2>
            <Button onClick={() => handlePrint()} className="gap-2 shadow-md">
              <Printer className="w-4 h-4" /> Export to PDF
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-gray-100 p-2 sm:p-4 max-h-[85vh] overflow-y-auto">
            {/* The scaled down preview container, though max-h handles scrolling */}
            <div className="shadow-lg mx-auto">
              <QuotePreview ref={contentRef} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button onClick={() => handlePrint()} size="lg" className="rounded-full shadow-2xl gap-2 px-6">
          <Printer className="w-5 h-5" /> Export PDF
        </Button>
      </div>
    </div>
  );
}
