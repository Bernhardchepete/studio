# **App Name**: WealthWise

## Core Features:

- Asset & Liability Tracking: Log and track assets, bank balances, loans, and debts, stored in Firestore with real-time updates.
- Transaction Management: Manually input and categorize income and expenses; real-time updates via Firestore listeners; Cloud Functions trigger alerts for anomalies or overspending.
- Budgeting & Savings Goals: Set monthly budgets and savings targets, visualize progress, and run what-if simulations; integrate alerts when savings milestones are reached.
- Predictive Insights Tool: Uses Firestore to determine potential savings from spending adjustments; also watches for recurring unnecessary expenses; alerts users with investment or revenue growth opportunities; mockups display these insights dynamically.
- Notifications & Alerts: Real-time push notifications for budget overshoot, invoice due, and savings milestones achieved via Firebase Cloud Messaging.
- User Authentication: Secure user accounts with Firebase Authentication, ensuring each user sees only their own data.

## Style Guidelines:

- Primary color: Deep teal (#008080) for a sense of trustworthiness and financial calm.
- Background color: Soft, desaturated teal (#E0F8F8) to complement the primary color without overwhelming the user.
- Accent color: Muted gold (#B8860B) to highlight key metrics and calls to action, signifying value and opportunity.
- Body and headline font: 'Inter', a sans-serif, provides a clean, modern, and readable interface, ensuring data is easily digestible.
- Use clean, minimalist icons to represent assets, liabilities, and transaction categories.
- Dashboard layout should be modular and customizable, allowing users to prioritize key metrics.
- Subtle transitions and animations on data updates provide a sense of real-time engagement without being distracting.