'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PeopleHeader } from '@/components/layout/people-header'
import { PeopleFooter } from '@/components/layout/people-footer'
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Edit3, 
  MoreHorizontal,
  Check,
  FileText,
  Settings as GearIcon,
  Globe,
  Search,
  Map,
  Bookmark,
  Bell,
  Building2,
  User
} from 'lucide-react'

export default function PeoplePage() {
  const [pagesOpen, setPagesOpen] = useState(true)
  const [tagsOpen, setTagsOpen] = useState(false)
  const [reportingLineOpen, setReportingLineOpen] = useState(false)

  const pages = [
    { title: 'Features Overview', icon: Check, user: 'Jane D', time: '34 min ago' },
    { title: 'Pages', icon: FileText, user: 'Jane D', time: '34 min ago' },
    { title: 'Module Customization and Set-up', icon: GearIcon, user: 'Jane D', time: '34 min ago' },
    { title: 'Navigation Customization', icon: Globe, user: 'Jane D', time: '34 min ago' },
    { title: 'Search', icon: Search, user: 'Jane D', time: '34 min ago' }
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PeopleHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Top Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>UX Design...</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <GearIcon className="h-4 w-4" />
                <span>Usability</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md px-3 py-2">
                <User className="h-4 w-4" />
                <span>People</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                <span>Projects</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 cursor-pointer">
                <Search className="h-4 w-4" />
                <span>Browse</span>
              </div>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 cursor-pointer">
              <Building2 className="h-4 w-4" />
              <span>Organization</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 cursor-pointer">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 cursor-pointer">
              <GearIcon className="h-4 w-4" />
              <span>Settings</span>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Content - Profile Section */}
          <div className="w-96 bg-white border-r border-gray-200 p-6">
            {/* Profile Picture */}
            <div className="relative mb-6">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src="/api/placeholder/128/128" alt="Jane Doe" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-white hover:bg-gray-50"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">Jane Doe</h1>

            {/* Description */}
            <div className="text-center mb-4">
              <button className="text-sm text-gray-500 border-b border-dotted border-gray-300 hover:text-gray-700">
                Add description
              </button>
            </div>

            {/* Teams Button */}
            <div className="text-center mb-8">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Plus className="h-4 w-4 mr-2" />
                Teams
              </Button>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Pages Section */}
              <Collapsible open={pagesOpen} onOpenChange={setPagesOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                    <div className="flex items-center space-x-2">
                      {pagesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">5 Pages</span>
                    </div>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {pages.slice(0, 3).map((page, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 pl-6">
                      <page.icon className="h-4 w-4" />
                      <span>{page.title}</span>
                    </div>
                  ))}
                  <button className="text-sm text-blue-600 hover:text-blue-800 pl-6">
                    See all →
                  </button>
                </CollapsibleContent>
              </Collapsible>

              {/* Tags Section */}
              <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                    <div className="flex items-center space-x-2">
                      {tagsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">Tags</span>
                    </div>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>

              {/* Reporting Line Section */}
              <Collapsible open={reportingLineOpen} onOpenChange={setReportingLineOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                    <div className="flex items-center space-x-2">
                      {reportingLineOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">Reporting line</span>
                    </div>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>

          {/* Right Content - Details/Activity Section */}
          <div className="flex-1 p-6">
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Night!</h2>
              <p className="text-gray-600">
                Collaborate with your team and organize your work here!
              </p>
            </div>

            {/* Details Card */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Details</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="text-sm font-medium">Jane Doe</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm font-medium">abigailsmith.mobbin@gmail.com</span>
                </div>
              </CardContent>
            </Card>

            {/* Latest Pages Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Latest Pages</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Pages Grid */}
              <div className="grid grid-cols-3 gap-4">
                {pages.map((page, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <page.icon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">{page.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">JD</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{page.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions Grid Placeholder */}
              <div className="relative bg-gray-50 rounded-lg p-8 min-h-[200px]">
                <div className="absolute bottom-4 right-4">
                  <Button size="lg" className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PeopleFooter />
    </div>
  )
}