import { ProfileRepository } from '@/repositories/profile.repository'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import { NotFoundError, ExternalServiceError } from '@/lib/api/errors'
import type Stripe from 'stripe'

export type SubscriptionTier = 'free' | 'pro' | 'agency'

export class SubscriptionService {
  private profileRepo: ProfileRepository

  constructor(useAdmin: boolean = false) {
    this.profileRepo = new ProfileRepository(useAdmin)
  }

  /**
   * Get user's subscription tier
   */
  async getUserTier(userId: string): Promise<SubscriptionTier> {
    const profile = await this.profileRepo.findById(userId)
    
    if (!profile) {
      throw new NotFoundError('User profile')
    }

    return (profile.subscription_tier as SubscriptionTier) || 'free'
  }

  /**
   * Create Stripe checkout session
   */
  async createCheckoutSession(
    userId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<string> {
    const profile = await this.profileRepo.findById(userId)
    
    if (!profile) {
      throw new NotFoundError('User profile')
    }

    let customerId = profile.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await this.createStripeCustomer(
        profile.email,
        profile.full_name || undefined
      )
      customerId = customer.id
      await this.profileRepo.linkStripeCustomer(userId, customerId)
    }

    // Create checkout session
    try {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl
      })

      return session.url!
    } catch (error) {
      console.error('Stripe checkout error:', error)
      throw new ExternalServiceError(
        'Stripe',
        'Failed to create checkout session'
      )
    }
  }

  /**
   * Create Stripe customer portal session
   */
  async createPortalSession(
    userId: string,
    returnUrl: string
  ): Promise<string> {
    const profile = await this.profileRepo.findById(userId)
    
    if (!profile?.stripe_customer_id) {
      throw new NotFoundError('Stripe customer')
    }

    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: returnUrl
      })

      return session.url
    } catch (error) {
      console.error('Stripe portal error:', error)
      throw new ExternalServiceError(
        'Stripe',
        'Failed to create portal session'
      )
    }
  }

  /**
   * Private helper: Create Stripe customer
   */
  private async createStripeCustomer(
    email: string,
    name?: string
  ): Promise<Stripe.Customer> {
    try {
      return await stripe.customers.create({
        email,
        name,
        metadata: {
          source: 'saasboard'
        }
      })
    } catch (error) {
      console.error('Stripe customer creation error:', error)
      throw new ExternalServiceError(
        'Stripe',
        'Failed to create customer'
      )
    }
  }
}

