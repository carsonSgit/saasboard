"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle, Clock, XCircle } from 'lucide-react'
import { gray } from '@radix-ui/colors'
import styled from 'styled-components'
import { Button } from '@/components/ui/button'

const theme = {
  colors: { ...gray }
}

const ExportButton = styled(Button)`
  &:hover {
    background-color: ${theme.colors.gray4} !important;
    color: ${theme.colors.gray12} !important;
  }
`

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'Paid' | 'Pending' | 'Failed'
}

interface BillingHistoryProps {
  invoices: Invoice[]
  onDownloadInvoice: (invoiceId: string) => void
}

export function BillingHistory({ invoices, onDownloadInvoice }: BillingHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <div className="p-2 rounded-lg bg-yellow-100">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
        )
      case 'Failed':
        return (
          <div className="p-2 rounded-lg bg-red-100">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
        )
      case 'Paid':
        return (
          <div className="p-2 rounded-lg bg-green-100">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Billing History</span>
          <ExportButton 
            style={{ backgroundColor: theme.colors.gray5, color: theme.colors.gray12 }} 
            size="sm"
          >
            Export All
          </ExportButton>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(invoice.status)}
                <div>
                  <h3 className="font-medium">Invoice #{invoice.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString()} • ${invoice.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <ExportButton
                  size="sm"
                  onClick={() => onDownloadInvoice(invoice.id)}
                  style={{ backgroundColor: theme.colors.gray3, color: theme.colors.gray12 }}
                >
                  <Download className="h-4 w-4" />
                </ExportButton>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

