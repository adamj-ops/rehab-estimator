'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, AlertCircle, DollarSign, Clock, Sparkles } from 'lucide-react'
import { generateSmartScope } from '@/lib/rehab-optimizer'
import { ScopeItem } from '@/types/rehab'

interface ScopeBuilderProps {
  project: any
  onNext: (data: any) => void
  onBack: () => void
}

export function ScopeBuilder({ project, onNext, onBack }: ScopeBuilderProps) {
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'category' | 'priority' | 'phase'>('category')
  
  useEffect(() => {
    generateScope()
  }, [project])

  const generateScope = async () => {
    setLoading(true)
    
    // Call your AI/optimization engine here
    const smartScope = await generateSmartScope({
      assessments: project.assessments,
      strategy: project.investmentStrategy,
      targetBuyer: project.targetBuyer,
      maxBudget: project.maxBudget,
      marketComps: project.comparables
    })
    
    setScopeItems(smartScope)
    setLoading(false)
  }

  const toggleItem = (itemId: string) => {
    setScopeItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, included: !item.included }
          : item
      )
    )
  }

  const updateItemCost = (itemId: string, cost: number) => {
    setScopeItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, totalCost: cost }
          : item
      )
    )
  }

  const calculateTotals = () => {
    const included = scopeItems.filter(item => item.included)
    return {
      totalCost: included.reduce((sum, item) => sum + item.totalCost, 0),
      totalDays: Math.max(...included.map(item => {
        const phase = item.phase || 1
        const phaseDays = included
          .filter(i => i.phase === phase)
          .reduce((sum, i) => sum + i.daysRequired, 0)
        return phaseDays
      })),
      roiImpact: included.reduce((sum, item) => sum + item.roiImpact, 0)
    }
  }

  const totals = calculateTotals()

  const groupByCategory = () => {
    const grouped: Record<string, ScopeItem[]> = {}
    scopeItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })
    return grouped
  }

  const groupByPriority = () => {
    const grouped: Record<string, ScopeItem[]> = {}
    const priorities = ['must', 'should', 'could', 'nice']
    priorities.forEach(p => grouped[p] = [])
    scopeItems.forEach(item => {
      grouped[item.priority].push(item)
    })
    return grouped
  }

  const groupByPhase = () => {
    const grouped: Record<string, ScopeItem[]> = {}
    scopeItems.forEach(item => {
      const phase = `Phase ${item.phase || 1}`
      if (!grouped[phase]) {
        grouped[phase] = []
      }
      grouped[phase].push(item)
    })
    return grouped
  }

  const getGroupedItems = () => {
    switch (viewMode) {
      case 'priority': return groupByPriority()
      case 'phase': return groupByPhase()
      default: return groupByCategory()
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'must': return 'destructive'
      case 'should': return 'default'
      case 'could': return 'secondary'
      default: return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
          <p className="text-lg font-medium">Generating Smart Scope...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Analyzing market data and optimizing for ROI
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalCost.toLocaleString()}</div>
            <Progress 
              value={(totals.totalCost / project.maxBudget) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((totals.totalCost / project.maxBudget) * 100).toFixed(0)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalDays} days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Approx. {Math.ceil(totals.totalDays / 30)} months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROI Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{totals.roiImpact.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected value increase
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight */}
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertTitle>Smart Scope Insight</AlertTitle>
        <AlertDescription>
          Based on your {project.investmentStrategy} strategy and {project.targetBuyer} target market, 
          we've prioritized kitchen and bathroom updates which show the highest ROI in your area. 
          Consider upgrading to premium fixtures in the master bath - comparable properties with 
          luxury bathrooms sold for 12% more.
        </AlertDescription>
      </Alert>

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
        <TabsList>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="priority">By Priority</TabsTrigger>
          <TabsTrigger value="phase">By Phase</TabsTrigger>
        </TabsList>

        <TabsContent value={viewMode} className="space-y-4 mt-4">
          {Object.entries(getGroupedItems()).map(([group, items]) => {
            const groupTotal = items
              .filter(i => i.included)
              .reduce((sum, i) => sum + i.totalCost, 0)
            
            return (
              <Card key={group}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg capitalize">{group}</CardTitle>
                      <CardDescription>
                        {items.filter(i => i.included).length} of {items.length} items selected
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${groupTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={item.included}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <div>
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.quantity} {item.unitOfMeasure}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {item.daysRequired} days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Input
                            type="number"
                            value={item.totalCost}
                            onChange={(e) => updateItemCost(item.id, parseFloat(e.target.value))}
                            className="w-24 text-right"
                            disabled={!item.included}
                          />
                          <div className="text-xs text-green-600 mt-1">
                            ROI: +{item.roiImpact}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onNext({ scopeItems, totals })}>
          Continue to Priorities
        </Button>
      </div>
    </div>
  )
}
