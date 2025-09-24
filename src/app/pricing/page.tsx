import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Check, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started",
      features: [
        "1 Monitor",
        "5-minute check intervals",
        "7-day data retention",
        "Basic status alerts",
        "Email support"
      ],
      limitations: [
        "Limited to 1 website",
        "No advanced analytics",
        "No team collaboration"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: 15,
      description: "For growing businesses",
      features: [
        "10 Monitors",
        "1-minute check intervals",
        "30-day data retention",
        "Email & SMS alerts",
        "Advanced analytics",
        "API access",
        "Priority support"
      ],
      limitations: [],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Agency",
      price: 49,
      description: "For agencies and teams",
      features: [
        "50 Monitors",
        "30-second check intervals",
        "90-day data retention",
        "All alert types",
        "White-label dashboards",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SaaSBoard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your needs. All plans include our core monitoring features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-500">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my limits?</h3>
              <p className="text-gray-600 text-sm">
                We'll notify you when you're approaching your limits. You can upgrade your plan to continue monitoring.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Monitor className="h-6 w-6" />
            <span className="text-xl font-bold">SaaSBoard</span>
          </div>
          <p className="text-gray-400">© 2024 SaaSBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
