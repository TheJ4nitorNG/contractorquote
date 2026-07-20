export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
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

export interface QuoteState {
  company: CompanyInfo;
  client: ClientInfo;
  items: LineItem[];
  taxRate: number;
  notes: string;
}
