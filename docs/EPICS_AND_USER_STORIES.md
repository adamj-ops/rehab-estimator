# Rehab Estimator - Epics and User Stories

## Overview

This document defines the complete set of epics and user stories for rebuilding Rehab Estimator. Stories are organized by epic and prioritized using MoSCoW method.

**Priority Legend**:
- 🔴 **Must Have** - Core MVP functionality
- 🟡 **Should Have** - Important but not blocking launch
- 🟢 **Could Have** - Nice to have, adds value
- ⚪ **Won't Have (Now)** - Future consideration

---

## Epic 1: User Authentication & Account Management

> As a real estate investor, I need secure access to my project data so that my investment information remains private.

### User Stories

#### 🔴 1.1 User Registration
**As a** new user
**I want to** create an account with email and password
**So that** I can save my projects and access them later

**Acceptance Criteria**:
- User can register with email and password
- Email validation required
- Password must be minimum 8 characters
- Confirmation email sent
- User redirected to dashboard after verification

---

#### 🔴 1.2 User Login
**As a** registered user
**I want to** log in to my account
**So that** I can access my saved projects

**Acceptance Criteria**:
- Login with email and password
- "Remember me" option available
- Show error message for invalid credentials
- Redirect to dashboard on success
- Session persists across browser refreshes

---

#### 🔴 1.3 Password Reset
**As a** user who forgot my password
**I want to** reset my password via email
**So that** I can regain access to my account

**Acceptance Criteria**:
- Request password reset with email
- Receive email with reset link (valid 24 hours)
- Set new password meeting requirements
- Confirmation of successful reset
- Redirect to login

---

#### 🟡 1.4 Social Login (Google)
**As a** user
**I want to** sign in with my Google account
**So that** I can access the app without creating a new password

**Acceptance Criteria**:
- OAuth flow with Google
- Auto-create account if new user
- Link to existing account if email matches
- Profile picture imported

---

#### 🟢 1.5 Profile Management
**As a** user
**I want to** update my profile information
**So that** I can keep my account details current

**Acceptance Criteria**:
- Update display name
- Change email (with verification)
- Update password
- Delete account option (with confirmation)

---

## Epic 2: Property Details & Project Setup

> As an investor, I need to capture comprehensive property information to establish a foundation for accurate estimates.

### User Stories

#### 🔴 2.1 Create New Project
**As an** investor
**I want to** create a new rehab project
**So that** I can start planning a renovation

**Acceptance Criteria**:
- Enter project name
- Input property address (street, city, state, zip)
- Project saved with draft status
- Navigate to property details form

---

#### 🔴 2.2 Enter Property Details
**As an** investor
**I want to** enter property specifications
**So that** the system can provide accurate cost estimates

**Acceptance Criteria**:
- Enter square footage
- Enter lot size
- Enter year built
- Select property type (single family, multi-family, condo, townhouse)
- Enter bedroom count
- Enter bathroom count
- All fields validated for appropriate ranges

---

#### 🔴 2.3 Enter Financial Data
**As an** investor
**I want to** enter financial information
**So that** I can track ROI and budget

**Acceptance Criteria**:
- Enter purchase price
- Enter ARV (After Repair Value)
- Enter maximum budget
- Enter neighborhood comparable average
- Currency formatting applied
- Minimum/maximum validation

---

#### 🟡 2.4 Save Project Progress
**As an** investor
**I want to** save my progress at any point
**So that** I can continue later without losing work

**Acceptance Criteria**:
- Auto-save every 30 seconds
- Manual save button available
- Visual indicator when saving
- Confirmation when saved successfully
- Resume from exact step when returning

---

#### 🟢 2.5 Duplicate Project
**As an** investor
**I want to** duplicate an existing project
**So that** I can create similar estimates faster

**Acceptance Criteria**:
- Duplicate button on project card
- Copy all property details
- Copy all scope items
- Reset status to draft
- Rename with "Copy of" prefix

---

## Epic 3: Property Condition Assessment

> As an investor, I need to systematically evaluate property condition to generate accurate renovation scopes.

### User Stories

#### 🔴 3.1 Select Rooms to Assess
**As an** investor
**I want to** select which rooms to assess
**So that** I can evaluate the entire property

**Acceptance Criteria**:
- Standard room list provided (kitchen, bathrooms, bedrooms, etc.)
- Add custom room option
- Remove rooms not applicable
- Rename rooms (e.g., "Primary Bedroom")
- Reorder rooms

