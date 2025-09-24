import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_CONFIG.webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Get user by Stripe customer ID
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!profile) {
    console.error('No profile found for customer:', customerId)
    return
  }

  // Determine subscription tier based on price
  let tier = 'free'
  if (subscription.items.data.length > 0) {
    const priceId = subscription.items.data[0].price.id
    if (priceId.includes('pro')) {
      tier = 'pro'
    } else if (priceId.includes('agency')) {
      tier = 'agency'
    }
  }

  // Update user subscription tier
  await supabaseAdmin
    .from('profiles')
    .update({ subscription_tier: tier })
    .eq('id', profile.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Get user by Stripe customer ID
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!profile) {
    console.error('No profile found for customer:', customerId)
    return
  }

  // Downgrade to free tier
  await supabaseAdmin
    .from('profiles')
    .update({ subscription_tier: 'free' })
    .eq('id', profile.id)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Handle successful payment
  console.log('Payment succeeded for invoice:', invoice.id)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Handle failed payment
  console.log('Payment failed for invoice:', invoice.id)
}
