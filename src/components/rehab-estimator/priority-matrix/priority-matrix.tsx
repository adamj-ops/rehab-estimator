'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TrendingUp, AlertTriangle, Clock, DollarSign } from 'lucide-react'

interface PriorityMatrixProps {
  project: any
  onNext: (data: any) => void
  onBack: () => void
}

export function PriorityMatrix({ project, onNext, onBack }: PriorityMatrixProps) {
  const [priorities, setPriorities] = useState(project.scopeItems || [])

  const updatePriority = (itemId: string, newPriority: string) => {
    setPriorities(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, priority: newPriority }
          : item
      )
    )
  }

  const getPriorityItems = (priority: string) => {
    return priorities.filter(item => item.priority === priority)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'must': return 'destructive'
      case 'should': return 'default'
      case 'could': return 'secondary'
      default: return 'outline'
    }
  }

  const handleSubmit = () => {
    onNext({ priorities })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Priority Matrix</h2>
        <p className="text-muted-foreground">
          Organize your scope items by priority to optimize execution order
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Focus on "Must" items first as they provide the highest ROI 
          and are critical for property value. "Should" items can be added if budget allows.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Must Have */}
        <Card>
          <CardHeader className="bg-red-50 border-red-200">
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Must Have</span>
            </CardTitle>
            <p className="text-sm text-red-600">Critical for value & safety</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {getPriorityItems('must').map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="font-medium text-sm">{item.itemName}</div>
                <div className="text-xs text-red-600 mt-1">
                  ROI: +{item.roiImpact}% • {item.daysRequired} days
                </div>
                <div className="text-xs text-red-600">
                  ${item.totalCost.toLocaleString()}
                </div>
              </div>
            ))}
            {getPriorityItems('must').length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No items in this priority
              </div>
            )}
          </CardContent>
        </Card>

        {/* Should Have */}
        <Card>
          <CardHeader className="bg-blue-50 border-blue-200">
            <CardTitle className="text-blue-800 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Should Have</span>
            </CardTitle>
            <p className="text-sm text-blue-600">High ROI improvements</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {getPriorityItems('should').map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="font-medium text-sm">{item.itemName}</div>
                <div className="text-xs text-blue-600 mt-1">
                  ROI: +{item.roiImpact}% • {item.daysRequired} days
                </div>
                <div className="text-xs text-blue-600">
                  ${item.totalCost.toLocaleString()}
                </div>
              </div>
            ))}
            {getPriorityItems('should').length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No items in this priority
              </div>
            )}
          </CardContent>
        </Card>

        {/* Could Have */}
        <Card>
          <CardHeader className="bg-yellow-50 border-yellow-200">
            <CardTitle className="text-yellow-800 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Could Have</span>
            </CardTitle>
            <p className="text-sm text-yellow-600">Nice-to-have features</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {getPriorityItems('could').map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="font-medium text-sm">{item.itemName}</div>
                <div className="text-xs text-yellow-600 mt-1">
                  ROI: +{item.roiImpact}% • {item.daysRequired} days
                </div>
                <div className="text-xs text-yellow-600">
                  ${item.totalCost.toLocaleString()}
                </div>
              </div>
            ))}
            {getPriorityItems('could').length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No items in this priority
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nice to Have */}
        <Card>
          <CardHeader className="bg-gray-50 border-gray-200">
            <CardTitle className="text-gray-800 flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Nice to Have</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Luxury upgrades</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {getPriorityItems('nice').map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="font-medium text-sm">{item.itemName}</div>
                <div className="text-xs text-gray-600 mt-1">
                  ROI: +{item.roiImpact}% • {item.daysRequired} days
                </div>
                <div className="text-xs text-gray-600">
                  ${item.totalCost.toLocaleString()}
                </div>
              </div>
            ))}
            {getPriorityItems('nice').length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No items in this priority
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue to Action Plan
        </Button>
      </div>
    </div>
  )
}
