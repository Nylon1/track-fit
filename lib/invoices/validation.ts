import { z } from "zod";
import { calculateTotals } from "./money";
const address = z.object({
  line1: z.string().default(""),
  line2: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  postcode: z.string().optional(),
});
const item = z
  .object({
    id: z.string().optional(),
    description: z.string().trim().min(1),
    quantityMilli: z.number().int().positive(),
    unit: z.string().trim().min(1),
    unitPricePence: z.number().int().nonnegative(),
    discountType: z.enum(["none", "percentage", "fixed"]),
    discountValue: z.number().int().nonnegative(),
    vatRateBps: z.literal(0),
    position: z.number().int().nonnegative(),
  })
  .refine((x) => x.discountType !== "percentage" || x.discountValue <= 10000, {
    message: "Discount cannot exceed 100%",
  });
export const invoiceInputSchema = z
  .object({
    leadId: z.string().uuid().nullish(),
    status: z.enum([
      "draft",
      "issued",
      "part_paid",
      "paid",
      "overdue",
      "cancelled",
      "credited",
    ]),
    invoiceType: z.enum([
      "full",
      "deposit",
      "balance",
      "part_payment",
      "paid",
      "credit_note",
    ]),
    invoiceDate: z.iso.date(),
    dueDate: z.iso.date(),
    customerName: z.string().trim().min(1),
    companyName: z.string().optional(),
    customerEmail: z.union([z.literal(""), z.email()]).optional(),
    customerTelephone: z.string().optional(),
    billingAddress: address,
    installationAddress: address,
    purchaseOrder: z.string().optional(),
    customerReference: z.string().optional(),
    jobDescription: z.string().optional(),
    customerNotes: z.string().optional(),
    internalNotes: z.string().optional(),
    paymentTerms: z.string().optional(),
    paymentMessage: z.string().optional(),
    paymentReference: z.string().optional(),
    paymentMethod: z.string().optional(),
    amountPaidPence: z.number().int().nonnegative(),
    depositRequiredPence: z.number().int().nonnegative(),
    discountType: z.enum(["none", "percentage", "fixed"]),
    discountValue: z.number().int().nonnegative(),
    globalVatRateBps: z.number().int().min(0).max(10000).nullish(),
    items: z.array(item).min(1),
  })
  .superRefine((x, c) => {
    if (x.dueDate < x.invoiceDate)
      c.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "Due date cannot be before invoice date",
      });
    const t = calculateTotals(x.items, x.amountPaidPence, {
      type: x.discountType,
      value: x.discountValue,
    });
    if (t.totalPence < 0)
      c.addIssue({
        code: "custom",
        path: ["items"],
        message: "Total cannot be negative",
      });
    if (x.amountPaidPence > t.totalPence)
      c.addIssue({
        code: "custom",
        path: ["amountPaidPence"],
        message: "Amount paid cannot exceed invoice total",
      });
    x.items.forEach((line, index) => {
      const gross = Math.round(
        (line.quantityMilli * line.unitPricePence) / 1000,
      );
      if (line.discountType === "fixed" && line.discountValue > gross)
        c.addIssue({
          code: "custom",
          path: ["items", index, "discountValue"],
          message: "Discount cannot exceed line subtotal",
        });
    });
    if (x.discountType === "percentage" && x.discountValue > 10000)
      c.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "Invoice discount cannot exceed 100%",
      });
    const beforeInvoiceDiscount = calculateTotals(x.items, 0).netPence;
    if (x.discountType === "fixed" && x.discountValue > beforeInvoiceDiscount)
      c.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "Invoice discount cannot exceed net subtotal",
      });
  });
