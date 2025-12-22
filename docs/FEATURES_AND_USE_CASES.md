# Rehab Estimator - Features and Use Cases

## Table of Contents
1. [Feature Catalog](#feature-catalog)
2. [Detailed Use Cases](#detailed-use-cases)
3. [User Workflows](#user-workflows)
4. [Feature Dependencies](#feature-dependencies)

---

## Feature Catalog

### Core Features

#### F1: 7-Step Renovation Workflow

| Feature ID | F1 |
|------------|-----|
| **Name** | 7-Step Renovation Workflow |
| **Description** | Guided workflow that takes users from property details to final action plan |
| **Priority** | Must Have |
| **Complexity** | High |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F1.1 | Property Details | Capture address, specs, and financial data |
| F1.2 | Condition Assessment | Room-by-room property evaluation |
| F1.3 | Strategy & Goals | Investment strategy and target configuration |
| F1.4 | Scope Building | Create renovation scope with cost estimates |
| F1.5 | Priority Analysis | ROI vs. Urgency matrix visualization |
| F1.6 | Action Plan | Interactive timeline generation |
| F1.7 | Final Review | Summary dashboard and export |

---

#### F2: Cost Calculation Engine

| Feature ID | F2 |
|------------|-----|
| **Name** | Cost Calculation Engine |
| **Description** | Accurate cost estimation with regional adjustments and quality tiers |
| **Priority** | Must Have |
| **Complexity** | High |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F2.1 | Base Cost Database | 50+ renovation items with pricing |
| F2.2 | Quality Tier Multipliers | Budget/Standard/Premium/Luxury adjustments |
| F2.3 | Regional Adjustments | Cost-of-living and labor rate multipliers |
| F2.4 | Material/Labor Split | Automatic breakdown of cost components |
| F2.5 | Difficulty Multipliers | Project complexity adjustments |
| F2.6 | Cost Range Estimation | Min/expected/max cost projections |

**Calculation Formula**:
```
Total Cost = Base Price × Quantity × Quality Multiplier × Regional Multiplier × Difficulty Factor
```

---

#### F3: ROI Calculator

| Feature ID | F3 |
|------------|-----|
| **Name** | ROI Calculator |
| **Description** | Strategy-specific return on investment calculations |
| **Priority** | Must Have |
| **Complexity** | Medium |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F3.1 | Flip ROI | Profit calculation for fix-and-flip |
| F3.2 | Rental Returns | Cap rate and cash-on-cash for rentals |
| F3.3 | Cash Flow Projection | Monthly/annual cash flow forecasting |
| F3.4 | Scenario Analysis | Conservative/Realistic/Optimistic projections |
| F3.5 | Break-Even Analysis | Time to recoup investment |
| F3.6 | Risk Assessment | Market, liquidity, execution risk scoring |

---

#### F4: Priority Scoring Engine

| Feature ID | F4 |
|------------|-----|
| **Name** | Priority Scoring Engine |
| **Description** | Intelligent prioritization of renovation items |
| **Priority** | Must Have |
| **Complexity** | Medium |

**Scoring Components**:
| Component | Weight Range | Description |
|-----------|--------------|-------------|
| Urgency | 10-25% | Timeline pressure, safety concerns |
| ROI Impact | 25-35% | Value contribution to sale/rent |
| Risk Mitigation | 15-25% | Safety, structural, code compliance |
| Dependencies | 15-20% | Items blocking other work |
| Market Timing | 5-15% | Seasonal and market factors |
| Complexity | 5-10% | Execution difficulty |

---

#### F5: Interactive Timeline (React Flow)

| Feature ID | F5 |
|------------|-----|
| **Name** | Interactive Timeline Visualization |
| **Description** | Drag-and-drop project scheduling with dependency management |
| **Priority** | Must Have |
| **Complexity** | Very High |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F5.1 | Task Nodes | Individual task visualization |
| F5.2 | Phase Grouping | Visual grouping of related tasks |
| F5.3 | Dependency Edges | Visual connections between tasks |
| F5.4 | Critical Path | Automatic CPM calculation and highlighting |
| F5.5 | Drag-and-Drop | Interactive rescheduling |
| F5.6 | Conflict Detection | Resource and scheduling conflict alerts |
| F5.7 | Auto-Layout | Automatic node positioning |
| F5.8 | Zoom/Pan Controls | Navigation within complex diagrams |

---

#### F6: AI Recommendations

| Feature ID | F6 |
|------------|-----|
| **Name** | AI Recommendation Engine |
| **Description** | Intelligent suggestions for scope optimization |
| **Priority** | Should Have |
| **Complexity** | Medium |

**Recommendation Types**:
| Type | Description | Trigger |
|------|-------------|---------|
| Cost Savings | Suggest cheaper alternatives | High cost + low ROI items |
| Missing Items | Suggest additions | Gaps in scope vs. assessment |
| Upgrades | Suggest quality improvements | High ARV + basic finishes |
| Downgrades | Suggest cost reduction | Over-improvement for market |
| Timing | Suggest schedule changes | Items with no dependencies |
| Bundling | Suggest contractor grouping | 3+ items for same trade |

---

#### F7: Vendor Management

| Feature ID | F7 |
|------------|-----|
| **Name** | Vendor Management System |
| **Description** | Contractor and supplier tracking with performance history |
| **Priority** | Should Have |
| **Complexity** | Medium |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F7.1 | Vendor CRUD | Create, read, update, delete vendors |
| F7.2 | Specialties Tracking | Trade categories and skills |
| F7.3 | Performance Rating | 1-5 star rating system |
| F7.4 | Financial Tracking | Spend history and rates |
| F7.5 | Compliance Tracking | License and insurance verification |
| F7.6 | Document Storage | W-9, contracts, certificates |
| F7.7 | Preferred Vendors | Mark and prioritize favorites |

---

#### F8: Project Dashboard

| Feature ID | F8 |
|------------|-----|
| **Name** | Project Dashboard |
| **Description** | Central hub for managing multiple projects |
| **Priority** | Must Have |
| **Complexity** | Low |

**Sub-Features**:
| ID | Name | Description |
|----|------|-------------|
| F8.1 | Project List | Grid/list view of all projects |
| F8.2 | Quick Stats | Total projects, spend, ROI summary |
| F8.3 | Status Management | Draft/Active/Completed/Archived |
| F8.4 | Search & Filter | Find projects by various criteria |
| F8.5 | Recent Activity | Audit log of recent actions |
| F8.6 | Quick Actions | Edit, duplicate, delete shortcuts |

---

#### F9: Data Visualization

| Feature ID | F9 |
|------------|-----|
| **Name** | Data Visualization Suite |
| **Description** | Charts and graphs for cost, ROI, and timeline data |
| **Priority** | Must Have |
| **Complexity** | Medium |

**Chart Types**:
| Chart | Purpose | Library |
|-------|---------|---------|
| Cost Breakdown Pie | Category cost distribution | Recharts |
| Cost Breakdown Bar | Material vs. Labor split | Recharts |
| ROI Scenario Bar | Conservative/Realistic/Optimistic | Recharts |
| Cash Flow Line | Cumulative spend over time | Recharts |
| Priority Matrix Scatter | ROI vs. Urgency plot | Custom |
| Timeline Gantt | Project schedule | React Flow |

---

#### F10: Export & Reporting

| Feature ID | F10 |
|------------|-----|
| **Name** | Export & Reporting |
| **Description** | Generate shareable reports and data exports |
| **Priority** | Should Have |
| **Complexity** | Medium |

**Export Formats**:
| Format | Content | Use Case |
|--------|---------|----------|
| PDF Report | Summary, charts, scope table | Share with lenders/partners |
| Excel Spreadsheet | Detailed scope items, formulas | Custom analysis |
| Timeline Image | PNG/PDF of React Flow diagram | Contractor handoff |
| JSON Backup | Full project data | Data portability |

---

### Supporting Features

#### F11: Authentication System
- Email/password registration and login
- Password reset flow
- Social login (Google OAuth)
- Session management
- Row-level security

#### F12: Step Progress Indicator
- Visual progress through 7 steps
- Step completion status
- Click to navigate between steps
- Save progress indicator

#### F13: Auto-Save
- Automatic save every 30 seconds
- Manual save option
- Conflict resolution
- Offline support (localStorage)

#### F14: Responsive Design
- Desktop optimized (1024px+)
- Tablet compatible (768px+)
- Mobile-friendly (320px+)
- Touch-friendly controls

---

## Detailed Use Cases

### UC-001: Create New Rehab Project

| Use Case ID | UC-001 |
|-------------|--------|
| **Name** | Create New Rehab Project |
| **Actor** | Investor |
| **Precondition** | User is logged in |
| **Trigger** | User clicks "New Project" button |

**Main Flow**:
1. User clicks "New Project" on dashboard
2. System displays project creation form
3. User enters project name
4. User enters property address
5. User clicks "Create"
6. System saves project with draft status
7. System redirects to Property Details step
8. User enters property specifications
9. User enters financial data
10. User clicks "Continue"
11. System saves and advances to next step

**Alternative Flows**:
- 3a. Invalid project name → Show validation error
- 4a. Invalid address format → Show address validation error
- 10a. Required fields missing → Highlight required fields

**Postcondition**: Project created and user on Step 2

---

### UC-002: Complete Condition Assessment

| Use Case ID | UC-002 |
|-------------|--------|
| **Name** | Complete Condition Assessment |
| **Actor** | Investor |
| **Precondition** | User is on Assessment step |
| **Trigger** | User ready to assess property |

**Main Flow**:
1. System displays room selection interface
2. User selects rooms to include
3. User clicks on first room to assess
4. System displays room assessment form
5. User rates overall room condition (1-5)
6. User evaluates individual components
7. User marks components needing work
8. User selects action for each (repair/replace/upgrade)
9. User optionally adds notes
10. User optionally uploads photos
11. User clicks "Save Room"
12. System saves assessment
13. Repeat steps 3-12 for each room
14. User clicks "Continue"
15. System advances to Strategy step

**Alternative Flows**:
- 2a. Add custom room → Show room name input
- 6a. Custom component → Show component creation
- 10a. Photo upload fails → Show retry option

**Postcondition**: All rooms assessed, ready for strategy selection

---

### UC-003: Build Renovation Scope

| Use Case ID | UC-003 |
|-------------|--------|
| **Name** | Build Renovation Scope |
| **Actor** | Investor |
| **Precondition** | Strategy selected |
| **Trigger** | User is on Scope Building step |

**Main Flow**:
1. System displays scope builder interface
2. System shows recommended items based on assessment
3. User reviews recommended items
4. User accepts/rejects each recommendation
5. User browses cost database for additional items
6. User selects item category
7. User selects specific item
8. User specifies quantity
9. User selects quality tier
10. User clicks "Add to Scope"
11. System calculates cost and adds to scope
12. Repeat steps 5-11 as needed
13. User sets priority for each item (Must/Should/Could/Nice)
14. User optionally sets dependencies
15. User reviews scope summary
16. User clicks "Continue"

**Alternative Flows**:
- 5a. Add custom item → Display custom item form
- 11a. Exceeds budget → Show budget warning
- 14a. Circular dependency → Show error and prevent

**Postcondition**: Complete scope with costs, priorities, dependencies

---

### UC-004: Analyze Priority Matrix

| Use Case ID | UC-004 |
|-------------|--------|
| **Name** | Analyze Priority Matrix |
| **Actor** | Investor |
| **Precondition** | Scope items defined |
| **Trigger** | User is on Priority Analysis step |

**Main Flow**:
1. System calculates priority scores for all items
2. System displays priority matrix (ROI vs. Urgency)
3. User reviews item positions on matrix
4. User clicks on item to view score details
5. System shows score component breakdown
6. User optionally drags item to adjust position
7. System updates item priority based on new position
8. User optionally excludes low-priority items
9. User reviews quadrant summaries
10. User clicks "Continue"

**Alternative Flows**:
- 4a. Filter by category → Redraw matrix with filter
- 6a. Invalid position → Snap back to original
- 8a. Exclude critical item → Show warning

**Postcondition**: Prioritized scope ready for action plan

---

### UC-005: Generate Action Plan

| Use Case ID | UC-005 |
|-------------|--------|
| **Name** | Generate Action Plan |
| **Actor** | Investor |
| **Precondition** | Priority analysis complete |
| **Trigger** | User is on Action Plan step |

**Main Flow**:
1. User clicks "Generate Action Plan"
2. System analyzes scope items and dependencies
3. System groups items into phases
4. System calculates phase durations
5. System identifies critical path
6. System displays React Flow timeline
7. User reviews generated plan
8. User optionally assigns contractors to tasks
9. User optionally drags tasks to reschedule
10. System validates dependencies
11. System checks for conflicts
12. User resolves any conflicts shown
13. User clicks "Continue"

**Alternative Flows**:
- 9a. Dependency violation → Show warning and prevent
- 11a. Contractor conflict → Highlight conflict and suggest resolution
- 12a. Cannot resolve → Allow override with confirmation

**Postcondition**: Complete action plan with timeline and assignments

---

### UC-006: Review and Export Project

| Use Case ID | UC-006 |
|-------------|--------|
| **Name** | Review and Export Project |
| **Actor** | Investor |
| **Precondition** | Action plan complete |
| **Trigger** | User is on Final Review step |

**Main Flow**:
1. System displays summary dashboard
2. User reviews total cost breakdown
3. User reviews ROI projections
4. User reviews timeline summary
5. User reviews scope item table
6. User optionally views cash flow schedule
7. User clicks "Export PDF"
8. System generates PDF report
9. System downloads PDF to user device
10. User optionally clicks "Export Excel"
11. System generates Excel file
12. System downloads Excel to user device
13. User clicks "Finalize Project"
14. System changes project status to Active

**Alternative Flows**:
- 7a. Export fails → Show error and retry option
- 13a. Missing required data → Prevent finalization and show issues

**Postcondition**: Finalized project with exported reports

---

### UC-007: Manage Vendors

| Use Case ID | UC-007 |
|-------------|--------|
| **Name** | Manage Vendors |
| **Actor** | Investor |
| **Precondition** | User logged in |
| **Trigger** | User navigates to Vendors section |

**Main Flow**:
1. System displays vendor list
2. User clicks "Add Vendor"
3. System displays vendor form
4. User enters vendor name and company
5. User enters contact information
6. User selects vendor type (contractor/supplier/service)
7. User selects specialties
8. User enters rate information
9. User clicks "Save"
10. System validates and saves vendor
11. System displays success message
12. System returns to vendor list with new vendor

**Alternative Flows**:
- 4a. Duplicate vendor → Show warning
- 9a. Validation error → Highlight invalid fields
- Edit flow: Click vendor → Edit form → Update
- Delete flow: Click delete → Confirm → Remove

**Postcondition**: Vendor list updated

---

### UC-008: Accept AI Recommendation

| Use Case ID | UC-008 |
|-------------|--------|
| **Name** | Accept AI Recommendation |
| **Actor** | Investor |
| **Precondition** | On Scope Building or Priority step |
| **Trigger** | AI recommendations displayed |

**Main Flow**:
1. System displays AI recommendation panel
2. User reviews recommendation details
3. User sees cost/ROI impact of recommendation
4. User reads reasoning explanation
5. User clicks "Accept" button
6. System applies recommendation to scope
7. System recalculates totals
8. System updates recommendation status to "Accepted"
9. System shows success confirmation

**Alternative Flows**:
- 5a. User clicks "Reject" → Mark as rejected, remove from list
- 5b. User clicks "Later" → Dismiss temporarily
- 6a. Conflict with existing item → Show resolution options

**Postcondition**: Scope updated with recommendation applied

---

## User Workflows

### Workflow 1: First-Time User Onboarding

```
Start → Register Account → Email Verification → Login
  → Dashboard Tutorial (optional) → Create First Project
  → Complete Property Details → Complete Assessment
  → Select Strategy → Build Scope → Review Priority
  → Generate Action Plan → Final Review → Export Report
```

**Key Touchpoints**:
- Welcome email with quick start guide
- In-app tooltips on first use
- Sample project for exploration
- Contextual help throughout workflow

---

### Workflow 2: Quick Flip Estimation

```
Login → New Project → Property Details (minimal)
  → Skip Assessment (use quick mode)
  → Select "Flip" Strategy → Browse Scope Items
  → Add common flip items → Set priorities
  → Generate Quick Estimate → Review ROI
  → Export Summary
```

**Duration**: 5-10 minutes

---

### Workflow 3: Detailed Rental Analysis

```
Login → New Project → Full Property Details
  → Complete Room-by-Room Assessment → Upload Photos
  → Select "Rental" Strategy → Set hold period (10+ years)
  → Generate Scope from Assessment → Adjust priorities
  → Focus on ROI and durability items
  → Review Priority Matrix (emphasize tenant-proof items)
  → Generate Action Plan → Review Cash Flow Projection
  → Export Detailed Report
```

**Duration**: 30-45 minutes

---

### Workflow 4: Contractor Coordination

```
Login → Open Existing Project → Navigate to Action Plan
  → Assign Contractors to Tasks → Check for Conflicts
  → Resolve Scheduling Issues → Update Vendor Contacts
  → Export Timeline Image → Share with Contractors
  → Update Task Statuses as Work Progresses
  → Track Actual vs. Estimated Costs
```

---

### Workflow 5: Portfolio Review

```
Login → Dashboard → Filter by Status (Active)
  → Review Project Cards → Compare ROI Projections
  → Identify underperforming projects
  → Drill into problem project → Review Priority Matrix
  → Accept AI recommendations to optimize
  → Update scope and recalculate
  → Export updated reports
```

---

## Feature Dependencies

### Dependency Matrix

| Feature | Depends On |
|---------|------------|
| F1 (Workflow) | F11 (Auth), F12 (Progress) |
| F2 (Costs) | None (core engine) |
| F3 (ROI) | F2 (Costs) |
| F4 (Priority) | F2 (Costs), F3 (ROI) |
| F5 (Timeline) | F4 (Priority) |
| F6 (AI) | F2 (Costs), F4 (Priority) |
| F7 (Vendors) | F11 (Auth) |
| F8 (Dashboard) | F11 (Auth) |
| F9 (Charts) | F2 (Costs), F3 (ROI) |
| F10 (Export) | F9 (Charts), F5 (Timeline) |

### Implementation Order (Recommended)

```
Phase 1: Foundation
├── F11: Authentication
├── F12: Step Progress
├── F13: Auto-Save
└── F14: Responsive Design

Phase 2: Core Engines
├── F2: Cost Calculation Engine
├── F3: ROI Calculator
└── F4: Priority Scoring Engine

Phase 3: Workflow Steps 1-4
├── F1.1: Property Details
├── F1.2: Condition Assessment
├── F1.3: Strategy & Goals
└── F1.4: Scope Building

Phase 4: Visualization
├── F9: Data Visualization
├── F1.5: Priority Analysis
└── F5: Interactive Timeline

Phase 5: Review & Output
├── F1.6: Action Plan
├── F1.7: Final Review
└── F10: Export & Reporting

Phase 6: Enhancement
├── F6: AI Recommendations
├── F7: Vendor Management
└── F8: Project Dashboard (enhanced)
```

---

## Feature Acceptance Criteria Summary

### Minimum Viable Feature Set (MVP)

| Feature | Acceptance Criteria Count |
|---------|---------------------------|
| User Registration/Login | 8 |
| Property Details Form | 12 |
| Condition Assessment | 15 |
| Strategy Selection | 6 |
| Scope Building (basic) | 18 |
| Cost Calculation | 10 |
| Priority Matrix | 8 |
| Action Plan (basic) | 10 |
| Final Summary | 8 |
| Basic Charts | 5 |
| **Total MVP** | **100** |

### Full Feature Set

| Feature | Acceptance Criteria Count |
|---------|---------------------------|
| MVP Features | 100 |
| AI Recommendations | 15 |
| Vendor Management | 20 |
| Advanced Timeline | 12 |
| Export/Reports | 10 |
| Dashboard Enhancements | 8 |
| Settings/Preferences | 6 |
| **Total Full** | **171** |
