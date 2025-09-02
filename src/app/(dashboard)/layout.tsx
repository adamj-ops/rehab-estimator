'use client'

import { ReactNode } from 'react'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { UserProfile } from '@/components/auth/user-profile'
import { Button } from '@/components/ui/button'
import { Save, RotateCcw } from 'lucide-react'
import { useRehabStore } from '@/hooks/use-rehab-store'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { saveProject, resetProject } = useRehabStore()

  const handleSaveDraft = async () => {
    try {
      await saveProject()
    } catch (err) {
      console.error('Failed to save draft:', err)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Rehab Estimator</h1>
              <p className="text-sm text-gray-600">Professional renovation planning and cost estimation</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetProject}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              <UserProfile />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  )
}
