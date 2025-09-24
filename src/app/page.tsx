import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, TrendingUp, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SaaSBoard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Know instantly when your website goes down
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful analytics dashboards that impress your clients. Monitor uptime, 
            track performance, and get alerts when sites go down.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Monitoring Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Dashboard
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-lg w-fit group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="group-hover:text-blue-600 transition-colors">Real-time Monitoring</CardTitle>
              <CardDescription>
                Get instant alerts when your websites go down with 99.9% accuracy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
            <CardHeader>
              <div className="p-3 bg-green-100 rounded-lg w-fit group-hover:bg-green-200 transition-colors">
                <Clock className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="group-hover:text-green-600 transition-colors">Performance Tracking</CardTitle>
              <CardDescription>
                Monitor response times and track performance trends over time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
            <CardHeader>
              <div className="p-3 bg-purple-100 rounded-lg w-fit group-hover:bg-purple-200 transition-colors">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="group-hover:text-purple-600 transition-colors">Beautiful Dashboards</CardTitle>
              <CardDescription>
                Impress your clients with professional analytics and reports
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pricing */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">$0<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>1 Monitor</li>
                  <li>5-minute checks</li>
                  <li>7-day retention</li>
                  <li>Basic alerts</li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="text-3xl font-bold">$15<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>10 Monitors</li>
                  <li>1-minute checks</li>
                  <li>30-day retention</li>
                  <li>Email alerts</li>
                </ul>
                <Button className="w-full mt-6">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agency</CardTitle>
                <CardDescription>For agencies and teams</CardDescription>
                <div className="text-3xl font-bold">$49<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>50 Monitors</li>
                  <li>30-second checks</li>
                  <li>90-day retention</li>
                  <li>Advanced alerts</li>
                </ul>
                <Button className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
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
  );
}
