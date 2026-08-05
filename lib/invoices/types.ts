export const invoiceStatuses = [
  "draft",
  "issued",
  "part_paid",
  "paid",
  "overdue",
  "cancelled",
  "credited",
] as const;
export const invoiceTypes = [
  "full",
  "deposit",
  "balance",
  "part_payment",
  "paid",
  "credit_note",
] as const;
export type InvoiceStatus = (typeof invoiceStatuses)[number];
export type InvoiceType = (typeof invoiceTypes)[number];
export type Address = {
  line1: string;
  line2?: string;
  city?: string;
  county?: string;
  postcode?: string;
};
export type InvoiceItem = {
  id?: string;
  description: string;
  quantityMilli: number;
  unit: string;
  unitPricePence: number;
  discountType: "none" | "percentage" | "fixed";
  discountValue: number;
  vatRateBps: number;
  position: number;
};
export type InvoiceInput = {
  leadId?: string | null;
  status: InvoiceStatus;
  invoiceType: InvoiceType;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  companyName?: string;
  customerEmail?: string;
  customerTelephone?: string;
  billingAddress: Address;
  installationAddress: Address;
  purchaseOrder?: string;
  customerReference?: string;
  jobDescription?: string;
  customerNotes?: string;
  internalNotes?: string;
  paymentTerms?: string;
  paymentMessage?: string;
  paymentReference?: string;
  paymentMethod?: string;
  amountPaidPence: number;
  depositRequiredPence: number;
  discountType: "none" | "percentage" | "fixed";
  discountValue: number;
  globalVatRateBps?: number | null;
  items: InvoiceItem[];
};
export type InvoiceDiscount={type:"none"|"percentage"|"fixed";value:number};
export type Totals = {
  subtotalPence: number;
  discountPence: number;
  netPence: number;
  vatPence: number;
  totalPence: number;
  amountPaidPence: number;
  balanceDuePence: number;
};
export type InvoiceSettings = {
  business_name: string;
  trading_name: string;
  business_address: Address;
  telephone: string;
  email: string;
  website: string;
  company_number: string;
  bank_details: {
    account_name?: string;
    sort_code?: string;
    account_number?: string;
  };
  payment_instructions: string;
  invoice_footer: string;
  logo_path: string;
};