---

#### 🔴 3.2 Assess Room Condition
**As an** investor
**I want to** rate overall room condition
**So that** I have a baseline for each area

**Acceptance Criteria**:
- 5-point scale (excellent, good, fair, poor, terrible)
- Visual indicators for each rating
- Optional notes field
- Save condition per room

---

#### 🔴 3.3 Assess Room Components
**As an** investor
**I want to** evaluate individual components within each room
**So that** I can identify specific items needing work

**Acceptance Criteria**:
- Standard components per room type (flooring, walls, ceiling, etc.)
- Condition rating per component
- "Needs work" toggle
- Action selection (repair, replace, upgrade)
- Add custom components

---

#### 🟡 3.4 Upload Room Photos
**As an** investor
**I want to** upload photos for each room
**So that** I have visual documentation

**Acceptance Criteria**:
- Upload multiple photos per room
- Support JPEG, PNG formats
- Preview thumbnails
- Delete uploaded photos
- Photo gallery view

---

#### 🟡 3.5 Add Assessment Notes
**As an** investor
**I want to** add detailed notes to my assessment
**So that** I can capture important observations

**Acceptance Criteria**:
- Free-text notes per room
- Notes per component
- Auto-save notes
- Search notes across project

---

#### 🟢 3.6 Assessment Templates
**As an** investor
**I want to** save assessment templates
**So that** I can quickly assess similar properties

**Acceptance Criteria**:
- Save current assessment as template
- Name and describe template
- Apply template to new project
- Edit template components
- Delete templates

---

## Epic 4: Strategy & Goals Configuration

> As an investor, I need to define my investment strategy so the system can optimize recommendations accordingly.

### User Stories

#### 🔴 4.1 Select Investment Strategy
**As an** investor
**I want to** select my investment strategy
**So that** the system can tailor recommendations

**Acceptance Criteria**:
- Strategy options: Flip, Rental, Wholetail, Airbnb
- Clear description of each strategy
- Strategy influences all subsequent recommendations
- Can change strategy and recalculate

---

#### 🔴 4.2 Define Target Buyer/Market
**As an** investor
**I want to** specify my target market
**So that** renovation quality matches buyer expectations

**Acceptance Criteria**:
- Target options: First-time buyer, Move-up buyer, Investor, Luxury
- Description of each target profile
- Quality tier recommendations based on target
- Influences cost calculations

---

#### 🔴 4.3 Set Financial Targets
**As an** investor
**I want to** define my ROI and timeline targets
**So that** the system can optimize to meet my goals

**Acceptance Criteria**:
- Set target ROI percentage (e.g., 20%)
- Set hold period in months
- Set contingency percentage
- Validation against industry ranges
- Warning if targets unrealistic

---

#### 🟡 4.4 Strategy Comparison View
**As an** investor
**I want to** compare outcomes across strategies
**So that** I can choose the best approach

**Acceptance Criteria**:
- Side-by-side comparison of strategies
- Show ROI for each strategy
- Show timeline for each
- Show required budget for each
- Highlight recommended strategy

---

## Epic 5: Scope Building & Cost Estimation

> As an investor, I need to build a detailed renovation scope with accurate cost estimates.

### User Stories

#### 🔴 5.1 Browse Cost Database
**As an** investor
**I want to** browse available renovation items
**So that** I can build my scope from standard options

**Acceptance Criteria**:
- Browse by category (Exterior, Interior, Systems, Structural)
- Browse by subcategory
- Search items by name
- View item details (description, unit, base cost)
- Filter by quality tier

---

#### 🔴 5.2 Add Items to Scope
**As an** investor
**I want to** add items to my renovation scope
**So that** I can build a complete project plan

**Acceptance Criteria**:
- Click to add item to scope
- Specify quantity
- Select quality tier
- Auto-calculate cost based on selections
- Item appears in scope list

---

#### 🔴 5.3 Edit Scope Items
**As an** investor
**I want to** modify scope items
**So that** I can refine my estimates

**Acceptance Criteria**:
- Edit quantity
- Change quality tier
- Modify location/room
- Update notes
- See cost update in real-time

---

#### 🔴 5.4 Remove Scope Items
**As an** investor
**I want to** remove items from scope
**So that** I can adjust my project plan

