'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, AlertTriangle, TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface FinalReviewProps {
  project: any
  onNext: (data: any) => void
  onBack: () => void
}

export function FinalReview({ project, onNext, onBack }: FinalReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    onNext({ status: 'completed' })
  }

  const getProjectSummary = () => {
    const scopeItems = project.scopeItems || []
    const assessments = project.assessments || {}
    const phases = project.phases || []
    
    return {
      totalCost: scopeItems.reduce((sum: number, item: any) => sum + item.totalCost, 0),
      totalDays: phases.reduce((sum: number, phase: any) => sum + (phase.endDay - phase.startDay), 0),
      totalROI: scopeItems.reduce((sum: number, item: any) => sum + item.roiImpact, 0),
      roomsAssessed: Object.keys(assessments).length,
      scopeItems: scopeItems.length,
      phases: phases.length
    }
  }

  const summary = getProjectSummary()

  const getRiskLevel = () => {
    const budgetUtilization = (summary.totalCost / project.maxBudget) * 100
    if (budgetUtilization > 90) return { level: 'High', color: 'destructive', icon: AlertTriangle }
    if (budgetUtilization > 75) return { level: 'Medium', color: 'default', icon: AlertTriangle }
    return { level: 'Low', color: 'secondary', icon: CheckCircle }
  }

  const getROILevel = () => {
    if (summary.totalROI > 20) return { level: 'Excellent', color: 'default', icon: TrendingUp }
    if (summary.totalROI > 15) return { level: 'Good', color: 'secondary', icon: TrendingUp }
    return { level: 'Fair', color: 'outline', icon: TrendingUp }
  }

  const riskInfo = getRiskLevel()
  const roiInfo = getROILevel()
  const RiskIcon = riskInfo.icon
  const ROIIcon = roiInfo.icon

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Final Review</h2>
        <p className="text-muted-foreground">
          Review your strategic rehab plan before finalizing
        </p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{project.projectName}</div>
              <div className="text-sm text-muted-foreground">Project Name</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{project.address?.city}, {project.address?.state}</div>
              <div className="text-sm text-muted-foreground">Location</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{project.squareFeet?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Square Feet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{project.propertyType?.replace('_', ' ')}</div>
              <div className="text-sm text-muted-foreground">Property Type</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-3xl font-bold text-blue-600">${summary.totalCost.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Total Investment</div>
              <Progress 
                value={(summary.totalCost / project.maxBudget) * 100} 
                className="mt-2 h-2"
              />
              <div className="text-xs text-blue-600 mt-1">
                {((summary.totalCost / project.maxBudget) * 100).toFixed(0)}% of budget
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-3xl font-bold text-green-600">+{summary.totalROI.toFixed(1)}%</div>
              <div className="text-sm text-green-600">Expected ROI</div>
              <div className="text-xs text-green-600 mt-1">
                Based on market analysis
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="text-3xl font-bold text-purple-600">{summary.totalDays}</div>
              <div className="text-sm text-purple-600">Total Days</div>
              <div className="text-xs text-purple-600 mt-1">
                {Math.ceil(summary.totalDays / 30)} months
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <RiskIcon className={`w-6 h-6 text-${riskInfo.color === 'destructive' ? 'red' : riskInfo.color === 'default' ? 'blue' : 'green'}-600`} />
              <div>
                <div className="font-medium">Budget Risk</div>
                <Badge variant={riskInfo.color as any}>{riskInfo.level}</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <ROIIcon className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium">ROI Potential</div>
                <Badge variant={roiInfo.color as any}>{roiInfo.level}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scope Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Scope Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{summary.roomsAssessed}</div>
              <div className="text-sm text-muted-foreground">Rooms Assessed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{summary.scopeItems}</div>
              <div className="text-sm text-muted-foreground">Scope Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{summary.phases}</div>
              <div className="text-sm text-muted-foreground">Execution Phases</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{project.investmentStrategy}</div>
              <div className="text-sm text-muted-foreground">Strategy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Proceed?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-green-800">All systems ready</div>
              <div className="text-sm text-green-700">
                Your rehab plan is optimized and ready for execution
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            By clicking "Finalize Project", you'll save this plan and can begin 
            implementation. You can always make adjustments later.
          </div>
        </CardContent>
      </Card>

      {/* Submit Handler - Navigation is handled by parent component */}
      <div className="hidden">
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            'Finalize Project'
          )}
        </Button>
      </div>
    </div>
  )
}
