"use client"

import { useState } from 'react'
import { useToast } from '@/components/ui/toast-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { green, blue, red, amber, slate, gray, indigo, blackA, mint, yellow, plum } from '@radix-ui/colors'
import styled from 'styled-components'

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

const SaveButton = styled(Button)`
&:hover {
  background-color: ${theme.colors.green4} !important;
  color: ${theme.colors.green12} !important;
}`

interface BillingSettingsProps {
    billingName: string
    setBillingName: (value: string) => void
    email: string
    setEmail: (value: string) => void
    cardNumber: string
    setCardNumber: (value: string) => void
    expiration: string
    setExpiration: (value: string) => void
    cvc: string
    setCvc: (value: string) => void
    streetAddress: string
    setStreetAddress: (value: string) => void
    city: string
    setCity: (value: string) => void
    state: string
    setState: (value: string) => void
    zipCode: string
    setZipCode: (value: string) => void
    country: string
    setCountry: (value: string) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    errors: Record<string, string>
    setErrors: (value: Record<string, string>) => void
}

export function BillingSettings({
    billingName,
    setBillingName,
    email,
    setEmail,
    cardNumber,
    setCardNumber,
    expiration,
    setExpiration,
    cvc,
    setCvc,
    streetAddress,
    setStreetAddress,
    city,
    setCity,
    state,
    setState,
    zipCode,
    setZipCode,
    country,
    setCountry,
    isLoading,
    setIsLoading,
    errors,
    setErrors
}: BillingSettingsProps) {
    const { addToast } = useToast()

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
        <Card>
            <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <p className="text-gray-600 mt-1">Update your payment information and billing details.</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
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
            </CardContent>
        </Card>
    )
}
