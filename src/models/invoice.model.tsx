export interface IInvoice {
  id?: string
  name: string
  createdAt: string
  validUntil: string
  recipient: IInvoiceCompany | undefined
  sender: IInvoiceCompany | undefined
  items: IInvoiceItem[]
}

export interface IInvoiceItem {
  id?: string
  name: string
  tax: number | null
  price: number | null
  unit: string
  amount: number | null
}

export interface IInvoiceCompany {
  bankAccount: string
  city: string
  companyName: string
  email: string
  id?: string
  nip: string
  phone: string
  postcode: string
  street: string
}
