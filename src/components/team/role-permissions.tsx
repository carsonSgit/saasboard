"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown, Shield, Eye } from 'lucide-react'

export function RolePermissions() {
  const roles = [
    {
      icon: Crown,
      iconColor: 'text-yellow-500',
      name: 'Owner',
      permissions: [
        'Full access to all features',
        'Manage team members',
        'Billing and subscription',
        'Delete account'
      ]
    },
    {
      icon: Shield,
      iconColor: 'text-blue-500',
      name: 'Admin',
      permissions: [
        'Create and manage monitors',
        'View all analytics',
        'Manage incidents',
        'Invite team members'
      ]
    },
    {
      icon: Eye,
      iconColor: 'text-gray-500',
      name: 'Viewer',
      permissions: [
        'View monitors and status',
        'View analytics and reports',
        'View incidents',
        'Read-only access'
      ]
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div key={role.name} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${role.iconColor}`} />
                  <h3 className="font-semibold">{role.name}</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {role.permissions.map((permission, index) => (
                    <li key={index}>• {permission}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

