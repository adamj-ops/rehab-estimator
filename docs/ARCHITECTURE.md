# Rehab Estimator - System Architecture

## Overview

Rehab Estimator is a modern web application built on a serverless architecture using Next.js as the full-stack framework with Supabase as the backend-as-a-service provider.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                                 │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js React Application                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │  Pages   │ │Components│ │  Hooks   │ │  State (Zustand) │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              API TIER                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js API Routes                             │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐     │   │
│  │  │ Calculations │ │     AI       │ │    CRUD Operations   │     │   │
│  │  │   Endpoints  │ │ Endpoints    │ │      Endpoints       │     │   │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            DATA TIER                                     │
│  ┌────────────────────────┐  ┌────────────────────────────────────┐    │
│  │       Supabase         │  │         Business Logic              │    │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────────────┐  │    │
│  │  │   PostgreSQL DB  │  │  │  │      Cost Calculator         │  │    │
│  │  │    (with RLS)    │  │  │  │      ROI Calculator          │  │    │
│  │  └──────────────────┘  │  │  │      Priority Engine          │  │    │
│  │  ┌──────────────────┐  │  │  │   Recommendation Engine      │  │    │
│  │  │  Supabase Auth   │  │  │  └──────────────────────────────┘  │    │
│  │  └──────────────────┘  │  └────────────────────────────────────┘    │
│  │  ┌──────────────────┐  │                                            │
│  │  │  Storage (Files) │  │                                            │
│  │  └──────────────────┘  │                                            │
│  └────────────────────────┘                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.x | Full-stack React framework with App Router |
| React | 19.x | UI component library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| shadcn/ui | Latest | Accessible component library |
| React Flow | @xyflow/react | Interactive diagram/flow visualization |
| Recharts | Latest | Data visualization charts |
| Framer Motion | Latest | Animation library |
| Zustand | 5.x | Lightweight state management |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 15.x | Serverless API endpoints |
| Supabase | Latest | Backend-as-a-service |
| PostgreSQL | 15.x | Relational database (via Supabase) |
| Supabase Auth | Latest | Authentication & authorization |

### Development & Build
| Technology | Purpose |
|------------|---------|
| Turbopack | Fast development bundler |
| ESLint | Code linting |
| Storybook | Component documentation |
| npm | Package management |

---

## Directory Structure

