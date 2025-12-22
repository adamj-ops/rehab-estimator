# Rehab Estimator - Documentation Index

This directory contains comprehensive documentation for rebuilding the Rehab Estimator application from scratch.

## Document Overview

| Document | Description | Audience |
|----------|-------------|----------|
| [PRD.md](./PRD.md) | Product Requirements Document | Product, Engineering, Stakeholders |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System Architecture | Engineering, DevOps |
| [EPICS_AND_USER_STORIES.md](./EPICS_AND_USER_STORIES.md) | Epics & User Stories | Product, Engineering, QA |
| [FEATURES_AND_USE_CASES.md](./FEATURES_AND_USE_CASES.md) | Features & Use Cases | Product, UX, Engineering |

---

## Quick Reference

### What is Rehab Estimator?

A professional renovation planning and cost estimation SaaS platform for real estate investors. It enables users to build data-driven renovation scopes that maximize ROI through:

- **7-Step Guided Workflow**: Property → Assessment → Strategy → Scope → Priority → Action Plan → Review
- **Accurate Cost Estimation**: Regional cost databases with quality tiers
- **ROI-First Decision Making**: Strategy-specific calculations (Flip, Rental, Wholetail, Airbnb)
- **Interactive Project Planning**: React Flow timelines with critical path analysis
- **AI-Powered Recommendations**: Smart suggestions for scope optimization
- **Vendor Management**: Contractor tracking with performance history

---

### Technology Stack Summary

| Layer | Technologies |
|-------|--------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| UI Components | shadcn/ui, Radix UI, Lucide Icons |
| Visualization | React Flow, Recharts, Framer Motion |
| State Management | Zustand (with persist middleware) |
| Database | PostgreSQL (via Supabase) |
| Authentication | Supabase Auth |
| Forms/Validation | React Hook Form, Zod |

---

### Core Domain Entities

```
RehabProject
├── PropertyAssessment[] (1:N)
├── ScopeItem[] (1:N)
├── MarketComparable[] (1:N)
└── Recommendation[] (1:N)

Vendor (independent, user-level)
```

---

### MVP Scope Summary

**71 total user stories** organized into **12 epics**:

| Epic | Stories | MVP Stories |
|------|---------|-------------|
| Authentication | 5 | 3 |
| Property Details | 5 | 3 |
| Condition Assessment | 6 | 3 |
| Strategy & Goals | 4 | 3 |
| Scope Building | 10 | 6 |
| Priority Analysis | 5 | 3 |
| Action Plan | 8 | 3 |
| AI Recommendations | 5 | 2 |
| Final Review | 6 | 3 |
| Vendor Management | 8 | 4 |
| Dashboard | 5 | 3 |
| Settings | 4 | 0 |

**MVP: 38 stories (~130 story points)**

---

### Key Features

1. **Cost Calculation Engine**: Base costs × Quality tier × Regional multipliers × Difficulty
2. **ROI Calculator**: Flip profit, rental cap rate, cash-on-cash, scenario analysis
3. **Priority Scoring**: 6-component weighted scoring by strategy
4. **React Flow Timeline**: Task nodes, dependencies, critical path, conflict detection
5. **AI Recommendations**: Cost savings, missing items, upgrades, timing optimization

---

### Implementation Phases

| Phase | Focus | Stories |
|-------|-------|---------|
| 1: MVP | Core workflow, basic calculations | 38 |
| 2: Enhanced | AI, exports, social auth | 22 |
| 3: Advanced | Templates, documents, milestones | 11 |

---

## How to Use This Documentation

### For Product Managers
1. Start with **PRD.md** for product vision and requirements
2. Review **EPICS_AND_USER_STORIES.md** for backlog planning
3. Use **FEATURES_AND_USE_CASES.md** for detailed acceptance criteria

### For Engineers
1. Start with **ARCHITECTURE.md** for technical overview
2. Review database schema and API endpoints
3. Use **FEATURES_AND_USE_CASES.md** for implementation details

### For QA/Testing
1. Review **EPICS_AND_USER_STORIES.md** for acceptance criteria
2. Use **FEATURES_AND_USE_CASES.md** for detailed use cases
3. Reference **PRD.md** for success metrics

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2025-12-22 | Initial extraction from existing codebase |
