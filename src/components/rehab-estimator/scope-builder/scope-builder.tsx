'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Hammer, 
  Plus, 
  Trash2, 
  Sparkles, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { RehabProject, ScopeItem } from '@/types/rehab'
import { cn } from '@/lib/utils'

interface ScopeBuilderProps {
  project: Partial<RehabProject>
  onNext: (data: any) => void
  onBack: () => void
}

// Predefined scope categories and items
const scopeCategories = {
  'Kitchen': [
    { name: 'Cabinet Replacement', materialCost: 8000, laborCost: 4000, days: 5, roiImpact: 15 },
    { name: 'Countertop Replacement', materialCost: 3000, laborCost: 1500, days: 2, roiImpact: 12 },
    { name: 'Appliance Upgrade', materialCost: 5000, laborCost: 800, days: 1, roiImpact: 10 },
    { name: 'Backsplash Installation', materialCost: 800, laborCost: 600, days: 1, roiImpact: 8 },
    { name: 'Lighting Upgrade', materialCost: 400, laborCost: 300, days: 1, roiImpact: 6 }
  ],
  'Bathroom': [
    { name: 'Vanity Replacement', materialCost: 1200, laborCost: 800, days: 2, roiImpact: 12 },
    { name: 'Tub/Shower Replacement', materialCost: 2500, laborCost: 1500, days: 3, roiImpact: 14 },
    { name: 'Tile Installation', materialCost: 1500, laborCost: 1200, days: 2, roiImpact: 10 },
    { name: 'Plumbing Fixtures', materialCost: 600, laborCost: 400, days: 1, roiImpact: 8 },
    { name: 'Ventilation Fan', materialCost: 200, laborCost: 300, days: 1, roiImpact: 5 }
  ],
  'Interior': [
    { name: 'Paint Interior', materialCost: 800, laborCost: 2000, days: 3, roiImpact: 8 },
    { name: 'Flooring Replacement', materialCost: 4000, laborCost: 3000, days: 4, roiImpact: 12 },
    { name: 'Trim/Baseboards', materialCost: 600, laborCost: 800, days: 2, roiImpact: 6 },
    { name: 'Interior Doors', materialCost: 1200, laborCost: 1000, days: 2, roiImpact: 8 },
    { name: 'Window Treatments', materialCost: 800, laborCost: 400, days: 1, roiImpact: 4 }
  ],
  'Exterior': [
    { name: 'Paint Exterior', materialCost: 1200, laborCost: 3000, days: 4, roiImpact: 10 },
    { name: 'Roof Repair/Replacement', materialCost: 8000, laborCost: 4000, days: 5, roiImpact: 15 },
    { name: 'Siding Repair', materialCost: 2000, laborCost: 1500, days: 3, roiImpact: 12 },
    { name: 'Gutters & Downspouts', materialCost: 800, laborCost: 600, days: 1, roiImpact: 6 },
    { name: 'Landscaping', materialCost: 1500, laborCost: 1000, days: 2, roiImpact: 8 }
  ],
  'Systems': [
    { name: 'HVAC Replacement', materialCost: 6000, laborCost: 2000, days: 2, roiImpact: 12 },
    { name: 'Electrical Panel Upgrade', materialCost: 1500, laborCost: 1200, days: 1, roiImpact: 10 },
    { name: 'Plumbing Repairs', materialCost: 1000, laborCost: 800, days: 1, roiImpact: 8 },
    { name: 'Water Heater', materialCost: 800, laborCost: 400, days: 1, roiImpact: 6 },
    { name: 'Smoke Detectors', materialCost: 200, laborCost: 100, days: 1, roiImpact: 4 }
  ]
}

const priorityOptions = [
  { value: 'must', label: 'Must Have', color: 'bg-red-500' },
  { value: 'should', label: 'Should Have', color: 'bg-orange-500' },
  { value: 'could', label: 'Could Have', color: 'bg-yellow-500' },
  { value: 'nice', label: 'Nice to Have', color: 'bg-green-500' }
]

