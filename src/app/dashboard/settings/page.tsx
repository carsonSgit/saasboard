import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockProfile } from '@/lib/mocks'
import { User, Mail, CreditCard, Bell } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-sm text-muted-foreground">{mockProfile.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">{mockProfile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Subscription</label>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize">
                  {mockProfile.subscription_tier}
                </Badge>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-muted-foreground">Receive email notifications when sites go down</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">Receive SMS notifications for critical issues</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Get weekly uptime and performance reports</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Billing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Plan</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="capitalize">
                  {mockProfile.subscription_tier}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {mockProfile.subscription_tier === 'free' ? '$0/month' :
                   mockProfile.subscription_tier === 'pro' ? '$15/month' :
                   '$49/month'}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Next Billing Date</label>
              <p className="text-sm text-muted-foreground">
                {mockProfile.subscription_tier === 'free' ? 'N/A' : 'February 1, 2024'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Manage Billing</Button>
              <Button variant="outline">View Invoices</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>API Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Access your monitoring data via our REST API
              </p>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                API Key: sk_live_••••••••••••••••••••••••••••••••
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Regenerate Key</Button>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  )
}
