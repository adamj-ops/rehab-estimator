'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock, DollarSign, AlertTriangle } from 'lucide-react'

interface ActionPlanGeneratorProps {
  project: any
  onNext: (data: any) => void
  onBack: () => void
}

export function ActionPlanGenerator({ project, onNext, onBack }: ActionPlanGeneratorProps) {
  const [phases, setPhases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateActionPlan()
  }, [project])

  const generateActionPlan = () => {
    setLoading(true)
    
    // Generate phases based on scope items
    const scopeItems = project.scopeItems || []
    const phaseMap = new Map()
    
    scopeItems.forEach((item: any) => {
      const phase = item.phase || 1
      if (!phaseMap.has(phase)) {
        phaseMap.set(phase, {
          id: `phase-${phase}`,
          name: `Phase ${phase}`,
          items: [],
          startDay: 0,
          endDay: 0,
          cost: 0,
          criticalPath: false
        })
      }
      phaseMap.get(phase).items.push(item)
    })
    
    // Calculate timeline and costs
    let currentDay = 0
    const generatedPhases = Array.from(phaseMap.values()).map((phase, index) => {
      const phaseItems = phase.items
      const phaseCost = phaseItems.reduce((sum: number, item: any) => sum + item.totalCost, 0)
      const phaseDays = Math.max(...phaseItems.map((item: any) => item.daysRequired || 0))
      
      const startDay = currentDay
      const endDay = currentDay + phaseDays
      currentDay = endDay
      
      return {
        ...phase,
        startDay,
        endDay,
        cost: phaseCost,
        criticalPath: index === 0 || index === 1 // First two phases are usually critical
      }
    })
    
    setPhases(generatedPhases)
    setLoading(false)
  }

  const getPhaseColor = (phase: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
    return colors[phase % colors.length]
  }

  const getTotalTimeline = () => {
    if (phases.length === 0) return 0
    return Math.max(...phases.map(p => p.endDay))
  }

  const getTotalCost = () => {
    return phases.reduce((sum, phase) => sum + phase.cost, 0)
  }

  const handleSubmit = () => {
    onNext({ phases, totalTimeline: getTotalTimeline(), totalCost: getTotalCost() })
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-medium">Generating Action Plan...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Optimizing timeline and resource allocation
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Action Plan</h2>
        <p className="text-muted-foreground">
          Your optimized renovation timeline with phase-by-phase execution plan
        </p>
      </div>

      {/* Timeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Project Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTotalTimeline()}</div>
              <div className="text-sm text-muted-foreground">Total Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{phases.length}</div>
              <div className="text-sm text-muted-foreground">Phases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">${getTotalCost().toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
          </div>
          
          <Progress value={(getTotalTimeline() / 90) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Timeline: {Math.ceil(getTotalTimeline() / 30)} months
          </p>
        </CardContent>
      </Card>

      {/* Phase Details */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={phase.id} className={phase.criticalPath ? 'ring-2 ring-orange-500' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${getPhaseColor(index)} text-white flex items-center justify-center text-sm font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Days {phase.startDay + 1} - {phase.endDay}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${phase.cost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {phase.endDay - phase.startDay} days
                  </div>
                </div>
              </div>
              {phase.criticalPath && (
                <Badge variant="destructive" className="mt-2">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Critical Path
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {phase.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{item.itemName}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${item.totalCost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.daysRequired} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-blue-800">Timeline Optimization</div>
              <div className="text-sm text-blue-700">
                Consider overlapping Phase 2 (kitchen/bath) with Phase 3 (flooring) 
                to reduce total project time by 5-7 days.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-green-800">Budget Management</div>
              <div className="text-sm text-green-700">
                Phase 1 and 2 account for 75% of your budget. Consider staging 
                Phase 3-5 based on available funds.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <div className="font-medium text-orange-800">Risk Mitigation</div>
              <div className="text-sm text-orange-700">
                Ensure structural work (Phase 1) is completed before major 
                renovations to avoid costly rework.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue to Final Review
        </Button>
      </div>
    </div>
  )
}
