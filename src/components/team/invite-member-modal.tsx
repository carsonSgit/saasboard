"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogOverlay, AlertDialogPortal } from '@radix-ui/react-alert-dialog'
import { UserPlus } from 'lucide-react'

interface InviteMemberModalProps {
  isInviting: boolean
  onInvite: () => void
}

export function InviteMemberModal({ isInviting, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
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
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  className="mt-1" 
                  type="email" 
                  placeholder="jane@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div>
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
            </div>
          </AlertDialogDescription>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="default" onClick={onInvite} disabled={isInviting}>
                Invite
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

