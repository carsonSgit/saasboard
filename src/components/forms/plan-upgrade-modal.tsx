"use client"

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/toast-provider'
import { getSubscriptionTier, SUBSCRIPTION_TIERS } from '@/lib/subscriptions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Lock, Building, ChevronDown, ArrowLeft, Star, Info } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { green, blue, red, amber, slate, gray, indigo, blackA, mint, yellow, plum } from '@radix-ui/colors'
import styled from 'styled-components'
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { mockBillingData } from '@/lib/mocks'

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

const SubscribeButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.green4} !important;
  color: ${theme.colors.green12} !important;
}`

const BackButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.gray4} !important;
  color: ${theme.colors.gray12} !important;
}`

interface BillingData {
    billingName: string
    email: string
    cardNumber: string
    expiration: string
    cvc: string
    streetAddress: string
    city: string
    state: string
    zipCode: string
    country: string
}

interface PlanUpgradeModalProps {
    isOpen: boolean
    onClose: () => void
    currentPlan: string
    selectedPlan: string
    onPlanSelect: (plan: string) => void
    billingData?: BillingData
}

export function PlanUpgradeModal({ isOpen, onClose, currentPlan, selectedPlan, onPlanSelect, billingData }: PlanUpgradeModalProps) {
    const { addToast } = useToast()
    
    // Form state - initialize with billing data if available
    const [email, setEmail] = useState(billingData?.email || 'carsonspriggs6@gmail.com')
    const [cardNumber, setCardNumber] = useState(billingData?.cardNumber || '')
    const [expiration, setExpiration] = useState(billingData?.expiration || '')
    const [cvc, setCvc] = useState(billingData?.cvc || '')
    const [cardholderName, setCardholderName] = useState(billingData?.billingName || '')
    const [country, setCountry] = useState(billingData?.country || 'Canada')
    const [address, setAddress] = useState(billingData?.streetAddress || '')
    const [saveInfo, setSaveInfo] = useState(false)
    const [isBusiness, setIsBusiness] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})


    // Ensure we have a valid selected plan, default to the first available upgrade plan
    const availablePlans = Object.keys(SUBSCRIPTION_TIERS).filter(key => key !== currentPlan)
    const validSelectedPlan = selectedPlan && availablePlans.includes(selectedPlan) ? selectedPlan : availablePlans[0]
    
    const selectedTier = getSubscriptionTier(validSelectedPlan as keyof typeof SUBSCRIPTION_TIERS)
    const currentTier = getSubscriptionTier(currentPlan as keyof typeof SUBSCRIPTION_TIERS)

    // Auto-select first available plan when modal opens
    useEffect(() => {
        if (isOpen && !selectedPlan) {
            const availablePlans = Object.keys(SUBSCRIPTION_TIERS).filter(key => key !== currentPlan)
            if (availablePlans.length > 0) {
                onPlanSelect(availablePlans[0])
            }
        }
    }, [isOpen, selectedPlan, currentPlan, onPlanSelect])

    // Update form fields when billing data changes
    useEffect(() => {
        if (billingData) {
            setEmail(billingData.email || '')
            setCardNumber(billingData.cardNumber || '')
            setExpiration(billingData.expiration || '')
            setCvc(billingData.cvc || '')
            setCardholderName(billingData.billingName || '')
            setCountry(billingData.country || 'Canada')
            setAddress(billingData.streetAddress || '')
        }
    }, [billingData])

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
        
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address'
        if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
        else if (!validateCardNumber(cardNumber)) newErrors.cardNumber = 'Please enter a valid card number'
        if (!expiration.trim()) newErrors.expiration = 'Expiration date is required'
        else if (!validateExpiration(expiration)) newErrors.expiration = 'Please enter a valid expiration date'
        if (!cvc.trim()) newErrors.cvc = 'CVC is required'
        else if (cvc.length < 3) newErrors.cvc = 'CVC must be at least 3 digits'
        if (!cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required'
        if (!address.trim()) newErrors.address = 'Address is required'
        if (!country.trim()) newErrors.country = 'Country is required'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubscribe = async () => {
        if (!validateForm()) return
        
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            addToast({
                title: 'Subscription successful',
                description: `Successfully upgraded to ${selectedTier.name} plan!`,
                variant: 'success'
            })
            onClose()
        } catch (error) {
            addToast({
                title: 'Subscription failed',
                description: 'There was an error processing your subscription. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return v
        }
    }

    return (
        <div id="plan-upgrade-modal">   
        <Dialog open={isOpen} onOpenChange={onClose} >
                <DialogOverlay style={{ backgroundColor: theme.colors.blackA7 }} />
                <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                    <div className="flex">
                        {/* Left Section - Subscription Summary */}
                        <div className="w-1/2 p-8 bg-gray-50 border-r">
                            {/* Plan Selection */}
                            <div className="space-y-4">
                                    <Label className="text-lg font-medium">Select Plan</Label>
                                    <div className="space-y-3 mt-2">
                                        {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => {
                                            if (key === currentPlan) return null
                                            return (
                                                <div 
                                                    key={key} 
                                                     className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                                                         validSelectedPlan === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                                     }`}
                                                     onClick={() => onPlanSelect(key)}
                                                 >
                                                     <Checkbox 
                                                         id={`plan-${key}`}
                                                         checked={validSelectedPlan === key}
                                                         onCheckedChange={(checked) => {
                                                             if (checked) {
                                                                 onPlanSelect(key)
                                                             }
                                                         }}
                                                     />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor={`plan-${key}`} className="font-medium cursor-pointer">
                                                                {tier.name}
                                                            </Label>
                                                            <div className="text-right">
                                                                <div className="font-medium text-sm">${tier.price}/month</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            {tier.limits.checkInterval === 30 ? '30-second' : tier.limits.checkInterval === 60 ? '1-minute' : '5-minute'} checks • {tier.limits.retention}-day retention • {tier.limits.alerts ? 'Email alerts' : 'No alerts'} • {tier.limits.monitors} monitors
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            <div className="mt-4 mb-2">
                                <h1 className="text-lg font-medium mb-2">Subscribe to {selectedTier.name} plan</h1>
                            </div>

                            {/* Subscription Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{selectedTier.name}</div>
                                        <div className="text-sm text-gray-600">Billed monthly</div>
                                    </div>
                                    <div className="font-regular text-sm">CAD${selectedTier.price}.00</div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Subtotal</span>
                                    <div className="font-regular text-sm">CAD${selectedTier.price}.00</div>
                                </div>
                                
                                <div className="flex justify-between items-center" id="tax-tooltip-container">
                                    <div className="flex items-center space-x-1">
                                        <span>Tax</span>
                                        <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-gray-500" />
                                            </TooltipTrigger>
                                            <TooltipContent sticky="always" side="top" avoidCollisions={true} collisionBoundary={document.getElementById('tax-tooltip-container')} style={{ backgroundColor: theme.colors.gray4 }}>
                                                <p>Tax is calculated based on the address entered</p>
                                                <TooltipArrow style={{ fill: theme.colors.gray4}}/>
                                            </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        
                                    </div>
                                    <span className="text-gray-500">Enter address to calculate</span>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center font-bold text-lg">
                                        <span>Total due today</span>
                                        <span>US${selectedTier.price}.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Features */}
                            <div className="space-y-3">
                                <h3 className="font-medium">Plan includes:</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{selectedTier.limits.monitors} monitors</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{selectedTier.limits.checkInterval === 30 ? '30-second' : selectedTier.limits.checkInterval === 60 ? '1-minute' : '5-minute'} checks</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{selectedTier.limits.retention}-day data retention</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>{selectedTier.limits.alerts ? 'Email alerts' : 'No alerts'}</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>API access</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Section - Contact and Payment Information */}
                        <div className="w-1/2 p-8">
                            <div className="space-y-6">
                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium">Contact information</Label>
                                    <div>
                                        <Input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            type="email"
                                            className={errors.email ? 'border-red-500' : ''}
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                

                                {/* Payment Method */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium">Payment method</Label>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <Input 
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                placeholder="1234 1234 1234 1234"
                                                maxLength={19}
                                                className={errors.cardNumber ? 'border-red-500' : ''}
                                            />
                                            {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>Visa</span>
                                            <span>•</span>
                                            <span>Mastercard</span>
                                            <span>•</span>
                                            <span>American Express</span>
                                            <span>•</span>
                                            <span>Discover</span>
                                            <span>•</span>
                                            <span>UnionPay</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Input 
                                                    value={expiration}
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
                                                    placeholder="MM / YY"
                                                    maxLength={5}
                                                    className={errors.expiration ? 'border-red-500' : ''}
                                                />
                                                {errors.expiration && <p className="text-sm text-red-500 mt-1">{errors.expiration}</p>}
                                            </div>
                                            <div className="relative">
                                                <Input 
                                                    value={cvc}
                                                    onChange={(e) => setCvc(e.target.value)}
                                                    placeholder="CVC"
                                                    maxLength={4}
                                                    className={errors.cvc ? 'border-red-500' : ''}
                                                />
                                                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                {errors.cvc && <p className="text-sm text-red-500 mt-1">{errors.cvc}</p>}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Input 
                                                value={cardholderName}
                                                onChange={(e) => setCardholderName(e.target.value)}
                                                placeholder="Full name on card"
                                                className={errors.cardholderName ? 'border-red-500' : ''}
                                            />
                                            {errors.cardholderName && <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium">Billing address</Label>
                                    
                                    <div className="space-y-3">
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
                                        
                                        <div>
                                            <Input 
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Address"
                                                className={errors.address ? 'border-red-500' : ''}
                                            />
                                            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                                        </div>
                                        
                                        <div className="text-sm text-blue-600 cursor-pointer hover:underline">
                                            Enter address manually
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Options */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="save-info"
                                            checked={saveInfo}
                                            onCheckedChange={(checked) => setSaveInfo(checked === true)}
                                        />
                                        <Label htmlFor="save-info" className="text-sm">
                                            Save my information for faster checkout
                                        </Label>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Pay securely at SaaSBoard and everywhere Link is accepted.
                                    </p>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="business"
                                            checked={isBusiness}
                                            onCheckedChange={(checked) => setIsBusiness(checked === true)}
                                        />
                                        <Label htmlFor="business" className="text-sm">
                                            I'm purchasing as a business
                                        </Label>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p>
                                        You'll be charged the amount and at the frequency listed above until you cancel. 
                                        We may change our prices as described in our Terms of Use. You can cancel any time. 
                                        By subscribing, you agree to SaaSBoard's Terms of Use and Privacy Policy, and you 
                                        authorize us to store your payment method for renewals and other purchases.
                                    </p>
                                </div>

                                {/* Subscribe Button */}
                                <SubscribeButton 
                                    onClick={handleSubscribe}
                                    disabled={isLoading}
                                    className="w-full h-12 text-lg"
                                    style={{ backgroundColor: theme.colors.green6, color: theme.colors.green12 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        'Subscribe'
                                    )}
                                </SubscribeButton>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                                    <span>Powered by stripe</span>
                                    <div className="flex items-center space-x-4">
                                        <span className="cursor-pointer hover:underline">Terms</span>
                                        <span className="cursor-pointer hover:underline">Privacy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
        </Dialog>
        </div>
    )
}
