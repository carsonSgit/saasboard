'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockTeamMembers } from '@/lib/mock-data'
import { useToast } from '@/components/ui/toast-provider'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  UserPlus, 
  Mail, 
  Crown, 
  Shield, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Search,
  LogOut
} from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogOverlay, AlertDialogPortal } from '@radix-ui/react-alert-dialog'
import styled from 'styled-components'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Toast } from '@/components/ui/toast'
import { ToastDescription } from '@radix-ui/react-toast'
function init(){
  document.documentElement.style.scrollbarGutter = 'auto'
}

export default function TeamPage() {
  useEffect(() => {
    init()
  }, [])

  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [isInviting, setIsInviting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const { addToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner':
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 'Admin':
        return <Shield className="h-4 w-4 text-blue-500" />
      case 'Viewer':
        return <Eye className="h-4 w-4 text-gray-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLastActiveText = (lastActive: string | null) => {
    if (!lastActive) return 'Never'
    
    const now = new Date()
    const lastActiveDate = new Date(lastActive)
    const diffMs = now.getTime() - lastActiveDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return lastActiveDate.toLocaleDateString()
  }

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

  const filteredTeamMembers = teamMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase()))

  const activeMembers = teamMembers.filter(m => m.status === 'active').length
  const pendingInvites = teamMembers.filter(m => m.status === 'pending').length

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600 mt-1">
              Manage your team members and their access levels
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
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

        {/* Team Members List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>
              <div className="flex items-center justify-between mb-2">
                Team Members 
            
                <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                            >
                              <UserPlus className="h-4 w-4" />
                              Invite Member
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogPortal>
                            <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
                            <AlertDialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                              <AlertDialogTitle className="text-lg font-semibold">
                                Invite Member
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-sm text-gray-600">
                                <div className="mt-1 space-y-4">
                                <Label htmlFor="email">Email</Label>
                                <Input className="mt-1" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={(value) => setRole(value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                  <SelectContent className="w-auto">
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                  </SelectContent>
                                </Select>
                                </div>
                              </AlertDialogDescription>
                              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                <AlertDialogCancel asChild>
                                  <Button variant="outline">Cancel</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button variant="default" onClick={handleInviteMember} disabled={isInviting}>Invite</Button>
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialogPortal>
                        </AlertDialog>
            
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
            <div className="space-y-2 ">
              {filteredTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{member.name}</h3>
                        {getRoleIcon(member.role)}
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
                    {getStatusBadge(member.status)}
                    <div className="flex items-center space-x-1">
                      {member.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResendInvitation(member.name)}
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
                                    onClick={() => handleRemoveMember(member.id, member.name)}
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Owner</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Manage team members</li>
                  <li>• Billing and subscription</li>
                  <li>• Delete account</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Admin</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create and manage monitors</li>
                  <li>• View all analytics</li>
                  <li>• Manage incidents</li>
                  <li>• Invite team members</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Viewer</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• View monitors and status</li>
                  <li>• View analytics and reports</li>
                  <li>• View incidents</li>
                  <li>• Read-only access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
