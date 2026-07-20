"use client";

import { useQuote } from "@/context/QuoteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function CompanyForm() {
  const { quote, updateCompany } = useQuote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCompany({ ...quote.company, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Name</Label>
          <Input id="companyName" name="name" value={quote.company.name} onChange={handleChange} placeholder="Company Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyEmail">Email</Label>
          <Input id="companyEmail" name="email" value={quote.company.email} onChange={handleChange} placeholder="company@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyPhone">Phone</Label>
          <Input id="companyPhone" name="phone" value={quote.company.phone} onChange={handleChange} placeholder="(555) 555-5555" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Address</Label>
          <Input id="companyAddress" name="address" value={quote.company.address} onChange={handleChange} placeholder="123 Main St, City, ST 12345" />
        </div>
      </CardContent>
    </Card>
  );
}
