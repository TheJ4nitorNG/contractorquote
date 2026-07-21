export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
}

export interface ClientInfo {
  name: string;
  projectAddress: string;
  date: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type DocumentType = 'quote' | 'rate_sheet';
export type RateType = 'hourly' | 'daily' | 'flat';

export interface QuoteState {
  documentType: DocumentType;
  rateType: RateType;
  company: CompanyInfo;
  client: ClientInfo;
  items: LineItem[];
  taxRate: number;
  notes: string;
}