**Acceptance Criteria**:
- Delete individual items
- Confirm deletion
- Undo option (within 5 seconds)
- Totals recalculate immediately

---

#### 🔴 5.5 Set Item Priority
**As an** investor
**I want to** prioritize each scope item
**So that** I can identify critical vs. optional work

**Acceptance Criteria**:
- Priority options: Must, Should, Could, Nice
- Visual indicator for priority level
- Filter scope by priority
- Priority affects priority matrix

---

#### 🔴 5.6 View Scope Summary
**As an** investor
**I want to** see a summary of my scope
**So that** I understand total costs and composition

**Acceptance Criteria**:
- Total estimated cost
- Material cost subtotal
- Labor cost subtotal
- Cost by category breakdown
- Item count by priority
- Budget utilization percentage

---

#### 🟡 5.7 Add Custom Items
**As an** investor
**I want to** add custom items not in the database
**So that** I can include unique renovation needs

**Acceptance Criteria**:
- Enter custom item name
- Enter description
- Specify quantity and unit
- Enter material cost
- Enter labor cost
- Assign category
- Assign priority

---

#### 🟡 5.8 Auto-Generate Scope from Assessment
**As an** investor
**I want to** auto-generate a scope from my assessment
**So that** I don't have to manually add each item

**Acceptance Criteria**:
- Button to generate scope
- Creates items based on assessment actions
- Items linked to assessed rooms
- Review before adding to scope
- Merge with existing scope option

---

#### 🟡 5.9 Set Item Dependencies
**As an** investor
**I want to** define dependencies between items
**So that** work can be properly sequenced

**Acceptance Criteria**:
- Select dependent items
- Visual dependency indicator
- Prevent circular dependencies
- Dependencies affect action plan

---

#### 🟢 5.10 Import Contractor Quote
**As an** investor
**I want to** import a contractor's quote
**So that** I can compare against my estimates

**Acceptance Criteria**:
- Upload CSV/Excel file
- Map columns to scope fields
- Preview imported items
- Add to scope or replace
- Show variance from estimates

---

## Epic 6: Priority Analysis

> As an investor, I need to analyze and prioritize renovation items based on ROI and urgency.

### User Stories

#### 🔴 6.1 View Priority Matrix
**As an** investor
**I want to** see items plotted on ROI vs. Urgency matrix
**So that** I can visualize priorities

**Acceptance Criteria**:
- 2D scatter plot visualization
- X-axis: ROI Impact (0-100)
- Y-axis: Urgency (0-100)
- Items plotted as data points
- Quadrant labels (Must Do, Should Do, Could Do, Nice to Have)
- Click item to see details

---

#### 🔴 6.2 Interactive Priority Adjustment
**As an** investor
**I want to** adjust item priorities on the matrix
**So that** I can fine-tune my priorities

**Acceptance Criteria**:
- Drag items to new positions
- Priority updates based on position
- Include/exclude items directly
- Changes reflected in scope

---

#### 🔴 6.3 Priority Score Explanation
**As an** investor
**I want to** understand how priority scores are calculated
**So that** I can trust the recommendations

**Acceptance Criteria**:
- Click item to see score breakdown
- Show component scores (urgency, ROI, risk, etc.)
- Show reasoning for each component
- Link to documentation

---

#### 🟡 6.4 Filter Matrix by Category
**As an** investor
**I want to** filter the matrix by category
**So that** I can focus on specific areas

**Acceptance Criteria**:
- Filter by item category
- Filter by priority level
- Filter by phase
- Multiple filters combinable
- Clear all filters option

---

#### 🟡 6.5 Matrix Optimization Suggestions
**As an** investor
**I want to** see optimization suggestions
**So that** I can improve my prioritization

**Acceptance Criteria**:
- Highlight misaligned items
- Suggest priority changes
- Show cost/benefit of changes
- One-click apply suggestions

---

## Epic 7: Action Plan & Timeline

> As an investor, I need an interactive action plan to visualize and manage the renovation timeline.

### User Stories

#### 🔴 7.1 Generate Action Plan
**As an** investor
**I want to** generate an action plan from my scope
**So that** I can see the project timeline

**Acceptance Criteria**:
- Button to generate action plan
- Groups items into phases
- Respects dependencies
- Estimates phase durations
- Shows total project timeline

---

#### 🔴 7.2 View Timeline Visualization
**As an** investor
**I want to** see my action plan as an interactive timeline
**So that** I can understand the project schedule

