"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Clock, XCircle } from 'lucide-react'
import { getRoleIcon, getStatusBadgeConfig, getLastActiveText } from '@/lib/team-utils'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogOverlay, AlertDialogPortal } from '@radix-ui/react-alert-dialog'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'pending' | 'inactive'
  last_active: string | null
}

interface TeamMemberCardProps {
  member: TeamMember
  onRemove: (memberId: string, memberName: string) => void
  onResendInvitation: (memberName: string) => void
}

export function TeamMemberCard({ member, onRemove, onResendInvitation }: TeamMemberCardProps) {
  const roleConfig = getRoleIcon(member.role)
  const statusConfig = getStatusBadgeConfig(member.status)
  const RoleIcon = roleConfig.Icon

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium">{member.name}</h3>
            <RoleIcon className={roleConfig.className} />
            <span className="text-sm text-gray-600">{member.role}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-3 w-3" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
            <Clock className="h-3 w-3" />
            <span>Last active: {getLastActiveText(member.last_active)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Badge variant={statusConfig.variant} className={statusConfig.className}>
          {statusConfig.label}
        </Badge>
        <div className="flex items-center space-x-1">
          {member.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResendInvitation(member.name)}
            >
              Resend
            </Button>
          )}
          {member.role !== 'Owner' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogPortal>
                <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
                <AlertDialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                  <AlertDialogTitle className="text-lg font-semibold">
                    Remove Member
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-600">
                    Are you sure you want to remove {member.name} from the team? This action cannot be undone.
                  </AlertDialogDescription>
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button 
                        variant="destructive" 
                        onClick={() => onRemove(member.id, member.name)}
                      >
                        Remove
                      </Button>
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  )
}

