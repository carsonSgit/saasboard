export interface Invoice {
  id: string
  date: string
  amount: number
  status: string
  download_url: string
}

export interface BillingUsage {
  monitors: number
  monitors_limit: number
  checks_this_month: number
  checks_limit: number
}

export interface BillingData {
  current_plan: string
  next_billing_date: string
  amount: number
  currency: string
  invoices: Invoice[]
  usage: BillingUsage
}

export const mockBillingData: BillingData = {
  current_plan: 'pro',
  next_billing_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  amount: 15.00,
  currency: 'USD',
  invoices: [
    {
      id: 'inv_001',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Pending',
      download_url: '#',
    },
    {
      id: 'inv_002',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Failed',
      download_url: '#',
    },
    {
      id: 'inv_003',
      date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 15.00,
      status: 'Paid',
      download_url: '#',
    },
  ],
  usage: {
    monitors: 3,
    monitors_limit: 10,
    checks_this_month: 4320,
    checks_limit: 43200,
  },
}

