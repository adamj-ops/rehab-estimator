# Rehab Estimator

Professional renovation planning and cost estimation tool for real estate investors. Build data-driven renovation scopes that maximize ROI with comprehensive workflow management, AI-powered recommendations, and interactive timeline visualization.

## Features

### Core Workflow (7-Step Process)
1. **Property Details** - Comprehensive property information capture
2. **Condition Assessment** - Room-by-room condition evaluation
3. **Strategy & Goals** - Investment strategy selection (flip, rental, wholetail, Airbnb)
4. **Scope Building** - Smart scope generation with cost calculation engine
5. **Priority Matrix** - ROI vs Urgency analysis
6. **Action Plan** - Interactive timeline with React Flow visualization
7. **Final Review** - Comprehensive summary and export

### React Flow Integration
- **Interactive Timelines** - Drag-and-drop task scheduling
- **Dependency Mapping** - Visual PERT/CPM charts
- **Critical Path Analysis** - Automatic calculation with visual highlighting
- **Conflict Detection** - Resource scheduling conflict alerts
- **Auto-Layout** - Automatic node positioning algorithms

See [React Flow Integration Guide](./src/lib/react-flow/README.md) for detailed documentation.

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui with Tailwind CSS (Mono theme)
- **Visualization**: React Flow (@xyflow/react), Recharts
- **State**: Zustand with persist middleware
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Calculations**: Custom TypeScript engines + Python microservice (planned)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rehab-estimator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
