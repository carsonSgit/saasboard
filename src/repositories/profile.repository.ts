import { Database } from '@/types/database'
import { BaseRepository } from './base.repository'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export class ProfileRepository extends BaseRepository<Profile> {
  constructor(useAdmin: boolean = false) {
    super('profiles', useAdmin)
  }

  /**
   * Find profile by email
   */
  async findByEmail(email: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .single()

    if (error?.code === 'PGRST116') {
      return null
    }

    this.handleError(error)
    return data
  }

  /**
   * Find profile by Stripe customer ID
   */
  async findByStripeCustomerId(customerId: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single()

    if (error?.code === 'PGRST116') {
      return null
    }

    this.handleError(error)
    return data
  }

  /**
   * Create a profile
   */
  async createProfile(profile: ProfileInsert): Promise<Profile> {
    return await this.create(profile)
  }

  /**
   * Update a profile
   */
  async updateProfile(id: string, profile: ProfileUpdate): Promise<Profile> {
    return await this.update(id, profile)
  }

  /**
   * Update subscription tier
   */
  async updateSubscriptionTier(
    id: string,
    tier: 'free' | 'pro' | 'agency'
  ): Promise<Profile> {
    return await this.update(id, { subscription_tier: tier })
  }

  /**
   * Link Stripe customer ID
   */
  async linkStripeCustomer(
    id: string,
    stripeCustomerId: string
  ): Promise<Profile> {
    return await this.update(id, { stripe_customer_id: stripeCustomerId })
  }
}

