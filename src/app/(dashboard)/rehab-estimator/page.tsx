'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Home, 
  ClipboardCheck, 
  Target, 
  Hammer, 
  ListOrdered, 
  Calendar, 
  FileCheck,
  ArrowLeft,
  ArrowRight,
  Save,
  Download,
  Sparkles
} from 'lucide-react'
import { useRehabStore, useCurrentStep, useProject, useEstimateSummary, useLoading, useError } from '@/hooks/use-rehab-store'
import { PropertyDetailsForm } from '@/components/rehab-estimator/property-details-form'
import { PropertyAssessment } from '@/components/rehab-estimator/assessment/property-assessment'
import { StrategySelector } from '@/components/rehab-estimator/strategy-selector'
import { ScopeBuilder } from '@/components/rehab-estimator/scope-builder/scope-builder'
import { PriorityMatrix } from '@/components/rehab-estimator/priority-matrix/priority-matrix'
import { ActionPlanGenerator } from '@/components/rehab-estimator/action-plan/action-plan-generator'
import { FinalReview } from '@/components/rehab-estimator/final-review'
import { EstimateSummary } from '@/components/rehab-estimator/estimate-summary'
import { cn } from '@/lib/utils'

const steps = [
  { 
    id: 1, 
    name: 'Property Details', 
    description: 'Enter basic property information',
    icon: Home,
    component: PropertyDetailsForm 
  },
  { 
    id: 2, 
    name: 'Condition Assessment', 
    description: 'Assess property condition room by room',
    icon: ClipboardCheck,
    component: PropertyAssessment 
  },
  { 
    id: 3, 
    name: 'Strategy & Goals', 
    description: 'Define investment strategy and goals',
    icon: Target,
    component: StrategySelector 
  },
  { 
    id: 4, 
    name: 'Scope Building', 
    description: 'Build renovation scope with smart recommendations',
    icon: Hammer,
    component: ScopeBuilder 
  },
  { 
    id: 5, 
    name: 'Priority Analysis', 
    description: 'Analyze priorities and ROI impact',
    icon: ListOrdered,
    component: PriorityMatrix 
  },
  { 
    id: 6, 
    name: 'Action Plan', 
    description: 'Generate phased execution plan',
    icon: Calendar,
    component: ActionPlanGenerator 
  },
  { 
    id: 7, 
    name: 'Final Review', 
    description: 'Review and finalize your plan',
    icon: FileCheck,
    component: FinalReview 
  }
]

export default function RehabEstimatorPage() {
  const router = useRouter()
  const currentStep = useCurrentStep()
  const project = useProject()
  const estimateSummary = useEstimateSummary()
  const loading = useLoading()
  const error = useError()
  
  const {
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    completeStep,
    saveProject,
    resetProject,
    setError
  } = useRehabStore()

  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const CurrentStepComponent = steps[currentStep - 1]?.component
  const progress = (currentStep / steps.length) * 100

  const handleNext = async (data: any) => {
    try {
      // Complete current step
      completeStep(currentStep, data)
      
      // If this is the last step, save the project
      if (currentStep === steps.length) {
        setIsSaving(true)
        const savedProject = await saveProject()
        if (savedProject) {
          router.push(`/rehab-estimator/${savedProject.id}`)
        }
        setIsSaving(false)
      } else {
        // Go to next step
        goToNextStep()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleBack = () => {
    goToPreviousStep()
  }

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true)
      await saveProject()
      // Show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const handleGenerateSmartScope = async () => {
    try {
      setIsGenerating(true)
      // TODO: Implement smart scope generation
      // This would call an AI service to generate recommendations
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      setIsGenerating(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate smart scope')
      setIsGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Strategic Rehab Estimator</h1>
            <p className="text-muted-foreground mt-2">
              Build data-driven renovation scopes that maximize ROI
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetProject}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = step.id < currentStep
            const isClickable = isCompleted || step.id === currentStep
            
            return (
              <button
                key={step.id}
                onClick={() => isClickable && setCurrentStep(step.id)}
                className={cn(
                  "flex flex-col items-center transition-all",
                  isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
                disabled={!isClickable}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors",
                  isActive && "bg-primary text-primary-foreground scale-110",
                  isCompleted && "bg-green-500 text-white",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className={cn(
                    "text-xs font-medium",
                    isActive && "text-primary",
                    isCompleted && "text-green-600"
                  )}>
                    {step.name}
                  </div>
                  <div className="text-xs text-muted-foreground max-w-[80px]">
                    {step.description}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Smart Scope Generation Alert */}
      {currentStep === 4 && (
        <Alert className="mb-6">
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                Ready to generate smart recommendations based on your property assessment and strategy?
              </span>
              <Button
                size="sm"
                onClick={handleGenerateSmartScope}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Smart Scope'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {steps[currentStep - 1]?.name}
                  </CardTitle>
                  <CardDescription>
                    {steps[currentStep - 1]?.description}
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  Step {currentStep} of {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {CurrentStepComponent && (
                <CurrentStepComponent 
                  project={project}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <EstimateSummary 
            project={project}
            estimateSummary={estimateSummary}
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center space-x-2">
          {currentStep === steps.length ? (
            <Button
              onClick={() => handleNext({})}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Complete Project'}
            </Button>
          ) : (
            <Button
              onClick={() => handleNext({})}
              disabled={!steps[currentStep - 1]?.component}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
