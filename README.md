# Morfex CRM Platform

A modern, high-performance, and modular CRM web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## 📁 Architecture & Folder Structure

```text
build-crm-platform/
├── app/                        # Next.js App Router (Pages, Layouts & Routing)
│   ├── globals.css             # Design system styling & custom utility classes
│   ├── layout.tsx              # Root HTML layout with metadata & analytics
│   ├── page.tsx                # Main CRM application dashboard & section router
│   └── login/                  # Authentication views
│       └── page.tsx            # Login & onboarding screen
│
├── components/                 # Reusable React components organized by domain
│   ├── ui/                     # Atomic UI primitives (buttons, inputs, dialogs)
│   │   └── button.tsx
│   ├── layout/                 # Application shell layouts
│   │   ├── sidebar.tsx         # Collapsible sidebar with navigation & user status
│   │   └── topbar.tsx          # Top bar with search (⌘K), notifications & breadcrumbs
│   ├── dashboard/              # Overview & KPI widgets
│   │   ├── dashboard-view.tsx  # Overview screen assembly
│   │   ├── metric-card.tsx     # Stat summary card with delta indicator
│   │   ├── pipeline-overview.tsx # Interactive pipeline SVG chart
│   │   └── recent-activity.tsx # Live activity feed
│   ├── records/                # CRM record directories (Leads, Contacts, Deals, Tasks)
│   │   ├── records-page.tsx    # Filterable data table with month/year filters & export
│   │   ├── create-record-modal.tsx # Record creation dialog
│   │   ├── record-detail-modal.tsx # Slideover detail view with timeline
│   │   └── contact-actions.tsx # Quick communication (Email & WhatsApp)
│   └── invoices/               # Billing and invoicing modules
│       ├── invoice-page.tsx    # Invoices view with PDF & Excel triggers
│       ├── invoice-templates.tsx # Template selector cards
│       └── invoice-preview.tsx # Printable A4-styled invoice document
│
├── config/                     # Static configuration & brand constants
│   ├── site.ts                 # Brand identity, addresses, and default profile
│   └── navigation.ts           # Navigation menu definitions & icon mappings
│
├── data/                       # Seed data and mock stores
│   ├── seed-records.ts         # Initial leads, contacts, deals, and companies
│   ├── seed-activities.ts      # Activity feed stream
│   └── invoice-templates.ts    # Invoice templates and sample invoice state
│
├── hooks/                      # Custom React hooks
│   ├── use-crm-records.ts      # LocalStorage-persisted CRM records state
│   └── use-debounce.ts         # Search debounce utility
│
├── lib/                        # Core utilities and business helpers
│   ├── utils.ts                # Tailwind class merger (cn)
│   ├── export.ts               # Spreadsheet XML / Excel / CSV generator
│   └── formatters.ts           # Initials, WhatsApp href, and currency formatters
│
├── types/                      # TypeScript domain definitions
│   ├── crm.ts                  # RecordItem, RecordStatus, ActivityItem, CRMSection
│   ├── invoice.ts              # InvoiceData, InvoiceLineItem, InvoiceTemplate
│   ├── navigation.ts           # NavItemConfig
│   └── index.ts                # Type barrel export
│
├── public/                     # Static public assets (icons, images)
├── components.json             # Shadcn UI configuration
├── next.config.mjs             # Next.js bundler and Turbopack configuration
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript path aliases (@/* -> ./*)
```

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Type Check
```bash
npx tsc --noEmit
npm run build
```

## 📬 Email Communication & Data Export

This CRM includes built-in tools for:
- **Email Dispatch**: Send personalized follow-ups, proposals, and quotation links directly from contact cards or the CRM Mails view.
- **Direct Mail Client Integration**: 1-click launcher for webmail / Gmail with prefilled drafts.
- **Data Export**: Export leads and pipelines to CSV or sync with custom spreadsheet configurations in Settings.

