"use client"

import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/toast-provider'
import { mockBillingData } from '@/lib/mock-data'
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Download, Calendar, CheckCircle, TrendingUp, Monitor, Clock, XCircle, Clock2, X, Building, Lock, Star, ChevronDown } from 'lucide-react'
import { Dialog,DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PlanUpgradeModal } from '@/components/forms/plan-upgrade-modal'
import { green, blue, red, amber, slate ,gray,indigo, blackA, mint, yellow, plum} from '@radix-ui/colors'
import styled, { ThemeProvider } from 'styled-components'
import { Progress, ProgressIndicator, Indicator } from '@radix-ui/react-progress'

const theme = {
    colors: {
        ...green,
        ...blue,
        ...red,
        ...amber,
        ...slate,
        ...gray,
        ...indigo,
        ...blackA,
        ...mint,
        ...yellow,
        ...plum,
    }
}

const BillingButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.blue4} !important;
  color: ${theme.colors.blue12} !important;
}`

const SaveButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.green4} !important;
  color: ${theme.colors.green12} !important;
}`

const CloseButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.red4} !important;
  color: ${theme.colors.red12} !important;
}`

const UpgradeButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.plum4} !important;
  color: ${theme.colors.plum12} !important;
}`

const ExportButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.gray4} !important;
  color: ${theme.colors.gray12} !important;
}`

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

    // Animated progress for checks usage
    const [animatedChecksProgress, setAnimatedChecksProgress] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => setAnimatedChecksProgress(billingData.usage.checks_this_month), 500)
        return () => clearTimeout(timer)
    }, [billingData.usage.checks_this_month])

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

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateCardNumber = (cardNumber: string) => {
        const cleanNumber = cardNumber.replace(/\s/g, '')
        return cleanNumber.length >= 13 && cleanNumber.length <= 19
    }

    const validateExpiration = (expiration: string) => {
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expRegex.test(expiration)) return false
        
        const [month, year] = expiration.split('/')
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1
        
        const expYear = parseInt(year)
        const expMonth = parseInt(month)
        
        return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        
        if (!billingName.trim()) newErrors.billingName = 'Full name is required'
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address'
        if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
        else if (!validateCardNumber(cardNumber)) newErrors.cardNumber = 'Please enter a valid card number'
        if (!expiration.trim()) newErrors.expiration = 'Expiration date is required'
        else if (!validateExpiration(expiration)) newErrors.expiration = 'Please enter a valid expiration date'
        if (!cvc.trim()) newErrors.cvc = 'CVC is required'
        else if (cvc.length < 3) newErrors.cvc = 'CVC must be at least 3 digits'
        if (!streetAddress.trim()) newErrors.streetAddress = 'Street address is required'
        if (!city.trim()) newErrors.city = 'City is required'
        if (!state.trim()) newErrors.state = 'State is required'
        if (!zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
        if (!country.trim()) newErrors.country = 'Country is required'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSaveBilling = async () => {
        if (!validateForm()) return
        
        setIsLoading(true)
        try {
            // Simulate API call to update billing information
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            addToast({
                title: 'Billing information updated',
                description: 'Your payment information has been successfully updated.',
                variant: 'success'
            })
        } catch (error) {
            addToast({
                title: 'Update failed',
                description: 'There was an error updating your billing information. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

return (
<div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Usage</h1>
            <p className="text-gray-600 mt-1">
              Manage your subscription and view usage details
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
                <DialogTrigger asChild>
                    <BillingButton style={{ backgroundColor: theme.colors.blue5, color: theme.colors.blue12 }}>
                        <CreditCard className="h-4 w-4" />
                        Manage Billing
                    </BillingButton>
                </DialogTrigger>
                <DialogPortal>
                    <DialogOverlay style={{ backgroundColor: theme.colors.blackA7}}/>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <DialogTitle className="text-2xl font-bold">Manage Billing</DialogTitle>
                                        <p className="text-gray-600 mt-1">Update your payment information and billing details.</p>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Billed to</Label>
                                <div className="grid grid-cols-1 gap-2 my-2">
                                    <div>
                                        <Input 
                                            value={billingName}
                                            onChange={(e) => setBillingName(e.target.value)}
                                            placeholder="Full name as it appears on card"
                                            className={errors.billingName ? 'border-red-500' : ''}
                                        />
                                        {errors.billingName && <p className="text-sm text-red-500 mt-1">{errors.billingName}</p>}
                                    </div>
                                    <div>
                                        <Input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            type="email"
                                            className={errors.email ? 'border-red-500' : ''}
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Payment Method</Label>

                                <div className="grid grid-cols-1 gap-2 my-2">
                                    <div>
                                        <Input 
                                            value={cardNumber}
                                            onKeyDown={(e) => {
                                                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                                  e.preventDefault();
                                                }
                                              }}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="Card number"
                                            maxLength={19}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className={errors.cardNumber ? 'border-red-500' : ''}
                                        />
                                        {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Input 
                                                value={expiration}
                                                onKeyDown={(e) => {
                                                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                                      e.preventDefault();
                                                    }
                                                  }}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    if (value.length === 2) {
                                                        setExpiration(value + '/')
                                                    } else {
                                                        setExpiration(value)
                                                    }
                                                    if (value.length < expiration.length) {
                                                        if (value.slice(-1) === '/') {
                                                            setExpiration(value.slice(0, -1))
                                                        }
                                                    }
                                                }}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                inputMode="numeric"
                                                pattern="[0-9/]*"
                                                className={errors.expiration ? 'border-red-500' : ''}
                                            />
                                            {errors.expiration && <p className="text-sm text-red-500 mt-1">{errors.expiration}</p>}
                                        </div>
                                        <div>
                                            <Input 
                                                value={cvc}
                                                onKeyDown={(e) => {
                                                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                                      e.preventDefault();
                                                    }
                                                  }}
                                                onChange={(e) => setCvc(e.target.value)}
                                                placeholder="CVC"
                                                maxLength={4}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className={errors.cvc ? 'border-red-500' : ''}
                                            />
                                            {errors.cvc && <p className="text-sm text-red-500 mt-1">{errors.cvc}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>Visa</span>
                                        <span>•</span>
                                        <span>Mastercard</span>
                                        <span>•</span>
                                        <span>American Express</span>
                                        <span>•</span>
                                        <span>Discover</span>
                                    </div>
                                </div>
                            </div>

                            {/* Billing Address Section */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Billing Address</Label>
                                <div className="grid grid-cols-1 gap-2 my-2">
                                    <div>
                                        <Input 
                                            value={streetAddress}
                                            onChange={(e) => setStreetAddress(e.target.value)}
                                            placeholder="Street address"
                                            autoComplete="street-address"
                                            className={errors.streetAddress ? 'border-red-500' : ''}
                                        />
                                        {errors.streetAddress && <p className="text-sm text-red-500 mt-1">{errors.streetAddress}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Input 
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="City"
                                                autoComplete="city"
                                                className={errors.city ? 'border-red-500' : ''}
                                            />
                                            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <Input 
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                placeholder="State"
                                                autoComplete="state"
                                                className={errors.state ? 'border-red-500' : ''}
                                            />
                                            {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Input 
                                                value={zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}
                                                placeholder="ZIP code"
                                                autoComplete="postal-code"
                                                className={errors.zipCode ? 'border-red-500' : ''}
                                            />
                                            {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="outline"
                                                    className="w-full justify-between h-10"
                                                    style={{ 
                                                        borderColor: errors.country ? theme.colors.red5 : undefined,
                                                        fontWeight: 'normal'
                                                    }}
                                                >
                                                    {country}
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full">
                                                <DropdownMenuItem onClick={() => setCountry('United States')}>
                                                    United States
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setCountry('Canada')}>
                                                    Canada
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setCountry('United Kingdom')}>
                                                    United Kingdom
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setCountry('Australia')}>
                                                    Australia
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setCountry('Germany')}>
                                                    Germany
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setCountry('France')}>
                                                    France
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className="bg-blue-50 p-4 rounded-lg my-2">
                                <div className="flex items-start space-x-3">
                                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-900">Secure Payment Processing</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Your payment information is encrypted and processed securely by Stripe. 
                                            We never store your complete card details on our servers.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <DialogClose asChild>
                                    <Button variant="outline" disabled={isLoading}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <SaveButton 
                                    onClick={handleSaveBilling}
                                    disabled={isLoading}
                                    style={{ backgroundColor: theme.colors.green6, color: theme.colors.green12 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            Save Changes
                                        </>
                                    )}
                                </SaveButton>
                            </div>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
            
            <UpgradeButton onClick={() => handleUpgrade()} style={{ backgroundColor: theme.colors.plum6, color: theme.colors.plum12 }}>
              <TrendingUp className="h-4 w-4" />
              Upgrade Plan
            </UpgradeButton>
          </div>
        </div>

        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              <Badge variant="default" className="capitalize" style={{ backgroundColor: theme.colors.blue5, color: theme.colors.blue12 }}>
                {currentTier.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    ${currentTier.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {currentTier.limits.monitors} monitors • {currentTier.limits.checkInterval === 30 ? '30-second' : currentTier.limits.checkInterval === 60 ? '1-minute' : '5-minute'} checks
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Next billing: {new Date(billingData.next_billing_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Payment method: •••• 4242
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Plan Features</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{currentTier.limits.monitors} monitors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{currentTier.limits.retention}-day data retention</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{currentTier.limits.alerts ? 'Email alerts' : 'No alerts'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>API access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-blue-500" />
                <span>Monitor Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monitors Used</span>
                  <span className="text-sm text-gray-600">
                    {billingData.usage.monitors} / {billingData.usage.monitors_limit}
                  </span>
                </div>
                
                <Progress value={usagePercentage} max={100} style={{ height: '8px', borderRadius: '9999px', backgroundColor: theme.colors.gray3, overflow: 'hidden', position: 'relative' }}>
                    <ProgressIndicator style={{ backgroundColor: theme.colors.green8, borderRadius: '9999px', transition: 'all 0.3s ease-in-out', height: '100%', width: '100%', transform: `translateX(-${100 - usagePercentage}%)` }} />
                </Progress>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {usagePercentage.toFixed(1)}% used
                  </span>
                  <span className="text-gray-600">
                    {billingData.usage.monitors_limit - billingData.usage.monitors} remaining
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span>Check Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Checks This Month</span>
                  <span className="text-sm text-gray-600">
                    {billingData.usage.checks_this_month.toLocaleString()} / {billingData.usage.checks_limit.toLocaleString()}
                  </span>
                </div>
                    
                <Progress 
                    value={animatedChecksProgress} 
                    max={billingData.usage.checks_limit} 
                    style={{ 
                        height: '8px', 
                        borderRadius: '9999px', 
                        backgroundColor: theme.colors.gray3,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <ProgressIndicator 
                        style={{ 
                            backgroundColor: theme.colors.green8,
                            borderRadius: '9999px',
                            transition: 'all 0.3s ease-in-out',
                            height: '100%',
                            width: '100%',
                            transform: `translateX(-${100 - (animatedChecksProgress / billingData.usage.checks_limit) * 100}%)`
                        }}
                    />
                </Progress>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {checksUsagePercentage.toFixed(1)}% used
                  </span>
                  <span className="text-gray-600">
                    {(billingData.usage.checks_limit - billingData.usage.checks_this_month).toLocaleString()} remaining
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Billing History</span>
              <ExportButton style={{ backgroundColor: theme.colors.gray5, color: theme.colors.gray12 }} size="sm">
                Export All
              </ExportButton>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingData.invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {invoice.status === 'Pending' && <div className="p-2 rounded-lg bg-yellow-100">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>}
                    {invoice.status === 'Failed' && <div className="p-2 rounded-lg bg-red-100">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>}
                    {invoice.status === 'Paid' && <div className="p-2 rounded-lg bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>}
                    <div>
                      <h3 className="font-medium">Invoice #{invoice.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(invoice.date).toLocaleDateString()} • ${invoice.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Badge style={{ backgroundColor: invoice.status === 'Pending' ? theme.colors.yellow5 : invoice.status === 'Failed' ? theme.colors.red5 : theme.colors.green5, color: invoice.status === 'Pending' ? theme.colors.yellow12 : invoice.status === 'Failed' ? theme.colors.red12 : theme.colors.green12 }}>
                      {invoice.status}
                    </Badge>
                    <ExportButton
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
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

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
                <div key={key} className={`p-6 border rounded-lg ${
                  key === billingData.current_plan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold mb-4">
                      ${tier.price}
                      <span className="text-lg font-normal text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li>• {tier.limits.monitors} monitors</li>
                      <li>• {tier.limits.checkInterval === 30 ? '30-second' : tier.limits.checkInterval === 60 ? '1-minute' : '5-minute'} checks</li>
                      <li>• {tier.limits.retention}-day retention</li>
                      <li>• {tier.limits.alerts ? 'Email alerts' : 'No alerts'}</li>
                    </ul>
                    <Button
                      variant={key === billingData.current_plan ? 'outline' : 'default'}
                      className="w-full"
                      disabled={key === billingData.current_plan}
                      onClick={key !== billingData.current_plan ? () => handleUpgrade(key) : undefined}
                    >
                      {key === billingData.current_plan ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Upgrade Modal */}
        <PlanUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          currentPlan={billingData.current_plan}
          selectedPlan={selectedUpgradePlan}
          onPlanSelect={setSelectedUpgradePlan}
        />
      </div>
);
}

export default BillingComponent;