**Acceptance Criteria**:
- React Flow visualization
- Task nodes with details
- Phase grouping
- Dependency connections
- Zoom and pan controls
- Minimap navigation

---

#### 🔴 7.3 View Critical Path
**As an** investor
**I want to** see the critical path highlighted
**So that** I know which tasks can't slip

**Acceptance Criteria**:
- Critical path items highlighted
- Visual distinction (color/style)
- Critical path summary stats
- Filter to show only critical path

---

#### 🟡 7.4 Drag-and-Drop Scheduling
**As an** investor
**I want to** drag tasks to reschedule them
**So that** I can adjust the timeline interactively

**Acceptance Criteria**:
- Drag task nodes to new positions
- Timeline updates automatically
- Dependency validation
- Warning if conflicts created
- Undo/redo support

---

#### 🟡 7.5 Assign Contractors to Tasks
**As an** investor
**I want to** assign contractors to tasks
**So that** I can plan resource allocation

**Acceptance Criteria**:
- Select contractor from vendor list
- See contractor capacity
- Visual contractor lanes
- Detect scheduling conflicts
- Multiple contractors per task

---

#### 🟡 7.6 View Conflict Detection
**As an** investor
**I want to** see scheduling conflicts
**So that** I can fix problems before they occur

**Acceptance Criteria**:
- Highlight conflicting tasks
- Explain conflict reason
- Suggest resolution
- Auto-resolve option
- Conflict count badge

---

#### 🟢 7.7 Export Timeline Image
**As an** investor
**I want to** export the timeline as an image
**So that** I can share it with contractors

**Acceptance Criteria**:
- Export as PNG/PDF
- High resolution output
- Include legend
- Customizable date range
- Branding/watermark option

---

#### 🟢 7.8 Milestone Tracking
**As an** investor
**I want to** add milestones to my timeline
**So that** I can track key dates

**Acceptance Criteria**:
- Add custom milestones
- Predefined milestones (start, permit, inspection, close)
- Milestone nodes in timeline
- Milestone notifications

---

## Epic 8: AI Recommendations

> As an investor, I want AI-powered suggestions to optimize my renovation scope.

### User Stories

#### 🔴 8.1 View AI Recommendations
**As an** investor
**I want to** see AI-generated recommendations
**So that** I can improve my renovation plan

**Acceptance Criteria**:
- Recommendations panel visible
- Grouped by type (add, remove, upgrade, etc.)
- Sorted by confidence score
- Show cost/ROI impact for each
- Clear explanation of reasoning

---

#### 🔴 8.2 Accept/Reject Recommendations
**As an** investor
**I want to** accept or reject recommendations
**So that** I control what changes are made

**Acceptance Criteria**:
- Accept button applies recommendation
- Reject button dismisses it
- Rejected items don't reappear
- Undo accept option
- Track acceptance history

---

#### 🟡 8.3 Refresh Recommendations
**As an** investor
**I want to** refresh recommendations
**So that** I get updated suggestions after scope changes

**Acceptance Criteria**:
- Refresh button available
- Loading indicator during refresh
- New recommendations replace old
- Timestamp of last refresh
- Notification if significant changes

---

#### 🟡 8.4 Cost Saving Opportunities
**As an** investor
**I want to** see specific cost-saving opportunities
**So that** I can stay within budget

**Acceptance Criteria**:
- Dedicated cost-saving section
- Show potential savings amount
- Explain trade-offs
- Show budget impact if accepted
- Filter by savings amount

---

#### 🟢 8.5 Missing Item Suggestions
**As an** investor
**I want to** see suggestions for missing items
**So that** I don't overlook important work

**Acceptance Criteria**:
- Analyze scope for gaps
- Compare against assessment
- Check for common omissions
- Show why item is recommended
- One-click add to scope

---

## Epic 9: Final Review & Export

> As an investor, I need a comprehensive summary and export capabilities to finalize my project plan.

### User Stories

#### 🔴 9.1 View Final Summary Dashboard
**As an** investor
**I want to** see a comprehensive project summary
**So that** I can review before finalizing

**Acceptance Criteria**:
- Total cost with breakdown
- ROI projections
- Timeline summary
- Key metrics dashboard
- Budget utilization
- Scope item count

---

