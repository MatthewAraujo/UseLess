# App Manager - Desktop Application

A beautiful, minimalist desktop application for managing PC applications, built with Tauri, React, and shadcn/ui.

## Features

- 🎨 **Clean macOS-inspired Design** - Minimalist interface with professional styling
- 📊 **Usage Tracking** - Monitor application usage with visual progress bars
- ⏰ **Time Limits** - Set daily time limits for applications
- 🛡️ **Application Blocking** - Block applications when needed
- 🔍 **Search & Filter** - Find applications quickly
- 📱 **Responsive Layout** - Works on different screen sizes
- 🎯 **Desktop Optimized** - Built specifically for desktop use

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/            # Layout components
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   └── Header.tsx     # Top header with search
│   ├── pages/             # Page components
│   │   ├── OverviewPage.tsx
│   │   ├── AppsPage.tsx
│   │   └── ComingSoonPage.tsx
│   ├── apps/              # Application-specific components
│   │   ├── AppCard.tsx    # Individual app card
│   │   ├── AddAppDialog.tsx
│   │   └── EmptyState.tsx
│   ├── overview/          # Overview page components
│   │   ├── StatsCards.tsx
│   │   └── UsageOverview.tsx
│   └── index.ts           # Component exports
├── hooks/
│   └── useApps.ts         # Custom hook for app management
├── types/
│   └── app.ts             # TypeScript interfaces
├── data/
│   └── mockData.ts        # Mock data and constants
├── lib/
│   └── utils.ts           # Utility functions
└── App.tsx                # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Rust (for Tauri)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## Architecture

### Modular Design

The application follows a modular architecture with clear separation of concerns:

- **Components**: Reusable UI components organized by feature
- **Hooks**: Custom React hooks for state management
- **Types**: TypeScript interfaces and type definitions
- **Data**: Mock data and constants
- **Pages**: Main page components that compose smaller components

### Key Components

- **Sidebar**: Navigation with app sections
- **Header**: Search and actions
- **AppCard**: Individual application management
- **StatsCards**: Overview statistics
- **AddAppDialog**: Modal for adding new applications

### State Management

Uses a custom `useApps` hook that provides:
- Application CRUD operations
- Statistics calculation
- Search and filtering
- State persistence

## Technologies Used

- **Frontend**: React 18, TypeScript
- **UI Framework**: shadcn/ui with Tailwind CSS
- **Desktop**: Tauri 2.0
- **Icons**: Lucide React
- **Build Tool**: Vite

## Development

### Adding New Features

1. Create new components in the appropriate directory
2. Add types to `src/types/app.ts`
3. Update the main App component if needed
4. Export from `src/components/index.ts`

### Styling

The app uses Tailwind CSS with shadcn/ui components. All styling follows the design system defined in `src/App.css`.

## License

MIT License
