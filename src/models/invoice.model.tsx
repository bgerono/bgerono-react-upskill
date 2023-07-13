export interface IInvoice {
  id: string
  items: IInvoiceItem[] | undefined
  name: string
  createdAt: string
  validUntil: string
  recipient?: InvoiceRecipient
  sender?: InvoiceSender
}

export interface IInvoiceItem {
  id: string
  name: string
  amount: number | undefined
  unit: string
  tax: number | undefined
  price: number | undefined
}

export interface InvoiceRecipient {
  bankAccount: number
  city: string
  companyName: string
  email: string
  id: string
  nip: number
  phone: string
  postcode: string
  street: string
}

export interface InvoiceSender {
  bankAccount: number
  city: string
  companyName: string
  email: string
  id: string
  nip: number
  phone: string
  postcode: string
  street: string
}
