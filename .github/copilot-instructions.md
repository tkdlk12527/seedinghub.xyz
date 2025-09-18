## About This Project

This is a Next.js web application for managing and displaying "deals" from seedinghub.vn. It uses the App Router for routing and server components. The backend is powered by Supabase.

## Key Technologies & Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui. Components are located in `components/ui` and should be the primary choice for new UI.
- **Backend & Database**: Supabase. The client is initialized in `lib/supabase.ts` and should be used for all database interactions.
- **Package Manager**: pnpm.

## Developer Workflow & Commands

**IMPORTANT**: These are standard commands. Please verify them against `package.json`.

- **Install dependencies**: `pnpm install`
- **Run development server**: `pnpm dev`
- **Create a production build**: `pnpm build`
- **Run linter**: `pnpm lint`

## Architecture & Conventions

- **Directory Structure**: The application follows the standard Next.js App Router structure.
  - Pages are defined in the `app` directory. The main page is `app/page.tsx`.
  - Dynamic pages for individual deals are handled by `app/[shortId]/page.tsx`.
  - API endpoints are located in `app/api/`.
- **UI Components**: All UI is built using components from `shadcn/ui`. When adding new UI, prefer composing existing components from `components/ui` or adding new ones using the `shadcn/ui` CLI.
- **Data Flow**: All interactions with the Supabase database should go through the client defined in `lib/supabase.ts`. Avoid initializing new clients directly in components.
- **Styling**: Use Tailwind CSS utility classes directly in your TSX files. Use the `cn` utility from `lib/utils.ts` for conditional classes.