```
/rehab-estimator
├── /src
│   ├── /app                      # Next.js App Router
│   │   ├── /api                  # API Routes
│   │   │   ├── /calculations     # Cost, ROI, timeline endpoints
│   │   │   ├── /ai-recommendations
│   │   │   ├── /rehab/projects   # Project CRUD
│   │   │   └── /vendors          # Vendor CRUD
│   │   ├── /auth                 # Authentication pages
│   │   ├── /(dashboard)          # Protected dashboard routes
│   │   │   ├── /dashboard        # Main dashboard
│   │   │   └── /rehab-estimator  # 7-step workflow
│   │   ├── /vendors              # Vendor management
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   │
│   ├── /components               # React components
│   │   ├── /ui                   # shadcn/ui components (48 files)
│   │   ├── /rehab-estimator      # Workflow components
│   │   │   ├── property-details-form.tsx
│   │   │   ├── /assessment
│   │   │   ├── strategy-selector.tsx
│   │   │   ├── /scope-builder
│   │   │   ├── /priority-matrix
│   │   │   ├── /action-plan
│   │   │   ├── /recommendations
│   │   │   └── final-review.tsx
│   │   ├── /flow-nodes           # React Flow custom nodes
│   │   ├── /flow-edges           # React Flow custom edges
│   │   ├── /charts               # Visualization components
│   │   ├── /vendors              # Vendor components
│   │   └── /cost                 # Cost display components
│   │
│   ├── /lib                      # Business logic
│   │   ├── /cost-calculator      # Cost calculation engine
│   │   ├── /roi-calculator       # ROI calculation engine
│   │   ├── /priority-engine      # Priority scoring engine
│   │   ├── /ai                   # AI recommendation engine
│   │   ├── /react-flow           # Flow utilities
│   │   ├── /vendors              # Vendor utilities
│   │   ├── /auth                 # Auth utilities
│   │   └── utils.ts              # Shared utilities
│   │
│   ├── /hooks                    # Custom React hooks
│   │   ├── use-rehab-store.ts    # Zustand store
│   │   ├── use-hydration.ts      # SSR hydration
│   │   └── use-mobile.ts         # Responsive detection
│   │
│   └── /types                    # TypeScript definitions
│       └── rehab.ts              # Domain types
│
├── /supabase                     # Supabase configuration
│   └── /migrations               # Database migrations
│
├── /public                       # Static assets
├── /stories                      # Storybook stories
├── supabase-schema.sql           # Database schema
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.ts
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────────┐
│    rehab_projects   │
├─────────────────────┤
│ id (PK)             │
│ user_id (FK→auth)   │
│ property_id         │
│ project_name        │
│ address_*           │
│ square_feet         │
│ year_built          │
│ property_type       │
│ bedrooms/bathrooms  │
│ investment_strategy │
│ target_buyer        │
│ hold_period_months  │
│ target_roi          │
│ max_budget          │
│ arv                 │
│ purchase_price      │
│ status              │
│ total_estimated_cost│
│ estimated_days      │
│ priority_score      │
│ roi_score           │
│ created_at          │
│ updated_at          │
└─────────────────────┘
         │
         │ 1:N
         ├──────────────────────────────────┐
         │                                  │
         ▼                                  ▼
┌─────────────────────┐         ┌─────────────────────┐
│property_assessments │         │  rehab_scope_items  │
├─────────────────────┤         ├─────────────────────┤
│ id (PK)             │         │ id (PK)             │
│ project_id (FK)     │         │ project_id (FK)     │
│ room_type           │         │ category            │
│ room_name           │         │ subcategory         │
│ condition           │         │ item_name           │
│ components (JSONB)  │         │ description         │
│ notes               │         │ location            │
│ photos[]            │         │ quantity            │
│ created_at          │         │ unit_of_measure     │
│ updated_at          │         │ material_cost       │
└─────────────────────┘         │ labor_cost          │
                                │ total_cost          │
         │                      │ priority            │
         │ 1:N                  │ roi_impact          │
         ▼                      │ days_required       │
┌─────────────────────┐         │ depends_on[]        │
│ market_comparables  │         │ phase               │
├─────────────────────┤         │ included            │
│ id (PK)             │         │ completed           │
│ project_id (FK)     │         │ created_at          │
│ address             │         │ updated_at          │
│ sale_price          │         └─────────────────────┘
│ sale_date           │
│ square_feet         │                  │
│ features (JSONB)    │                  │ 1:N
│ distance_miles      │                  ▼
│ similarity_score    │         ┌─────────────────────┐
│ created_at          │         │rehab_recommendations│
└─────────────────────┘         ├─────────────────────┤
                                │ id (PK)             │
                                │ project_id (FK)     │
                                │ type                │
┌─────────────────────┐         │ title               │
│      vendors        │         │ description         │
├─────────────────────┤         │ estimated_cost      │
│ id (PK)             │         │ roi_impact          │
│ user_id (FK→auth)   │         │ time_impact_days    │
│ name                │         │ market_data (JSONB) │
│ company             │         │ confidence_score    │
│ email               │         │ status              │
│ phone               │         │ created_at          │
│ specialties[]       │         │ updated_at          │
│ vendor_type         │         └─────────────────────┘
│ license_number      │
│ insurance_coverage  │
│ rating              │
│ hourly_rate         │
│ payment_terms       │
│ is_active           │
│ is_preferred        │
│ completed_projects  │
│ total_spent         │
│ notes               │
│ documents (JSONB)   │
│ created_at          │
│ updated_at          │
└─────────────────────┘
```

### Table Details

#### rehab_projects
Primary entity storing project configuration and calculated summaries.
- **RLS**: Users can only access their own projects (`user_id = auth.uid()`)
- **Indexes**: `user_id`, `status`
- **Trigger**: Auto-update `updated_at` on modification

