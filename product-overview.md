# Thuo: Personal Financial Operating System

Thuo is a proactive, AI-driven personal financial operating system designed to move users from reactive tracking to proactive wealth management. It focuses on real-time insights, automated budget adjustments, and conversational financial simulations.

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Engine**: Genkit (Google Gemini 2.5 Flash)
- **Data Management**: React Context (Demo Mode) with LocalStorage persistence.

## 🧠 Core AI Features (Genkit Flows)

### 1. AI Co-pilot (Proactive Insights)
- **Flow**: `personalized-budget-suggestions`
- **Logic**: Analyzes real-time spending vs. income. Surfaces rotating, human-sounding "notification-style" insights.
- **Topics**: Warnings (overspending), Positive Reinforcement (on track), What-if nudges (surplus allocation).
- **UX**: Auto-playing carousel on the dashboard; links directly to the Digital Twin for deep-dive chats.

### 2. Goal Planner (Autonomous Actions)
- **Flow**: `generate-goal-plan`
- **Logic**: Calculates goal probability based on income/expenses. 
- **Actionability**: Generates specific `ADJUST_BUDGET` commands. The UI provides "Do it for me" buttons that programmatically update user budget allocations.

### 3. Digital Twin (Scenario Simulator)
- **Flow**: `financial-scenario-simulator`
- **Logic**: A conversational agent that predicts financial outcomes over a 12-month horizon based on user-proposed scenarios (e.g., "What if I get a 10% raise?").

### 4. AI Underwriting (Lending)
- **Flow**: `generate-loan-eligibility`
- **Logic**: Assesses DTI (Debt-to-Income) ratios and credit history to provide instant eligibility status, max loan amounts, and interest rate suggestions.

## 📱 Application Structure

### Dashboard
- **Financial Health Score**: A composite metric (0-100) based on budget adherence, savings rate, and goal progress.
- **Financial Pulse**: A "Safe to Spend" indicator.
- **Upcoming Payments**: High-priority bill tracking.

### Transactions
- Categorized ledger with specialized metadata for certain types (e.g., itemized food lists, transport routes).
- Support for "Pay & Transfer" simulations.

### Budgets
- Multi-priority levels (High/Medium/Low).
- Payment methods: Automatic, Manual, Confirmation.

### Goals
- Visual progress tracking with deadline-based urgency.
- Integrated AI Success Probability.

### Receipts & Spend Intelligence
- OCR-ready interface for scanning receipts.
- Automatic itemization and merchant intelligence.

## 👥 Persona-Based Demo System
The app uses a `DemoUserProvider` to toggle between diverse financial archetypes:
1. **Thabo (The Student)**: Focused on micro-savings and a small side hustle.
2. **Naledi (The Salaried Employee)**: Focused on automation and car savings.
3. **Kabelo (The SME Owner)**: Variable income and business cash flow management.
4. **Amogelang (The Gig Worker)**: Irregular income smoothing.
5. **The Motswais (The Family)**: Shared wallet for collective goals.

## 🎨 Design Principles
- **Color Palette**: Royal Blue primary, Ice White backgrounds, Deep Navy text.
- **Tone**: Direct, supportive, opinionated, and professional.
- **Proactivity**: Surfaces data *before* the user asks for it.