#### 🔴 9.2 View Cost Breakdown Charts
**As an** investor
**I want to** see visual cost breakdowns
**So that** I can understand cost distribution

**Acceptance Criteria**:
- Pie chart by category
- Bar chart by phase
- Material vs. labor split
- Interactive hover details
- Responsive sizing

---

#### 🔴 9.3 View ROI Analysis
**As an** investor
**I want to** see ROI analysis visualizations
**So that** I understand return potential

**Acceptance Criteria**:
- ROI percentage display
- Scenario comparison (conservative/realistic/optimistic)
- Break-even timeline
- Cash flow projection chart
- Risk indicators

---

#### 🟡 9.4 Export PDF Report
**As an** investor
**I want to** export a PDF report
**So that** I can share with lenders/partners

**Acceptance Criteria**:
- Professional formatted report
- Include all summary data
- Include key charts
- Scope item detail table
- Timeline overview
- Branding customization

---

#### 🟡 9.5 Export Excel Spreadsheet
**As an** investor
**I want to** export to Excel
**So that** I can do additional analysis

**Acceptance Criteria**:
- Scope items as rows
- All data columns included
- Formatted for readability
- Formulas for totals
- Multiple sheets (scope, summary, timeline)

---

#### 🟢 9.6 Cash Flow Schedule
**As an** investor
**I want to** see a cash flow schedule
**So that** I can plan funding

**Acceptance Criteria**:
- Payment timeline by phase
- Cumulative spend chart
- Weekly/monthly views
- Draw schedule format
- Export capability

---

## Epic 10: Vendor Management

> As an investor, I need to manage my contractors and suppliers to efficiently coordinate work.

### User Stories

#### 🔴 10.1 Add New Vendor
**As an** investor
**I want to** add contractors/suppliers to my vendor list
**So that** I can track and manage them

**Acceptance Criteria**:
- Enter vendor name and company
- Enter contact information
- Select vendor type
- Add specialties/trade categories
- Save to vendor database

---

#### 🔴 10.2 View Vendor List
**As an** investor
**I want to** view my list of vendors
**So that** I can find and manage contacts

**Acceptance Criteria**:
- Table view with key columns
- Sort by any column
- Search by name/company
- Filter by specialty/type
- Pagination for large lists

---

#### 🔴 10.3 Edit Vendor Details
**As an** investor
**I want to** update vendor information
**So that** I keep records current

**Acceptance Criteria**:
- Edit all vendor fields
- Save changes
- Cancel to revert
- Audit trail of changes

---

#### 🔴 10.4 Delete Vendor
**As an** investor
**I want to** remove vendors from my list
**So that** I can clean up old contacts

**Acceptance Criteria**:
- Delete button available
- Confirmation required
- Warning if vendor assigned to projects
- Soft delete (archived)

---

#### 🟡 10.5 Track Vendor Performance
**As an** investor
**I want to** track vendor performance metrics
**So that** I can make informed hiring decisions

**Acceptance Criteria**:
- Rating (1-5 stars)
- Completed projects count
- Total spend tracking
- Notes field
- Performance history view

---

#### 🟡 10.6 Mark Preferred Vendors
**As an** investor
**I want to** mark vendors as preferred
**So that** they appear first in selections

**Acceptance Criteria**:
- Toggle preferred status
- Preferred badge displayed
- Preferred vendors listed first
- Filter to show only preferred

---

#### 🟢 10.7 Track Licenses & Insurance
**As an** investor
**I want to** track vendor compliance documents
**So that** I ensure they're properly licensed

**Acceptance Criteria**:
- Enter license number
- Enter expiration date
- Enter insurance policy
- Expiration warnings
- Upload document copies

---

#### 🟢 10.8 Vendor Document Storage
**As an** investor
**I want to** store vendor documents
**So that** I have W-9s, contracts, etc. on file

**Acceptance Criteria**:
- Upload files (PDF, images)
- Document type labels
- View/download documents
- Delete documents

---

## Epic 11: Dashboard & Project Management

> As an investor, I need a dashboard to manage multiple projects and track overall portfolio.

### User Stories

#### 🔴 11.1 View Project Dashboard
**As an** investor
**I want to** see a dashboard of all my projects
**So that** I can manage my portfolio

**Acceptance Criteria**:
- Grid/list view of projects
- Key metrics per project (cost, status, progress)
- Recent activity
- Quick actions (edit, view, delete)

---

