'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Home, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { RehabProject, EstimateSummary } from '@/types/rehab'
import { cn } from '@/lib/utils'

interface EstimateSummaryProps {
  project: Partial<RehabProject>
  estimateSummary: EstimateSummary | null
  currentStep: number
}

export function EstimateSummary({ project, estimateSummary, currentStep }: EstimateSummaryProps) {
  const summary = estimateSummary || {
    totalCost: 0,
    materialCost: 0,
    laborCost: 0,
    contingency: 0,
    timeline: 0,
    roiImpact: 0,
    budgetUsage: 0,
    categoryBreakdown: {}
  }

  const isOverBudget = project.maxBudget && summary.totalCost > project.maxBudget
  const budgetRemaining = project.maxBudget ? project.maxBudget - summary.totalCost : 0

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed'
    if (stepNumber === currentStep) return 'current'
    return 'pending'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'current':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'current':
        return 'text-blue-600'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-4">
      {/* Project Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Project Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {project.projectName && (
            <div>
              <div className="text-sm font-medium">{project.projectName}</div>
              <div className="text-xs text-muted-foreground">
                {project.address?.street}, {project.address?.city}
              </div>
            </div>
          )}
          
          {project.squareFeet && (
            <div className="flex items-center space-x-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{project.squareFeet.toLocaleString()} sq ft</span>
            </div>
          )}
          
          {project.investmentStrategy && (
            <Badge variant="outline" className="capitalize">
              {project.investmentStrategy.replace('_', ' ')}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total Cost */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Total Estimate</span>
              <span className="text-2xl font-bold">
                ${summary.totalCost.toLocaleString()}
              </span>
            </div>
            
            {/* Budget Progress */}
            {project.maxBudget && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Budget Usage</span>
                  <span className={cn(
                    summary.budgetUsage > 100 ? "text-red-600" : "text-muted-foreground"
                  )}>
                    {summary.budgetUsage.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(summary.budgetUsage, 100)} 
                  className={cn(
                    "h-2",
                    summary.budgetUsage > 100 && "bg-red-100"
                  )}
                />
                <div className="flex items-center justify-between text-xs">
                  <span>Remaining</span>
                  <span className={cn(
                    budgetRemaining < 0 ? "text-red-600" : "text-muted-foreground"
                  )}>
                    ${budgetRemaining.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Cost Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Materials</span>
              <span>${summary.materialCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Labor</span>
              <span>${summary.laborCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Contingency</span>
              <span>${summary.contingency.toLocaleString()}</span>
            </div>
          </div>

          {/* ROI Impact */}
          {summary.roiImpact > 0 && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">ROI Impact</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    +{summary.roiImpact.toFixed(1)}%
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Estimated Duration</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {summary.timeline} days
              </span>
            </div>
          </div>
          
          {project.holdPeriodMonths && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Hold Period</span>
              <span className="text-sm">
                {project.holdPeriodMonths} months
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {Object.keys(summary.categoryBreakdown).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">By Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(summary.categoryBreakdown).map(([category, cost]) => (
              <div key={category} className="flex items-center justify-between text-sm">
                <span className="capitalize">{category}</span>
                <span>${cost.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {isOverBudget && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Over Budget</span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Consider removing some items or increasing your budget.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            'Property Details',
            'Condition Assessment', 
            'Strategy & Goals',
            'Scope Building',
            'Priority Analysis',
            'Action Plan',
            'Final Review'
          ].map((stepName, index) => {
            const stepNumber = index + 1
            const status = getStepStatus(stepNumber)
            
            return (
              <div key={stepNumber} className="flex items-center space-x-2">
                {getStatusIcon(status)}
                <span className={cn(
                  "text-sm",
                  getStatusColor(status)
                )}>
                  {stepName}
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {currentStep < 7 ? (
              <>
                Complete the current step to continue building your estimate.
                {summary.totalCost > 0 && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-blue-700">
                    <strong>Tip:</strong> Your current estimate is ${summary.totalCost.toLocaleString()}
                  </div>
                )}
              </>
            ) : (
              <div className="p-2 bg-green-50 rounded text-green-700">
                <strong>Ready!</strong> Your rehab estimate is complete and ready for review.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
