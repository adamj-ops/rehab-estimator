'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Home, Bed, Bath, ChefHat, Wind, Zap, Droplets, Sun } from 'lucide-react'

const rooms = [
  { id: 'living', name: 'Living Room', icon: Home },
  { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
  { id: 'master_bed', name: 'Master Bedroom', icon: Bed },
  { id: 'master_bath', name: 'Master Bath', icon: Bath },
  { id: 'bedroom2', name: 'Bedroom 2', icon: Bed },
  { id: 'bedroom3', name: 'Bedroom 3', icon: Bed },
  { id: 'bathroom2', name: 'Bathroom 2', icon: Bath },
  { id: 'basement', name: 'Basement', icon: Home },
  { id: 'garage', name: 'Garage', icon: Home },
  { id: 'exterior', name: 'Exterior', icon: Sun }
]

const roomComponents = {
  kitchen: [
    { id: 'cabinets', name: 'Cabinets' },
    { id: 'countertops', name: 'Countertops' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'backsplash', name: 'Backsplash' },
    { id: 'plumbing', name: 'Plumbing Fixtures' },
    { id: 'lighting', name: 'Lighting' }
  ],
  bathroom: [
    { id: 'vanity', name: 'Vanity' },
    { id: 'toilet', name: 'Toilet' },
    { id: 'tub_shower', name: 'Tub/Shower' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'plumbing', name: 'Plumbing Fixtures' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'ventilation', name: 'Ventilation' }
  ],
  bedroom: [
    { id: 'flooring', name: 'Flooring' },
    { id: 'walls', name: 'Walls' },
    { id: 'ceiling', name: 'Ceiling' },
    { id: 'closet', name: 'Closet' },
    { id: 'windows', name: 'Windows' },
    { id: 'lighting', name: 'Lighting' }
  ],
  general: [
    { id: 'flooring', name: 'Flooring' },
    { id: 'walls', name: 'Walls' },
    { id: 'ceiling', name: 'Ceiling' },
    { id: 'windows', name: 'Windows' },
    { id: 'doors', name: 'Doors' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'trim', name: 'Trim/Baseboards' }
  ]
}

interface PropertyAssessmentProps {
  project: any
  onNext: (data: any) => void
  onBack: () => void
}

export function PropertyAssessment({ project, onNext, onBack }: PropertyAssessmentProps) {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id)
  const [assessments, setAssessments] = useState<Record<string, any>>({})
  
  const currentAssessment = assessments[selectedRoom] || {
    condition: 'fair',
    components: {},
    notes: ''
  }

  const updateRoomAssessment = (field: string, value: any) => {
    setAssessments(prev => ({
      ...prev,
      [selectedRoom]: {
        ...prev[selectedRoom],
        [field]: value
      }
    }))
  }

  const updateComponent = (componentId: string, field: string, value: any) => {
    setAssessments(prev => ({
      ...prev,
      [selectedRoom]: {
        ...prev[selectedRoom],
        components: {
          ...prev[selectedRoom]?.components,
          [componentId]: {
            ...prev[selectedRoom]?.components?.[componentId],
            [field]: value
          }
        }
      }
    }))
  }

  const getComponents = (roomId: string) => {
    if (roomId === 'kitchen') return roomComponents.kitchen
    if (roomId.includes('bath')) return roomComponents.bathroom
    if (roomId.includes('bed')) return roomComponents.bedroom
    return roomComponents.general
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-500'
      case 'good': return 'bg-blue-500'
      case 'fair': return 'bg-yellow-500'
      case 'poor': return 'bg-orange-500'
      case 'terrible': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const calculateOverallScore = () => {
    const allAssessments = Object.values(assessments)
    if (allAssessments.length === 0) return 0
    
    const conditionScores = {
      excellent: 100,
      good: 80,
      fair: 60,
      poor: 40,
      terrible: 20
    }
    
    const totalScore = allAssessments.reduce((sum, assessment: any) => {
      return sum + (conditionScores[assessment.condition as keyof typeof conditionScores] || 60)
    }, 0)
    
    return Math.round(totalScore / allAssessments.length)
  }

  const handleSubmit = () => {
    onNext({ assessments, overallScore: calculateOverallScore() })
  }

  return (
    <div className="space-y-6">
      {/* Room Selector */}
      <div className="grid grid-cols-5 gap-2">
        {rooms.map(room => {
          const assessment = assessments[room.id]
          const Icon = room.icon
          
          return (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all",
                selectedRoom === room.id 
                  ? "border-primary bg-primary/10" 
                  : "border-muted hover:border-primary/50",
                assessment && "relative"
              )}
            >
              <Icon className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs text-center">{room.name}</div>
              {assessment && (
                <div className={cn(
                  "absolute top-1 right-1 w-2 h-2 rounded-full",
                  getConditionColor(assessment.condition)
                )} />
              )}
            </button>
          )
        })}
      </div>

      {/* Room Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>{rooms.find(r => r.id === selectedRoom)?.name} Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Condition */}
          <div>
            <Label>Overall Room Condition</Label>
            <RadioGroup 
              value={currentAssessment.condition}
              onValueChange={(value) => updateRoomAssessment('condition', value)}
              className="flex space-x-4 mt-2"
            >
              {['terrible', 'poor', 'fair', 'good', 'excellent'].map(condition => (
                <div key={condition} className="flex flex-col items-center">
                  <RadioGroupItem value={condition} id={condition} />
                  <Label 
                    htmlFor={condition} 
                    className="mt-1 cursor-pointer capitalize"
                  >
                    {condition}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Components */}
          <div>
            <Label className="mb-3 block">Component Conditions</Label>
            <div className="space-y-3">
              {getComponents(selectedRoom).map(component => (
                <div key={component.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={currentAssessment.components?.[component.id]?.needsWork || false}
                      onCheckedChange={(checked) => 
                        updateComponent(component.id, 'needsWork', checked)
                      }
                    />
                    <Label className="font-medium">{component.name}</Label>
                  </div>
                  
                  {currentAssessment.components?.[component.id]?.needsWork && (
                    <select
                      className="px-3 py-1 rounded border"
                      value={currentAssessment.components?.[component.id]?.action || 'repair'}
                      onChange={(e) => updateComponent(component.id, 'action', e.target.value)}
                    >
                      <option value="repair">Repair</option>
                      <option value="replace">Replace</option>
                      <option value="upgrade">Upgrade</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={currentAssessment.notes}
              onChange={(e) => updateRoomAssessment('notes', e.target.value)}
              placeholder="Any specific issues or observations..."
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overall Property Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Property Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{calculateOverallScore()}/100</div>
              <div className="text-sm text-muted-foreground">
                Based on {Object.keys(assessments).length} of {rooms.length} rooms assessed
              </div>
            </div>
            <Badge 
              variant="default" 
              className={cn(
                calculateOverallScore() >= 80 && "bg-green-500",
                calculateOverallScore() >= 60 && calculateOverallScore() < 80 && "bg-yellow-500",
                calculateOverallScore() < 60 && "bg-red-500"
              )}
            >
              {calculateOverallScore() >= 80 ? 'Good' : calculateOverallScore() >= 60 ? 'Fair' : 'Poor'} Condition
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={Object.keys(assessments).length === 0}
        >
          Continue to Strategy
        </Button>
      </div>
    </div>
  )
}
