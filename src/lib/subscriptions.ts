export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    limits: {
      monitors: 1,
      checkInterval: 300, // 5 minutes
      retention: 7, // days
      alerts: false
    }
  },
  pro: {
    name: 'Pro',
    price: 15,
    priceId: 'price_pro_monthly',
    limits: {
      monitors: 10,
      checkInterval: 60, // 1 minute
      retention: 30, // days
      alerts: true
    }
  },
  agency: {
    name: 'Agency',
    price: 49,
    priceId: 'price_agency_monthly',
    limits: {
      monitors: 50,
      checkInterval: 30, // 30 seconds
      retention: 90, // days
      alerts: true
    }
  }
} as const;

export function checkSubscriptionLimit(
  userTier: keyof typeof SUBSCRIPTION_TIERS,
  limitType: keyof typeof SUBSCRIPTION_TIERS.free.limits,
  currentUsage: number
): boolean {
  const limits = SUBSCRIPTION_TIERS[userTier].limits;
  return currentUsage < limits[limitType];
}

export function getSubscriptionTier(userTier: keyof typeof SUBSCRIPTION_TIERS) {
  return SUBSCRIPTION_TIERS[userTier];
}
