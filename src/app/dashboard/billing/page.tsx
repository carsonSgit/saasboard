'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { mockBillingData } from '@/lib/mock-data'
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions'
import { useToast } from '@/components/ui/toast-provider'
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Monitor,
  Clock,
  Mail,
  ExternalLink
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import TeamPage from '../team/page'
import BillingComponent from './billing_component'

export default function BillingPage() {


  return (
      <DashboardLayout>
    <div style={{ width: '90%', margin: '0 auto'}}>
        <Tabs defaultValue="current-plan">
        <TabsList>
          <TabsTrigger value="current-plan">Billing</TabsTrigger>
          <TabsTrigger value="team-workspace">Team/Workspace</TabsTrigger>
        </TabsList>
        <TabsContent value="current-plan" className="mt-6">
          <BillingComponent />
      </TabsContent>
      <TabsContent value="team-workspace" className="mt-6">
        <TeamPage />
      </TabsContent>
      </Tabs>
      </div>
      </DashboardLayout>
  )
}