#### 🔴 11.2 Project Status Management
**As an** investor
**I want to** change project status
**So that** I can track project lifecycle

**Acceptance Criteria**:
- Status options: Draft, Active, Completed, Archived
- Status change from dashboard
- Filter by status
- Status change history

---

#### 🔴 11.3 Search & Filter Projects
**As an** investor
**I want to** search and filter projects
**So that** I can find specific projects quickly

**Acceptance Criteria**:
- Search by project name/address
- Filter by status
- Filter by date range
- Sort by any column
- Save filter preferences

---

#### 🟡 11.4 Dashboard Statistics
**As an** investor
**I want to** see aggregate statistics
**So that** I can understand portfolio performance

**Acceptance Criteria**:
- Total projects count by status
- Total estimated spend
- Average ROI projection
- Projects by strategy breakdown

---

#### 🟡 11.5 Recent Activity Feed
**As an** investor
**I want to** see recent activity
**So that** I can quickly resume work

**Acceptance Criteria**:
- List of recent actions
- Timestamp for each
- Link to relevant project/section
- Filter by action type

---

## Epic 12: Settings & Configuration

> As a user, I need to configure application settings to customize my experience.

### User Stories

#### 🟡 12.1 Default Quality Tier Setting
**As an** investor
**I want to** set a default quality tier
**So that** new items use my preferred level

**Acceptance Criteria**:
- Select default tier (budget/standard/premium/luxury)
- Applied to new scope items
- Can override per item
- Saved in user preferences

---

#### 🟡 12.2 Default Location Setting
**As an** investor
**I want to** set a default location
**So that** regional pricing is auto-applied

**Acceptance Criteria**:
- Set default zip code
- Set default state
- Auto-fills for new projects
- Affects cost calculations

---

#### 🟢 12.3 Notification Preferences
**As a** user
**I want to** configure notifications
**So that** I control what alerts I receive

**Acceptance Criteria**:
- Email notification toggles
- Frequency settings
- Project-specific overrides

---

#### 🟢 12.4 Data Export/Backup
**As a** user
**I want to** export all my data
**So that** I have a backup of my work

**Acceptance Criteria**:
- Export all projects
- Export all vendors
- JSON/CSV format options
- Download as zip file

---

---

## Story Point Estimates

| Epic | Story Count | Estimated Points |
|------|-------------|------------------|
| 1. Authentication | 5 | 13 |
| 2. Property Details | 5 | 13 |
| 3. Condition Assessment | 6 | 21 |
| 4. Strategy & Goals | 4 | 8 |
| 5. Scope Building | 10 | 34 |
| 6. Priority Analysis | 5 | 21 |
| 7. Action Plan | 8 | 34 |
| 8. AI Recommendations | 5 | 21 |
| 9. Final Review | 6 | 21 |
| 10. Vendor Management | 8 | 21 |
| 11. Dashboard | 5 | 13 |
| 12. Settings | 4 | 8 |
| **Total** | **71** | **228** |

---

## MVP Scope (Phase 1)

For initial launch, include all 🔴 Must Have stories:

| Epic | Must Have Stories |
|------|-------------------|
| 1 | 1.1, 1.2, 1.3 |
| 2 | 2.1, 2.2, 2.3 |
| 3 | 3.1, 3.2, 3.3 |
| 4 | 4.1, 4.2, 4.3 |
| 5 | 5.1, 5.2, 5.3, 5.4, 5.5, 5.6 |
| 6 | 6.1, 6.2, 6.3 |
| 7 | 7.1, 7.2, 7.3 |
| 8 | 8.1, 8.2 |
| 9 | 9.1, 9.2, 9.3 |
| 10 | 10.1, 10.2, 10.3, 10.4 |
| 11 | 11.1, 11.2, 11.3 |

**MVP Story Count**: 38 stories
**MVP Estimated Points**: ~130 points

---

## Release Phases

### Phase 1: MVP (v1.0)
- All Must Have (🔴) stories
- Basic authentication
- Core 7-step workflow
- Essential vendor management

### Phase 2: Enhanced Experience (v1.1)
- All Should Have (🟡) stories
- Social login
- Photo uploads
- Advanced visualizations
- PDF/Excel export

### Phase 3: Advanced Features (v1.2)
- All Could Have (🟢) stories
- Assessment templates
- Document storage
- Milestone tracking
- Data backup/export