#### property_assessments
Room-by-room condition evaluations with component-level details.
- **RLS**: Access via project ownership
- **JSONB**: `components` stores flexible component assessments
- **Indexes**: `project_id`

#### rehab_scope_items
Individual line items for renovation work with costs and scheduling.
- **RLS**: Access via project ownership
- **Priority**: ENUM (`must`, `should`, `could`, `nice`)
- **Dependencies**: Array of item IDs that must complete first
- **Indexes**: `project_id`, `category`

#### market_comparables
Comparable property sales for ARV validation.
- **RLS**: Access via project ownership
- **JSONB**: `features` stores property characteristics

#### rehab_recommendations
AI/algorithm-generated suggestions for scope optimization.
- **RLS**: Access via project ownership
- **Type**: ENUM (`add`, `remove`, `upgrade`, `downgrade`, `timing`)
- **Status**: ENUM (`pending`, `accepted`, `rejected`, `implemented`)

#### vendors
Contractor and supplier management (user-level, not project-level).
- **RLS**: Users can only access their own vendors
- **JSONB**: `documents` stores file attachments

---

## Business Logic Engines

### 1. Cost Calculator Engine

```
/lib/cost-calculator/
├── cost-engine.ts          # Main calculation orchestrator
├── base-cost-database.ts   # Static cost item database
├── regional-data.ts        # Regional multipliers by location
├── assessment-integration.ts
├── scope-integration.ts
├── types.ts
└── index.ts
```

**Algorithm Flow**:
```
Input: BaseCostItem + Quantity + QualityTier + Location

1. Fetch base cost from database
2. Apply quality tier multiplier (0.75x - 2.2x)
3. Apply regional multipliers (labor + material)
4. Apply market condition adjustments
5. Apply difficulty multiplier
6. Calculate material/labor split
7. Generate cost range (min, expected, max)
8. Return CostCalculationResult
```

**Quality Tier Multipliers**:
| Tier | Materials | Labor | Timeline | ROI Impact |
|------|-----------|-------|----------|------------|
| Budget | 0.75x | 0.85x | 0.9x | 0.6x |
| Standard | 1.0x | 1.0x | 1.0x | 1.0x |
| Premium | 1.5x | 1.2x | 1.1x | 1.4x |
| Luxury | 2.2x | 1.5x | 1.3x | 1.8x |

---

### 2. ROI Calculator Engine

```
/lib/roi-calculator/
├── roi-engine.ts           # Main ROI calculator
├── types.ts
└── index.ts
```

**Calculation Methods**:

1. **Flip ROI**:
   ```
   Net Profit = ARV - Purchase Price - Rehab Cost - Holding Costs - Selling Costs
   ROI = Net Profit / Total Investment × 100
   ```

2. **Rental Returns**:
   ```
   Annual NOI = (Monthly Rent × 12) × (1 - Vacancy) - Operating Expenses
   Cap Rate = NOI / Purchase Price × 100
   Cash-on-Cash = Annual Cash Flow / Cash Invested × 100
   ```

3. **Scenario Analysis**:
   - Conservative: +15% costs, -10% ARV
   - Realistic: Base case
   - Optimistic: -10% costs, +5% ARV

---

### 3. Priority Scoring Engine

```
/lib/priority-engine/
├── priority-scoring.ts     # Advanced priority calculations
├── types.ts
└── index.ts
```

**Scoring Components** (each 0-100):

```typescript
PriorityScore = {
  urgency: calculateUrgencyScore(),      // Timeline pressure
  roiImpact: calculateROIImpactScore(),  // Value contribution
  riskMitigation: calculateRiskScore(),  // Safety/structural
  dependencies: calculateDependencyScore(), // Blocking others
  marketTiming: calculateTimingScore(),  // Seasonal/market
  complexity: calculateComplexityScore() // Execution difficulty
}
```

**Weighted Overall Score**:
```
Overall = Σ(Component × StrategyWeight)
```

Strategy weights vary to optimize for different investment approaches.

---

### 4. AI Recommendation Engine

