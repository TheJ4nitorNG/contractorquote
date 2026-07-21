"use client";

import { useQuote } from "@/context/QuoteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function LineItems() {
  const { quote, addLineItem, updateLineItem, removeLineItem } = useQuote();

  const handleAdd = () => {
    addLineItem({
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  const qtyLabel = quote.rateType === 'hourly' ? 'Hours' : quote.rateType === 'daily' ? 'Days' : 'Qty';
  const priceLabel = quote.rateType === 'hourly' ? 'Hourly Rate' : quote.rateType === 'daily' ? 'Daily Rate' : 'Unit Price';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">{qtyLabel}</TableHead>
              <TableHead className="w-[150px]">{priceLabel}</TableHead>
              <TableHead className="w-[150px]">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                    placeholder="Service or material"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity || ""}
                    onChange={(e) => updateLineItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice || ""}
                    onChange={(e) => updateLineItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                  />
                </TableCell>
                <TableCell>
                  {formatCurrency(item.total)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeLineItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleAdd} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </CardContent>
    </Card>
  );
}
