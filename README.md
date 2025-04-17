# tenstack - SolidJS Web Application

My tech stack built with SolidJS, tRPC, and PostgreSQL.

## Tech Stack

- **Frontend**: [SolidJS](https://www.solidjs.com/) with [SolidStart](https://start.solidjs.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- **API**: [tRPC](https://trpc.io/) for type-safe API endpoints
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **SSR**: [SolidStart](https://start.solidjs.com/) (which uses [Vinxi](https://github.com/vinxi-network/vinxi) under the hood)
- **i18n**: Internationalization using Solid primitives

## Project Structure

```
tenstack/
├── src/                # Source code
│   ├── routes/         # SolidStart routes (pages)
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Basic UI components
│   │   ├── layouts/    # Layout components
│   │   └── icons/      # Icon components
│   ├── lib/            # Utility functions and libraries
│   ├── trpc/           # tRPC API setup
│   ├── i18n/           # Internationalization files
│   └── assets/         # Static assets
├── drizzle/            # Database migrations and schema
├── public/             # Public static files
└── app.config.ts       # Application configuration
```

## Getting Started

### Prerequisites

- Node.js >= 22
- PostgreSQL database
- pnpm package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/teneburu/tenstack
   cd tenstack
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_URL=postgresql://username:password@localhost:5432/dbname
   ```

4. Set up the database
   ```bash
   pnpm db:push
   ```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Database Management

- Generate migrations: `pnpm db:generate`
- Push schema changes: `pnpm db:push`
- View database via UI: `pnpm db:studio`

### Building for Production

```bash
pnpm build
pnpm start
```

## Image Handling with vite-imagetools

This project uses [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) for optimized image processing. Here's how to replace the logo in the Nav component:

1. Add your new logo image to the `src/assets/images/` directory
2. Edit `src/components/Nav.tsx` and update the import statement with your new image:
   ```tsx
   import Logo from "~/assets/images/your-new-logo.png?w=72&h=41&format=webp&imagetools";
   ```

You can adjust these parameters to fit your new logo's requirements:
- Change dimensions with `w=` and `h=`
- Use different formats like `format=png` or `format=avif`
- Add other optimization parameters like `quality=90`

For more image transformation options, refer to the [vite-imagetools documentation](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md).

## Component System

### UI Components

The project uses a modular component system following the principles of atomic design:

- **UI Components** (`src/components/ui/`): Basic, reusable UI elements like:
  - `ThemeSwitcher.tsx`: Toggle between light and dark themes
  - `LanguageSwitcher.tsx`: Change the application language

These components are designed to be self-contained and reusable across the application.

### Layout System

Use layout components to provide consistent structure across pages:

- (`src/components/layouts/PageLayout.tsx`): Wraps page content with consistent styling and structure

Layout components accept typed props defined in `src/types/layouts.ts`:

## License

[MIT](LICENSE)