```
/lib/ai/
├── recommendation-engine.ts  # Rule-based recommendations
├── openai-service.ts        # OpenAI integration (placeholder)
└── types.ts
```

**Rule Categories**:

1. **Cost Savings**
   - High cost + low ROI → suggest downgrade
   - 3+ items for same contractor → suggest bundling

2. **Missing Items**
   - No electrical work + old home → suggest panel check
   - Flip + no curb appeal → suggest exterior improvements

3. **Timing Optimizations**
   - No dependencies + later phase → suggest moving earlier

4. **Worthwhile Upgrades**
   - High ARV + basic kitchen → suggest kitchen upgrade

5. **Removable Items**
   - Nice priority + low ROI → suggest removal option

---

## State Management

### Zustand Store Architecture

```typescript
// /hooks/use-rehab-store.ts

interface RehabStore {
  // State
  project: Partial<RehabProject>
  currentStep: number
  steps: EstimatorStep[]
  estimateSummary: EstimateSummary | null
  priorityMatrix: PriorityMatrixItem[]
  actionPlan: ActionPlanPhase[]
  loading: boolean
  error: string | null

  // Project Actions
  updateProject: (updates: Partial<RehabProject>) => void
  saveProject: () => Promise<void>
  loadProject: (id: string) => Promise<void>
  deleteProject: (id: string) => Promise<void>

  // Step Navigation
  setCurrentStep: (step: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  completeStep: (stepId: number) => void

  // Scope Management
  addScopeItem: (item: ScopeItem) => void
  updateScopeItem: (id: string, updates: Partial<ScopeItem>) => void
  removeScopeItem: (id: string) => void
  toggleScopeItem: (id: string) => void

  // Assessment
  updateAssessment: (room: string, assessment: RoomAssessment) => void

  // Calculations
  calculateEstimate: () => Promise<void>
  calculatePriorityMatrix: () => void
  generateActionPlan: () => void
}
```

**Persistence**: Uses Zustand's `persist` middleware with localStorage.

---

## API Endpoints

### Calculations API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/calculations/estimate` | Calculate cost estimate |
| POST | `/api/calculations/roi` | Calculate ROI metrics |
| POST | `/api/calculations/timeline` | Generate project timeline |
| POST | `/api/calculations/critical-path` | Analyze critical path |
| POST | `/api/calculations/priority-score` | Score item priority |

### AI Recommendations API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/ai-recommendations/generate` | Generate recommendations |
| POST | `/api/ai-recommendations/optimize-scope` | Optimize scope for budget |
| POST | `/api/ai-recommendations/suggest-dependencies` | Auto-suggest dependencies |

### Project CRUD API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/rehab/projects` | List user's projects |
| POST | `/api/rehab/projects` | Create new project |
| GET | `/api/rehab/projects/[id]` | Get project details |
| PUT | `/api/rehab/projects/[id]` | Update project |
| DELETE | `/api/rehab/projects/[id]` | Delete project |

### Vendor CRUD API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/vendors` | List user's vendors |
| POST | `/api/vendors` | Create vendor |
| GET | `/api/vendors/[id]` | Get vendor details |
| PUT | `/api/vendors/[id]` | Update vendor |
| DELETE | `/api/vendors/[id]` | Delete vendor |

---

## React Flow Integration

### Custom Node Types

```typescript
// Task Node
{
  type: 'task',
  data: {
    task: ActionTask,
    isOnCriticalPath: boolean,
    hasConflict: boolean
  }
}

// Phase Node
{
  type: 'phase',
  data: {
    phase: ActionPlanPhase,
    isExpanded: boolean
  }
}

// Milestone Node
{
  type: 'milestone',
  data: {
    name: string,
    date: Date,
    isCompleted: boolean
  }
}

// Contractor Node
{
  type: 'contractor',
  data: {
    contractor: Contractor,
    assignedTasks: string[]
  }
}
```

### Custom Edge Types

```typescript
// Dependency Edge
{
  type: 'dependency',
  data: {
    dependencyType: 'FS' | 'SS' | 'FF' | 'SF',
    lag: number
  }
}

// Timeline Edge
{
  type: 'timeline',
  data: {
    isCriticalPath: boolean
  }
}
```

