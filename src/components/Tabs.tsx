'use client'

import { useState } from 'react'

interface TabsProps {
  children: React.ReactNode[]
  labels: string[]
}

export default function Tabs({ children, labels }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="mt-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {labels.map((label, index) => {
            let activeColor = '';
            if (activeTab === index) {
              if (label === 'Code') {
                activeColor = 'border-blue-500 text-blue-600';
              } else {
                activeColor = 'border-orange-500 text-orange-600';
              }
            } else {
              activeColor = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
            }
            return (
              <button
                key={label}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeColor}`}
              >
                {label}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="mt-4">
        {children[activeTab]}
      </div>
    </div>
  )
} 