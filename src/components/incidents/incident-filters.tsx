"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'

interface IncidentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filter: 'all' | 'active' | 'resolved'
  onFilterChange: (filter: 'all' | 'active' | 'resolved') => void
}

export function IncidentFilters({ 
  searchTerm, 
  onSearchChange, 
  filter, 
  onFilterChange 
}: IncidentFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search incidents by monitor name or URL..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex space-x-1">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange('active')}
              >
                Active
              </Button>
              <Button
                variant={filter === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange('resolved')}
              >
                Resolved
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

