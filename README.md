# AutoPilot - Self-Driving Car Referral System

A Next.js application for a fictional self-driving car product, featuring a recursive referral system where users earn mileage credits for inviting friends.

## Features

-   **Viral Referral System**:
    -   **Sign Up Bonus**: 100 miles.
    -   **Direct Referral**: 50 miles.
    -   **Recursive Referral**: Earn credits when your friends invite others (up to 5 levels deep).
-   **Dashboard**: Real-time mileage counter, referral tracking, and invite management.
-   **Mailing System**: Integrated with Resend to send invite emails.
-   **Modern UI**: Built with Tailwind CSS, Framer Motion, and a dark/futuristic aesthetic.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Database & Auth**: Supabase
-   **Email**: Resend
-   **Animations**: Framer Motion

## Getting Started

### Prerequisites

-   Node.js 18+
-   Supabase Account
-   Resend Account

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/autopilot.git
    cd autopilot
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
    RESEND_API_KEY=your_resend_api_key
    ```

4.  Set up Database:
    Run the SQL commands in `supabase/schema.sql` in your Supabase SQL Editor. This will create the tables, RLS policies, and triggers for the referral logic.

5.  Run the development server:
    ```bash
    bun dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`).
4.  Deploy!

## Testing

Run the build verification:
```bash
bun run build
```

## License

MIT
