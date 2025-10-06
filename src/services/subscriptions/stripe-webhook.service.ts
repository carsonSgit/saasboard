import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import { ProfileRepository } from '@/repositories/profile.repository'
import { AuthorizationError, DatabaseError } from '@/lib/api/errors'
import type Stripe from 'stripe'

export class StripeWebhookService {
  private profileRepo: ProfileRepository

  constructor() {
    this.profileRepo = new ProfileRepository(true) // Use admin client
  }

  /**
   * Verify and handle Stripe webhook
   */
  async handleWebhook(body: string, signature: string): Promise<void> {
    // Verify webhook signature
    const event = this.verifyWebhook(body, signature)

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.handleSubscriptionChange(
          event.data.object as Stripe.Subscription
        )
        break

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        )
        break

      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  }

  /**
   * Verify webhook signature
   */
  private verifyWebhook(body: string, signature: string): Stripe.Event {
    try {
      return stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_CONFIG.webhookSecret
      )
    } catch (error) {
      console.error('Webhook verification failed:', error)
      throw new AuthorizationError('Invalid webhook signature')
    }
  }

  /**
   * Handle subscription created/updated
   */
  private async handleSubscriptionChange(
    subscription: Stripe.Subscription
  ): Promise<void> {
    const customerId = subscription.customer as string
    const profile = await this.profileRepo.findByStripeCustomerId(customerId)

    if (!profile) {
      console.error('No profile found for customer:', customerId)
      return
    }

    // Determine tier from price ID
    const tier = this.determineTierFromSubscription(subscription)

    // Update subscription tier
    await this.profileRepo.updateSubscriptionTier(profile.id, tier)
    
    console.log(`Updated subscription for user ${profile.id} to ${tier}`)
  }

  /**
   * Handle subscription deleted
   */
  private async handleSubscriptionDeleted(
    subscription: Stripe.Subscription
  ): Promise<void> {
    const customerId = subscription.customer as string
    const profile = await this.profileRepo.findByStripeCustomerId(customerId)

    if (!profile) {
      console.error('No profile found for customer:', customerId)
      return
    }

    // Downgrade to free tier
    await this.profileRepo.updateSubscriptionTier(profile.id, 'free')
    
    console.log(`Downgraded user ${profile.id} to free tier`)
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    console.log('Payment succeeded for invoice:', invoice.id)
    // TODO: Send payment confirmation email
    // TODO: Update payment history
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    console.log('Payment failed for invoice:', invoice.id)
    // TODO: Send payment failure notification
    // TODO: Implement retry logic
  }

  /**
   * Determine subscription tier from Stripe subscription
   */
  private determineTierFromSubscription(
    subscription: Stripe.Subscription
  ): 'free' | 'pro' | 'agency' {
    if (subscription.items.data.length === 0) {
      return 'free'
    }

    const priceId = subscription.items.data[0].price.id

    // Map price IDs to tiers
    if (priceId.includes('pro') || priceId === STRIPE_CONFIG.proPriceId) {
      return 'pro'
    } else if (
      priceId.includes('agency') ||
      priceId === STRIPE_CONFIG.agencyPriceId
    ) {
      return 'agency'
    }

    return 'free'
  }
}

