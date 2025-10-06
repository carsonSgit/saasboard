'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageHeader } from '@/components/dashboard/page-header'
import { mockTeamMembers } from '@/lib/mocks'
import { useToast } from '@/components/ui/toast-provider'
import { Search, LogOut, Users } from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogOverlay, AlertDialogPortal } from '@radix-ui/react-alert-dialog'
import { TeamStats } from '@/components/team/team-stats'
import { TeamMemberCard } from '@/components/team/team-member-card'
import { InviteMemberModal } from '@/components/team/invite-member-modal'
import { RolePermissions } from '@/components/team/role-permissions'
import { filterTeamMembers } from '@/lib/team-utils'
import { DesignTokens } from '@/lib/design-tokens'

/**
 * TeamContent - Reusable team management component
 * Can be used with or without DashboardLayout wrapper
 */
export function TeamContent() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [isInviting, setIsInviting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const { addToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')

  const handleLeaveTeam = () => {
    setIsLeaving(true)
    addToast({
      title: 'Team left',
      description: 'You have left the team',
      variant: 'success'
    })
    setIsLeaving(false)
  }

  const handleInviteMember = () => {
    setIsInviting(true)
    // Simulate API call
    setTimeout(() => {
      addToast({
        title: 'Invitation sent',
        description: 'Team member invitation has been sent successfully',
        variant: 'success'
      })
      setIsInviting(false)
    }, 1000)
  }

  const handleRemoveMember = (memberId: string, memberName: string) => {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId))
      addToast({
        title: 'Member removed',
        description: `${memberName} has been removed from the team`,
        variant: 'success'
      })
  }

  const handleResendInvitation = (memberName: string) => {
    addToast({
      title: 'Invitation resent',
      description: `Invitation has been resent to ${memberName}`,
      variant: 'success'
    })
  }

  const filteredTeamMembers = filterTeamMembers(teamMembers, searchTerm)
  const activeMembers = teamMembers.filter(m => m.status === 'active').length
  const pendingInvites = teamMembers.filter(m => m.status === 'pending').length

  return (
    <div className={DesignTokens.spacing.page}>
      {/* Header */}
      <PageHeader
        title="Team"
        subtitle="Manage your team members and their access levels"
      />

        {/* Stats Cards */}
        <TeamStats
          totalMembers={teamMembers.length}
          activeMembers={activeMembers}
          pendingInvites={pendingInvites}
        />

        {/* Team Members List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>
              <div className="flex items-center justify-between mb-2">
                Team Members 
                <InviteMemberModal isInviting={isInviting} onInvite={handleInviteMember} />
              </div>
            </CardTitle>
            
            {/* search bar that searches by name, email, or role */}
            <div className="flex items-center space-x-2">
              <span className="w-full flex items-center relative">
                <Input
                  type="text"
                  placeholder="Search by name, email, or role"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-4 w-4 text-gray-400 absolute right-4 pointer-events-none" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredTeamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onRemove={handleRemoveMember}
                  onResendInvitation={handleResendInvitation}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <RolePermissions />
        
        {/* leave team section */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Team</CardTitle>
          </CardHeader>
          <CardContent>
          <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                            >
                              <LogOut className="h-4 w-4" />
                              Leave Team
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogPortal>
                            <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
                            <AlertDialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                              <AlertDialogTitle className="text-lg font-semibold">
                                Leave Team
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-sm text-gray-600">
                                
                                <Label>Are you sure you want to leave the team?</Label>
                                <Input type="text" placeholder="Enter your email to confirm" />
                                </AlertDialogDescription>
                              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                <AlertDialogCancel asChild>
                                  <Button variant="outline" disabled={isLeaving} onClick={() => setIsLeaving(false)}>Cancel</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button variant="destructive" onClick={() => handleLeaveTeam()}>Yes</Button>
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialogPortal>
                        </AlertDialog>
          </CardContent>
        </Card>
    </div>
  )
}

/**
 * TeamPage - Full page with DashboardLayout wrapper
 * Used for the standalone /dashboard/team route
 */
export default function TeamPage() {
  return (
    <DashboardLayout>
      <TeamContent />
    </DashboardLayout>
  )
}
