# eTuitionBd - Client

> বাংলাদেশের সেরা অনলাইন টিউশন ম্যানেজমেন্ট প্ল্যাটফর্ম

## 🚀 Features

### 🏠 Public Features

- **Home Page** with hero section, search, and animations
- **Tuition Listing** with search, filter, sort, and pagination
- **Tutor Listing** with profiles and reviews
- **Authentication** (Email/Password and Google OAuth)

### 👨‍🎓 Student Dashboard

- **My Tuitions** - View, edit, and delete tuition posts
- **Post Tuition** - Create new tuition requests
- **Applied Tutors** - View and manage tutor applications
- **Payments** - View transaction history
- **Profile Settings** - Update personal information

### 👨‍🏫 Tutor Dashboard

- **My Applications** - Track application status
- **Ongoing Tuitions** - View approved tuitions
- **Revenue** - View earnings and transactions
- **Profile Settings** - Update tutor profile

### 👑 Admin Dashboard

- **User Management** - Manage all users and roles
- **Tuition Management** - Approve/reject tuition posts
- **Reports & Analytics** - View platform statistics

### 💳 Payment Integration

- **Stripe Checkout** for secure payments
- **Payment Confirmation** pages
- **Transaction History**

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router v7** for routing
- **TanStack Query** for data fetching
- **React Hook Form** + **Zod** for form validation
- **shadcn/ui** + **Tailwind CSS** for UI
- **Framer Motion** for animations
- **Firebase Auth** for authentication
- **Axios** for API calls

## 📦 Installation

### Prerequisites

- Node.js 18+ and pnpm installed
- Firebase project credentials
- Running backend server

### Setup Steps

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Setup environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```
   Opens at [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
pnpm dev          # Start development server (port 3000)
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm test:run     # Run tests
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format code with Prettier
pnpm type-check   # Check TypeScript types
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── layout/       # Layout components (Header, Footer, Sidebar)
│   │   └── guards.tsx    # Route protection
│   ├── features/         # Feature-based modules
│   │   ├── auth/         # Authentication
│   │   ├── dashboard/    # Dashboard (Student, Tutor, Admin)
│   │   ├── tuitions/     # Tuition management
│   │   ├── tutors/       # Tutor profiles
│   │   └── payments/     # Payment processing
│   ├── pages/            # Page components
│   ├── routes/           # Route configuration
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript types
│   └── config/           # Configuration files
└── public/               # Static assets
```

## 🔐 Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🌐 API Integration

The client communicates with the backend API at `VITE_API_BASE_URL`.

**Make sure the server is running before starting the client.**

API setup:

- **Base URL:** `http://localhost:5000/api/v1` (development)
- **Config:** `@/config/axios.tsx` - Axios instance with auth interceptors
- **Services:** `@/services/*` - Feature-specific API calls
- **Interceptors:** Automatic JWT token attachment and error handling

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components with Tailwind CSS. All UI components are in `src/components/ui/`.

To add new shadcn components:

```bash
pnpm dlx shadcn@latest add button
```

## 🔒 Authentication

- **Firebase Authentication** for user management
- **JWT tokens** stored in localStorage
- **Route guards** for protected pages
- **Role-based access control** (Student, Tutor, Admin)

## 📱 Responsive Design

- Mobile-first approach
- Responsive navbar with mobile menu
- Adaptive layouts for all screen sizes
- Touch-friendly UI elements

### Netlify

1. **Build:**

   ```bash
   pnpm build
   ```

2. **Connect repository** to Netlify for auto-deployment

3. **Set environment variables** in Netlify dashboard:
   - Copy all `VITE_*` variables from `.env.local`
   - Update `VITE_API_BASE_URL` to production server URL

4. **Configure Firebase:** -� Related Repositories

- **Server:** [e-Tuitionbd-server](https://github.com/Mehedi2362/e-Tuitionbd-server)
- **Client:** [e-Tuitionbd-client](https://github.com/Mehedi2362/e-Tuitionbd-client)

## 📝 License

MIT

## 👥 Author

B12-A11 Project Team

---

For issues or questions, please open an issue on GitHub.

1. Build: `pnpm build`
2. Deploy `dist/` folder to your hosting
3. Configure redirects for SPA routing
4. Update environment variables on hosting platform

5. **Configure Firebase authorized domains** in Firebase Console

## 📝 License

MIT

## 👥 Team

B12-A11 Project Team
