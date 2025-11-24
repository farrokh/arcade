# UAP - Universal Autonomous Protocol

A Next.js application for the Universal Autonomous Protocol, featuring a recursive referral system where users earn mileage credits for expanding the network.

## Features

-   **Viral Referral System**:
    -   **Sign Up Bonus**: 100 miles.
    -   **Direct Referral**: 50 miles.
    -   **Recursive Referral**: Earn credits when your friends invite others (up to 10 levels deep).
-   **Dashboard**: Real-time mileage counter, referral tracking (Active vs Pending conversions), and invite management.
-   **Admin Features**: User management, invitation oversight, and analytics dashboards.
-   **One-Time Password (OTP) Login)**: Implemented for quick login during development.
-   **User Roles**: Planned implementation to support role-based access control.
-   **Mailing System**: Integrated with Resend to send invite emails.
-   **Modern UI**: Modern and sleek design with glassmorphism, neon accents, and digital HUD elements.
-   **Accessibility**: WCAG compliant with semantic HTML, ARIA labels, and keyboard navigation support.

## Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Runtime**: Bun
-   **Database & Auth**: Supabase (supports OTP login)
-   **Email**: Resend
-   **Animations**: Framer Motion
-   **Admin Interface**: Custom admin dashboard
-   **Auth Method**: One‑Time Password (OTP) login for quick development
-   **User Roles**: Role‑based access control (planned)

## Getting Started

### Prerequisites

-   Bun v1.0+
-   Supabase Account
-   Resend Account

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/farrokh/arcade.git
    cd arcade
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Set up Environment Variables:
    Copy `env.example` to `.env.local` and fill in your keys:
    ```bash
    cp env.example .env.local
    ```
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    RESEND_API_KEY=your_resend_api_key
    ADMIN_PASSWORD=your_admin_password
    NEXT_PUBLIC_URL=your_nextjs_url
    ```

4.  Set up Database:
    The project uses multiple migration files. The recommended way to set up the database is using the Supabase CLI:
    ```bash
    supabase db push
    ```
    
    Alternatively, you can run the SQL files in `supabase/migrations/` sequentially in your Supabase SQL Editor.

5.  Run the development server:
    ```bash
    bun dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,`NEXT_PUBLIC_URL`,`ADMIN_PASSWORD`).
4. Deploy!
5. Access the admin dashboard at `/admin` using the admin password set in `ADMIN_PASSWORD`. its default value is `password`.
## Testing

- **Unit Tests**: Verify individual components and utilities using Jest.
- **Integration Tests**: Ensure end‑to‑end functionality across pages and API routes.
- **Coverage**: Generate coverage reports with `bun run test --coverage`.
- **Build Verification**: Confirm the production build succeeds.

Run the test suite:
```bash
bun run test
```

Run the build verification:
```bash
bun run build
```

## Acknowledgements

This project was built with the assistance of AI coding tools (Google DeepMind's Antigravity) to accelerate development, specifically for:
- Generating initial component scaffolding
- Writing unit tests
- Debugging linting errors

## License

MIT
