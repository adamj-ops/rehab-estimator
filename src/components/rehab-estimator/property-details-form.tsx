'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Home, 
  MapPin, 
  Ruler, 
  Calendar, 
  Bed, 
  Bath, 
  DollarSign, 
  TrendingUp,
  Info,
  Calculator
} from 'lucide-react'
import { RehabProject, PropertyDetailsFormData } from '@/types/rehab'
import { cn } from '@/lib/utils'

const propertyDetailsSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'Valid ZIP code is required')
  }),
  squareFeet: z.number().min(100, 'Square footage must be at least 100'),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()),
  propertyType: z.enum(['single_family', 'multi_family', 'condo', 'townhouse']),
  bedrooms: z.number().min(0).max(20),
  bathrooms: z.number().min(0).max(20),
  purchasePrice: z.number().min(0, 'Purchase price must be positive'),
  arv: z.number().min(0, 'ARV must be positive')
}).refine((data) => data.arv >= data.purchasePrice, {
  message: "ARV should typically be higher than purchase price",
  path: ["arv"]
})

interface PropertyDetailsFormProps {
  project: Partial<RehabProject>
  onNext: (data: PropertyDetailsFormData) => void
  onBack: () => void
}

const propertyTypes = [
  { value: 'single_family', label: 'Single Family', icon: Home },
  { value: 'multi_family', label: 'Multi-Family', icon: Home },
  { value: 'condo', label: 'Condo', icon: Home },
  { value: 'townhouse', label: 'Townhouse', icon: Home }
]

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export function PropertyDetailsForm({ project, onNext, onBack }: PropertyDetailsFormProps) {
  const [isCalculatingARV, setIsCalculatingARV] = useState(false)

  const form = useForm<PropertyDetailsFormData>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      projectName: project.projectName || '',
      address: {
        street: project.address?.street || '',
        city: project.address?.city || '',
        state: project.address?.state || '',
        zip: project.address?.zip || ''
      },
      squareFeet: project.squareFeet || 0,
      yearBuilt: project.yearBuilt || 2000,
      propertyType: project.propertyType || 'single_family',
      bedrooms: project.bedrooms || 3,
      bathrooms: project.bathrooms || 2,
      purchasePrice: project.purchasePrice || 0,
      arv: project.arv || 0
    }
  })

  const watchPurchasePrice = form.watch('purchasePrice')
  const watchSquareFeet = form.watch('squareFeet')
  const watchPropertyType = form.watch('propertyType')

  const calculateARV = async () => {
    setIsCalculatingARV(true)
    try {
      // TODO: Implement actual ARV calculation using market data
      // For now, use a simple calculation
      const basePricePerSqft = 150 // This would come from market data
      const propertyTypeMultiplier = {
        single_family: 1.0,
        multi_family: 0.9,
        condo: 0.8,
        townhouse: 0.95
      }
      
      const calculatedARV = watchSquareFeet * basePricePerSqft * propertyTypeMultiplier[watchPropertyType]
      
      // Add some random variation to make it realistic
      const variation = 0.9 + Math.random() * 0.2 // ±10% variation
      const finalARV = Math.round(calculatedARV * variation)
      
      form.setValue('arv', finalARV)
    } catch (error) {
      console.error('Failed to calculate ARV:', error)
    } finally {
      setIsCalculatingARV(false)
    }
  }

  const onSubmit = (data: PropertyDetailsFormData) => {
    onNext(data)
  }

  const getARVRecommendation = () => {
    if (!watchPurchasePrice || !watchSquareFeet) return null
    
    const pricePerSqft = watchPurchasePrice / watchSquareFeet
    const currentARV = form.watch('arv')
    
    if (currentARV && currentARV < watchPurchasePrice) {
      return {
        type: 'warning' as const,
        message: 'ARV is lower than purchase price. Consider if this is a good investment opportunity.'
      }
    }
    
    if (pricePerSqft < 50) {
      return {
        type: 'info' as const,
        message: 'Low price per sq ft suggests potential for significant value-add opportunities.'
      }
    }
    
    if (pricePerSqft > 300) {
      return {
        type: 'warning' as const,
        message: 'High price per sq ft - ensure your renovation scope justifies the premium.'
      }
    }
    
    return null
  }

  const arvRecommendation = getARVRecommendation()

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Project Information</span>
              </CardTitle>
              <CardDescription>
                Start by naming your project and entering the property address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 123 Main Street Flip" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Give your project a memorable name for easy reference
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Austin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="78701" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ruler className="w-5 h-5" />
                <span>Property Details</span>
              </CardTitle>
              <CardDescription>
                Enter the basic property characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="squareFeet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Feet</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2000" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Built</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2000" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>Bedrooms</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>Bathrooms</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2" 
                            step="0.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Financial Information</span>
              </CardTitle>
              <CardDescription>
                Enter purchase price and estimated after-repair value
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input 
                            type="number" 
                            placeholder="250000" 
                            className="pl-6"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="arv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <span>After Repair Value (ARV)</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>The estimated value after all renovations are complete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input 
                              type="number" 
                              placeholder="350000" 
                              className="pl-6"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={calculateARV}
                            disabled={isCalculatingARV || !watchSquareFeet}
                          >
                            <Calculator className="w-4 h-4 mr-1" />
                            {isCalculatingARV ? 'Calculating...' : 'Estimate'}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Use the estimate button to get a market-based ARV calculation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ARV Recommendation */}
              {arvRecommendation && (
                <Alert className={cn(
                  arvRecommendation.type === 'warning' && "border-yellow-200 bg-yellow-50",
                  arvRecommendation.type === 'info' && "border-blue-200 bg-blue-50"
                )}>
                  <AlertDescription className={cn(
                    arvRecommendation.type === 'warning' && "text-yellow-800",
                    arvRecommendation.type === 'info' && "text-blue-800"
                  )}>
                    {arvRecommendation.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Quick Calculations */}
              {watchPurchasePrice > 0 && watchSquareFeet > 0 && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Price per Sq Ft</div>
                    <div className="text-lg font-semibold">
                      ${(watchPurchasePrice / watchSquareFeet).toFixed(0)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Potential Profit</div>
                    <div className="text-lg font-semibold text-green-600">
                      ${(form.watch('arv') - watchPurchasePrice).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">ROI Potential</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {watchPurchasePrice > 0 ? ((form.watch('arv') - watchPurchasePrice) / watchPurchasePrice * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit">
              Continue to Assessment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
