"use client"

import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/toast-provider'
import { mockBillingData } from '@/lib/mocks'
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions'
import { TrendingUp, Monitor, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlanUpgradeModal } from '@/components/forms/plan-upgrade-modal'
import { BillingSettings } from '@/components/forms/billing-settings'
import { UsageCard } from '@/components/billing/usage-card'
import { BillingHistory } from '@/components/billing/billing-history'
import { CurrentPlanCard } from '@/components/billing/current-plan-card'
import { AvailablePlansGrid } from '@/components/billing/available-plans-grid'
import { UpgradeButton, theme } from '@/components/billing/styled-buttons'
import { PageHeader } from '@/components/dashboard/page-header'
import { DesignTokens } from '@/lib/design-tokens'


export function BillingComponent() {  

    const [billingData] = useState(mockBillingData)
    const { addToast } = useToast()
  
    const currentTier = SUBSCRIPTION_TIERS[billingData.current_plan as keyof typeof SUBSCRIPTION_TIERS]
    const usagePercentage = (billingData.usage.monitors / billingData.usage.monitors_limit) * 100
    const checksUsagePercentage = (billingData.usage.checks_this_month / billingData.usage.checks_limit) * 100
  
    const handleUpgrade = (planKey?: string) => {
      if (planKey) {
        setSelectedUpgradePlan(planKey)
      } else {
        // Default to next tier up
        const currentPlanIndex = Object.keys(SUBSCRIPTION_TIERS).indexOf(billingData.current_plan)
        const nextPlan = Object.keys(SUBSCRIPTION_TIERS)[currentPlanIndex + 1]
        setSelectedUpgradePlan(nextPlan || Object.keys(SUBSCRIPTION_TIERS)[1])
      }
      setIsUpgradeModalOpen(true)
    }
  
    const handleManageBilling = () => {
      addToast({
        title: 'Billing portal',
        description: 'Opening billing management portal...',
        variant: 'success'
      })
    }
  
    const handleDownloadInvoice = (invoiceId: string) => {
      addToast({
        title: 'Download started',
        description: `Invoice ${invoiceId} is being downloaded`,
        variant: 'success'
      })
    }


    // Billing management state
    const [billingName, setBillingName] = useState('Jane Smith')
    const [email, setEmail] = useState('jane.smith@example.com')
    const [cardNumber, setCardNumber] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvc, setCvc] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('United States')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Plan upgrade modal state
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
    const [selectedUpgradePlan, setSelectedUpgradePlan] = useState('')


return (
<div className={DesignTokens.spacing.page}>
        {/* Header */}
        <PageHeader
          title="Billing & Usage"
          subtitle="Manage your subscription and view usage details"
          actions={
            <UpgradeButton onClick={() => handleUpgrade()} style={{ backgroundColor: theme.colors.plum6, color: theme.colors.plum12 }}>
              <TrendingUp className="h-4 w-4" />
              Upgrade Plan
            </UpgradeButton>
          }
        />

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="billing-settings">Billing Settings</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
          
          {/* Tab Content Container with consistent scrollbar */}
          <div className="min-h-[600px] pr-2">

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 pb-6">

            {/* Usage Statistics */}
            <div className="grid gap-6 md:grid-cols-2">
              <UsageCard
                icon={Monitor}
                iconColor="text-blue-500"
                title="Monitor Usage"
                used={billingData.usage.monitors}
                limit={billingData.usage.monitors_limit}
              />
              
              <UsageCard
                icon={Clock}
                iconColor="text-green-500"
                title="Check Usage"
                used={billingData.usage.checks_this_month}
                limit={billingData.usage.checks_limit}
              />
            </div>

            {/* Billing History */}
            <BillingHistory
              invoices={billingData.invoices}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </TabsContent>

          {/* Billing Settings Tab */}
          <TabsContent value="billing-settings">
            <BillingSettings
              billingName={billingName}
              setBillingName={setBillingName}
              email={email}
              setEmail={setEmail}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiration={expiration}
              setExpiration={setExpiration}
              cvc={cvc}
              setCvc={setCvc}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              zipCode={zipCode}
              setZipCode={setZipCode}
              country={country}
              setCountry={setCountry}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errors={errors}
              setErrors={setErrors}
            />
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <CurrentPlanCard
              currentPlan={currentTier}
              nextBillingDate={billingData.next_billing_date}
              paymentMethod="•••• 4242"
            />
            
            <div className="pt-2">
              <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
              <AvailablePlansGrid
                plans={SUBSCRIPTION_TIERS}
                currentPlan={billingData.current_plan}
                onUpgrade={handleUpgrade}
              />
            </div>
          </TabsContent>
          </div>
        </Tabs>

        {/* Plan Upgrade Modal */}
        <PlanUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          currentPlan={billingData.current_plan}
          selectedPlan={selectedUpgradePlan}
          onPlanSelect={setSelectedUpgradePlan}
          billingData={{
            billingName,
            email,
            cardNumber,
            expiration,
            cvc,
            streetAddress,
            city,
            state,
            zipCode,
            country
          }}
        />
      </div>
);
}

export default BillingComponent;