"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, CheckCircle, Clock } from 'lucide-react'

interface TeamStatsProps {
  totalMembers: number
  activeMembers: number
  pendingInvites: number
}

export function TeamStats({ totalMembers, activeMembers, pendingInvites }: TeamStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMembers}</div>
          <p className="text-xs text-muted-foreground">
            {activeMembers} active, {pendingInvites} pending
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeMembers}</div>
          <p className="text-xs text-muted-foreground">
            Currently active users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingInvites}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting acceptance
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

