"use client";

import { useQuote } from "@/context/QuoteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ClientForm() {
  const { quote, updateClient } = useQuote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateClient({ ...quote.client, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Name</Label>
          <Input id="clientName" name="name" value={quote.client.name} onChange={handleChange} placeholder="Client Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientProjectAddress">Project Address</Label>
          <Input id="clientProjectAddress" name="projectAddress" value={quote.client.projectAddress} onChange={handleChange} placeholder="Project Address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientDate">Date</Label>
          <Input id="clientDate" name="date" type="date" value={quote.client.date} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  );
}