### Utility Functions

```typescript
// Auto-layout nodes using topological sort
autoLayoutNodes(nodes: Node[], edges: Edge[]): Node[]

// Calculate critical path using CPM
calculateCriticalPath(nodes: Node[], edges: Edge[]): string[]

// Detect scheduling conflicts
detectConflicts(nodes: Node[], edges: Edge[]): Conflict[]
```

---

## Security Architecture

### Authentication Flow

```
User → Supabase Auth → JWT Token → API Request
                                        │
                                        ▼
                              RLS Policy Check
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                           Allowed            Denied
                              │                   │
                              ▼                   ▼
                           Data              403 Error
```

### Row-Level Security (RLS)

All tables implement RLS with policies ensuring users can only access their own data:

```sql
-- Example: rehab_projects
CREATE POLICY "Users can view own projects"
  ON rehab_projects FOR SELECT
  USING (auth.uid() = user_id);

-- Example: property_assessments (via project)
CREATE POLICY "Users can view own assessments"
  ON property_assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rehab_projects
      WHERE id = project_id AND user_id = auth.uid()
    )
  );
```

### Data Protection

1. **In Transit**: HTTPS only (enforced by Supabase)
2. **At Rest**: PostgreSQL encryption (Supabase managed)
3. **Secrets**: Environment variables for API keys
4. **Validation**: Zod schemas on all API inputs

---

## Deployment Architecture

### Recommended Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                          Vercel                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Next.js Application                     │  │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │  │
│  │   │   Static    │   │   Server    │   │  API Routes │    │  │
│  │   │   Assets    │   │  Components │   │ (Serverless)│    │  │
│  │   └─────────────┘   └─────────────┘   └─────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Supabase                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐   │
│  │  PostgreSQL │   │    Auth     │   │      Storage        │   │
│  │   Database  │   │   Service   │   │   (Photos/Docs)     │   │
│  └─────────────┘   └─────────────┘   └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (for AI features)
OPENAI_API_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=
```

---

## Performance Considerations

### Client-Side Optimization

1. **Code Splitting**: Automatic via Next.js App Router
2. **Image Optimization**: Next.js Image component
3. **State Persistence**: Zustand with localStorage
4. **Lazy Loading**: React.lazy for heavy components (React Flow)

### Database Optimization

1. **Indexes**: On frequently queried columns
2. **Connection Pooling**: Supabase's built-in pooler
3. **Query Optimization**: Limit joins, use select columns

### React Flow Performance

1. **Virtualization**: Only render visible nodes
2. **Node Memoization**: Prevent unnecessary re-renders
3. **Batch Updates**: Group node position changes
4. **Maximum Nodes**: Tested up to 200 nodes smoothly

---

## Future Architecture Considerations

### Python Microservice (Planned)

For advanced calculations that benefit from Python's data science ecosystem:

```
┌─────────────────┐     ┌─────────────────┐
│   Next.js API   │────▶│  Python FastAPI │
│    Routes       │◀────│   Microservice  │
└─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌───────────┐
                        │  NumPy    │
                        │  Pandas   │
                        │  SciPy    │
                        └───────────┘
```

**Use Cases**:
- Monte Carlo simulation for cost ranges
- Machine learning for market predictions
- Advanced statistical analysis

### Mobile App (Planned)

React Native app sharing business logic:

```
/shared
├── /types          # Shared TypeScript types
├── /lib            # Shared business logic
└── /hooks          # Shared custom hooks

/web (Next.js)
/mobile (React Native)
```

### Real-Time Collaboration (Planned)

Using Supabase Realtime for multi-user editing:

```
User A ──┐
         │     ┌───────────────┐     ┌──────────────┐
         ├────▶│   Supabase    │────▶│   Broadcast  │
         │     │   Realtime    │     │   Channel    │
User B ──┤     └───────────────┘     └──────────────┘
         │                                   │
User C ──┘                                   ▼
                                    [All Users Receive]
```
