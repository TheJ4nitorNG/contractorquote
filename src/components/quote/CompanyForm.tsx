"use client";

import { useQuote } from "@/context/QuoteContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CompanyForm() {
  const { quote, updateCompany } = useQuote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCompany({ ...quote.company, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompany({ ...quote.company, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyLogo">Company Logo</Label>
          <div className="flex items-center gap-4">
            {quote.company.logoUrl && (
              <img src={quote.company.logoUrl} alt="Logo preview" className="w-12 h-12 object-contain border rounded" />
            )}
            <Input id="companyLogo" type="file" accept="image/*" onChange={handleLogoUpload} className="cursor-pointer" />
            {quote.company.logoUrl && (
               <Button variant="outline" onClick={() => updateCompany({ ...quote.company, logoUrl: "" })}>
                 Remove
               </Button>
            )}
          </div>
        </div>
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
