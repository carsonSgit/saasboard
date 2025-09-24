'use client'

export function PeopleFooter() {
  return (
    <div className="bg-gray-800 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <span className="text-gray-800 font-bold text-xs">Q</span>
          </div>
          <span className="text-sm font-medium">Qatalog</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <span>curated by</span>
          <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
            <span className="text-gray-800 font-bold text-xs">M</span>
          </div>
          <span>Mobbin</span>
        </div>
      </div>
    </div>
  )
}