export function ScopeBuilder({ project, onNext, onBack }: ScopeBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState('Kitchen')
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customItem, setCustomItem] = useState({
    name: '',
    category: 'Kitchen',
    materialCost: 0,
    laborCost: 0,
    days: 1,
    priority: 'should' as const
  })

  // Calculate totals
  const totalCost = scopeItems.reduce((sum, item) => sum + item.totalCost, 0)
  const totalDays = scopeItems.reduce((sum, item) => sum + item.daysRequired, 0)
  const totalROI = scopeItems.reduce((sum, item) => sum + item.roiImpact, 0)

  const addScopeItem = (item: any) => {
    const newItem: ScopeItem = {
      id: `item-${Date.now()}`,
      projectId: project.id || '',
      category: item.category || selectedCategory,
      itemName: item.name,
      description: '',
      location: '',
      quantity: 1,
      unitOfMeasure: 'each',
      materialCost: item.materialCost,
      laborCost: item.laborCost,
      totalCost: item.materialCost + item.laborCost,
      priority: item.priority || 'should',
      roiImpact: item.roiImpact,
      daysRequired: item.days,
      dependsOn: [],
      phase: 1,
      included: true,
      completed: false
    }
    setScopeItems([...scopeItems, newItem])
  }

  const removeScopeItem = (itemId: string) => {
    setScopeItems(scopeItems.filter(item => item.id !== itemId))
  }

  const toggleScopeItem = (itemId: string) => {
    setScopeItems(scopeItems.map(item => 
      item.id === itemId ? { ...item, included: !item.included } : item
    ))
  }

  const updateScopeItem = (itemId: string, updates: Partial<ScopeItem>) => {
    setScopeItems(scopeItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }

  const generateSmartRecommendations = async () => {
    setIsGenerating(true)
    
    // Simulate AI recommendations based on project data
    setTimeout(() => {
      const recommendations: ScopeItem[] = []
      
      // Kitchen recommendations based on property type and condition
      if (project.propertyType === 'single_family' && project.squareFeet && project.squareFeet > 1500) {
        recommendations.push({
          id: `rec-${Date.now()}-1`,
          projectId: project.id || '',
          category: 'Kitchen',
          itemName: 'Cabinet Replacement',
          description: 'Recommended for better resale value',
          location: 'Kitchen',
          quantity: 1,
          unitOfMeasure: 'each',
          materialCost: 8000,
          laborCost: 4000,
          totalCost: 12000,
          priority: 'should',
          roiImpact: 15,
          daysRequired: 5,
          dependsOn: [],
          phase: 1,
          included: true,
          completed: false
        })
      }

      // Bathroom recommendations
      if (project.bathrooms && project.bathrooms >= 2) {
        recommendations.push({
          id: `rec-${Date.now()}-2`,
          projectId: project.id || '',
          category: 'Bathroom',
          itemName: 'Vanity Replacement',
          description: 'High ROI bathroom upgrade',
          location: 'Master Bathroom',
          quantity: 1,
          unitOfMeasure: 'each',
          materialCost: 1200,
          laborCost: 800,
          totalCost: 2000,
          priority: 'should',
          roiImpact: 12,
          daysRequired: 2,
          dependsOn: [],
          phase: 1,
          included: true,
          completed: false
        })
      }

      // Add recommendations to scope
      setScopeItems([...scopeItems, ...recommendations])
      setIsGenerating(false)
    }, 2000)
  }

  const handleSubmit = () => {
    onNext({ scopeItems })
  }

  return (
    <div className="space-y-6">
      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Smart Recommendations</span>
          </CardTitle>
          <CardDescription>
            Generate AI-powered renovation recommendations based on your property assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={generateSmartRecommendations}
            disabled={isGenerating}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating Recommendations...' : 'Generate Smart Recommendations'}
          </Button>
        </CardContent>
      </Card>

      {/* Scope Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Items */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Items</CardTitle>
              <CardDescription>
                Select items to add to your renovation scope
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Selector */}
              <div>
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(scopeCategories).map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Items in Category */}
              <div className="space-y-2">
                {scopeCategories[selectedCategory as keyof typeof scopeCategories]?.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                       onClick={() => addScopeItem({ ...item, category: selectedCategory })}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ${(item.materialCost + item.laborCost).toLocaleString()} • {item.days} days
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Item */}
              <Separator />
              <div className="space-y-3">
                <Label>Add Custom Item</Label>
                <Input
                  placeholder="Item name"
                  value={customItem.name}
                  onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Material cost"
                    value={customItem.materialCost}
                    onChange={(e) => setCustomItem({ ...customItem, materialCost: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Labor cost"
                    value={customItem.laborCost}
                    onChange={(e) => setCustomItem({ ...customItem, laborCost: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Days required"
                    value={customItem.days}
                    onChange={(e) => setCustomItem({ ...customItem, days: Number(e.target.value) })}
                  />
                  <Select value={customItem.priority} onValueChange={(value: any) => setCustomItem({ ...customItem, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => {
                    if (customItem.name) {
                      addScopeItem(customItem)
                      setCustomItem({ ...customItem, name: '', materialCost: 0, laborCost: 0, days: 1 })
                    }
                  }}
                  disabled={!customItem.name}
                  className="w-full"
                >
                  Add Custom Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Scope */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Renovation Scope</CardTitle>
              <CardDescription>
                Your selected renovation items and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scopeItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Hammer className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No items added to scope yet.</p>
                  <p className="text-sm">Select items from the left panel or generate smart recommendations.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scopeItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={item.included}
                            onCheckedChange={() => toggleScopeItem(item.id)}
                          />
                          <div>
                            <div className="font-medium">{item.itemName}</div>
                            <div className="text-sm text-muted-foreground">{item.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={cn(
                            priorityOptions.find(p => p.value === item.priority)?.color,
                            'text-white'
                          )}>
                            {priorityOptions.find(p => p.value === item.priority)?.label}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeScopeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Total Cost</div>
                          <div className="font-medium">${item.totalCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Materials</div>
                          <div className="font-medium">${item.materialCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Labor</div>
                          <div className="font-medium">${item.laborCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Days</div>
                          <div className="font-medium">{item.daysRequired}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary */}
      {scopeItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scope Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{totalDays}</div>
                <div className="text-sm text-muted-foreground">Total Days</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">+{totalROI.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">ROI Impact</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{scopeItems.length}</div>
                <div className="text-sm text-muted-foreground">Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Warning */}
      {project.maxBudget && totalCost > project.maxBudget && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your scope exceeds your budget by ${(totalCost - project.maxBudget).toLocaleString()}. 
            Consider removing some items or increasing your budget.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={scopeItems.length === 0}
        >
          Continue to Priority Analysis
        </Button>
      </div>
    </div>
  )
}
