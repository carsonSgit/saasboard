'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Bookmark, 
  Bell, 
  MoreHorizontal,
  Circle
} from 'lucide-react'

export function PeopleHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            PEOPLE
          </Button>
        </div>

        {/* Center Section - Tabs */}
        <Tabs defaultValue="overview" className="w-auto">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none px-4 py-2"
            >
              <div className="flex items-center space-x-2">
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                <span>Overview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none px-4 py-2"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="threads" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none px-4 py-2"
            >
              Threads
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none px-4 py-2"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="workflows" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none px-4 py-2"
            >
              Workflows
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
