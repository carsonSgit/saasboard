import { NextRequest } from 'next/server'
import { StripeWebhookService } from '@/services/subscriptions/stripe-webhook.service'
import { apiResponse, apiError } from '@/lib/api/response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!
    
    const service = new StripeWebhookService()
    await service.handleWebhook(body, signature)
    
    return apiResponse({ received: true })
  } catch (error) {
    return apiError(error)
  }
}
