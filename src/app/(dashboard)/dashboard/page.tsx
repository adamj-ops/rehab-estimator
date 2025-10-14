'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Plus, 
  FolderKanban, 
  TrendingUp, 
  Calculator, 
  Clock,
  Home,
  Search,
  Trash2,
  Edit,
  MoreVertical,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { RehabProject } from '@/types/rehab'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'active' | 'completed'>('all')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/rehab/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || [])
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/rehab/projects/${projectId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  // Calculate stats
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.max_budget || 0), 0),
    avgROI: projects.length > 0 
      ? projects.reduce((sum, p) => sum + (p.target_roi || 0), 0) / projects.length 
      : 0
  }

  // Filter and search projects
  const filteredProjects = projects
    .filter(p => statusFilter === 'all' || p.status === statusFilter)
    .filter(p => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        p.project_name?.toLowerCase().includes(query) ||
        p.address_street?.toLowerCase().includes(query) ||
        p.address_city?.toLowerCase().includes(query)
      )
    })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your rehab projects and track ROI
          </p>
        </div>
        <Button onClick={() => router.push('/rehab-estimator')}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROI Target</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgROI > 0 ? `${stats.avgROI.toFixed(1)}%` : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined budgets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Active projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                View and manage all your rehab projects
              </CardDescription>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'draft', 'active', 'completed'] as const).map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {projects.length === 0 ? 'No projects yet' : 'No matching projects'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {projects.length === 0 
                  ? 'Create your first rehab project to get started'
                  : 'Try adjusting your search or filters'
                }
              </p>
              {projects.length === 0 && (
                <Button onClick={() => router.push('/rehab-estimator')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {project.project_name || 'Untitled Project'}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {project.address_city && project.address_state
                              ? `${project.address_city}, ${project.address_state}`
                              : 'No address'}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/rehab-estimator?projectId=${project.id}`)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteProject(project.id)
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent 
                    className="space-y-3"
                    onClick={() => router.push(`/rehab-estimator?projectId=${project.id}`)}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={
                        project.status === 'active' ? 'default' :
                        project.status === 'completed' ? 'secondary' :
                        'outline'
                      }>
                        {project.status || 'draft'}
                      </Badge>
                    </div>

                    {project.arv && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">ARV</span>
                        <span className="font-semibold">${project.arv.toLocaleString()}</span>
                      </div>
                    )}

                    {project.max_budget && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Budget</span>
                        <span>${project.max_budget.toLocaleString()}</span>
                      </div>
                    )}

                    {project.target_roi && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Target ROI</span>
                        <span className="text-green-600 font-semibold">{project.target_roi}%</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
                      <Calendar className="h-3 w-3" />
                      <span>
                        Updated {project.updated_at ? format(new Date(project.updated_at), 'MMM d, yyyy') : 'recently'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
