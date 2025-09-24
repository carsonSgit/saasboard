import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const STRIPE_CONFIG = {
  products: {
    pro: {
      name: 'Pro Plan',
      description: 'Perfect for growing businesses',
      price: 1500, // $15.00 in cents
      interval: 'month' as const,
    },
    agency: {
      name: 'Agency Plan',
      description: 'For agencies and teams',
      price: 4900, // $49.00 in cents
      interval: 'month' as const,
    },
  },
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
}
