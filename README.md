# eTuitionBD - Client

A modern, fully-featured online tutoring platform frontend built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. This platform connects students with qualified tutors for personalized learning experiences.

![Node](https://img.shields.io/badge/Node-%3E%3D20-green) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Demo

- **Production**: [https://e-tuitionbd.netlify.app](https://e-tuitionbd.netlify.app)
- **Repository**: [GitHub](https://github.com/Mehedi2362/e-Tuitionbd-client)

## ✨ Features

### Core Features

- 👨‍🎓 **Student Dashboard** - Track courses, progress, and reviews
- 👨‍🏫 **Tutor Management** - Browse, search, and filter qualified tutors
- 📚 **Course Browsing** - Extensive tuition catalog with advanced filtering
- 🔍 **Smart Search** - Filter by class, subject, location, and more
- 💰 **Payment Integration** - Secure payments via Stripe
- 🔐 **Authentication** - Firebase-based auth with email verification
- 📝 **Reviews & Ratings** - Student feedback system for tutors
- 🌙 **Dark Mode** - Seamless light/dark theme switching
- 📱 **Responsive Design** - Mobile-first, fully responsive UI
- 🔔 **Real-time Updates** - React Query for efficient data fetching

### Admin & Tutor Features

- 📊 **Admin Dashboard** - Manage users, tutors, and payments
- 👨‍💼 **Tutor Profile** - Customize offerings and manage availability
- 💳 **Payment History** - Track earnings and transactions
- 📈 **Analytics** - View booking trends and student engagement

## 🛠️ Tech Stack

### Frontend Framework

- **React 19** - Latest React features with server components
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router v7** - Modern routing

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful SVG icons
- **Framer Motion** - Smooth animations and transitions

### State & Data Management

- **React Hook Form** - Efficient form handling
- **TanStack React Query** - Server state management
- **Axios** - HTTP client with interceptors
- **Zod** - TypeScript-first validation

### Backend Integration

- **Firebase** - Authentication and real-time database
- **Stripe** - Payment processing
- **RESTful API** - Backend integration via axios

### Developer Tools

- **ESLint** - Code quality and style
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** >= 20
- **pnpm** >= 9 (recommended) or npm/yarn
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mehedi2362/e-Tuitionbd-client.git
cd e-Tuitionbd-client
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Configuration

Create `.env.local` in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

For production environment, use `.env.production`.

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📦 Project Structure

```
src/
├── assets/              # Static assets (icons, images)
│   └── icons/
├── components/          # Reusable React components
│   ├── layout/         # Layout components
│   ├── ui/             # UI component library
│   ├── GlobalSearch.tsx
│   └── guards.tsx      # Route guards
├── config/             # Configuration files
│   ├── api.ts          # API base URL config
│   ├── axios.tsx       # Axios instance setup
│   ├── auth.ts         # Auth config
│   └── firebase.ts     # Firebase config
├── constants/          # Application constants
│   ├── api.ts
│   ├── routes.ts
│   └── index.ts
├── contexts/           # React contexts
├── features/           # Feature modules
│   ├── about/
│   ├── auth/           # Authentication feature
│   ├── dashboard/      # Dashboard features
│   ├── home/           # Home page
│   ├── payments/       # Payment handling
│   ├── tuitions/       # Tuition listings
│   └── tutors/         # Tutor management
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.tsx
│   ├── useTheme.tsx
│   └── use-mobile.ts
├── lib/                # Utility libraries
│   └── utils.ts
├── pages/              # Page components
├── routes/             # Route configuration
├── services/           # API services
│   ├── dashboard.service.ts
│   ├── user.service.ts
│   ├── reviewApi.ts
│   └── index.ts
├── shared/             # Shared features
│   ├── application/
│   ├── auth/
│   ├── dashboard/
│   ├── payments/
│   ├── public/
│   ├── reviews/
│   └── tuition/
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Build & Deploy
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm deploy           # Deploy to GitHub Pages
pnpm deploy:github    # Deploy using gh-pages

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm type-check       # Check TypeScript types

# Maintenance
pnpm clean            # Remove dist and .docs
pnpm clean:all        # Remove dist, .docs, node_modules
```

## 🔐 Environment Variables

### Development

See `.env.development` for development-specific configuration.

### Production

See `.env.production` for production configuration.

**Key Variables:**

- `VITE_API_BASE_URL` - Backend API endpoint
- `VITE_FIREBASE_*` - Firebase configuration
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key

## 🚢 Deployment

### Netlify (Recommended)

The project is configured for Netlify deployment with automatic builds on push to `main` branch.

**Setup:**

1. Connect GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push or manually via CLI:

```bash
netlify deploy --prod
```

### Vercel

Alternative deployment via Vercel:

```bash
vercel --prod
```

## 🔗 API Integration

The client communicates with the backend API at:

- **Development**: `http://localhost:5000/api/v1`
- **Production**: `https://e-tuitionbd-api.vercel.app/api/v1`

### Key Endpoints

- `GET //tutors` - Fetch tutors with filters
- `GET //tuitions` - Fetch tuition listings
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /payments/checkout` - Stripe payment checkout
- `GET /dashboard/student` - Student dashboard
- `GET /dashboard/tutor` - Tutor dashboard

For full API documentation, see the [Server Repository](https://github.com/Mehedi2362/e-Tuitionbd-server).

## 🔐 Authentication

### Firebase Authentication

- Email/Password authentication
- Email verification
- Password reset
- Session management via cookies

### Protected Routes

Routes are protected using route guards in [components/guards.tsx](src/components/guards.tsx).

## 💳 Payment Processing

### Stripe Integration

- Secure payment checkout
- Payment history tracking
- Invoice generation
- Webhook handling for payment confirmation

## 🎨 Theming

The application supports light and dark themes using Tailwind CSS and next-themes.

### Toggle Theme

```tsx
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Toggle Theme</button>
}
```

## 🧪 Code Quality

### ESLint

```bash
pnpm lint              # Check for issues
pnpm lint:fix          # Automatically fix issues
```

### Prettier

```bash
pnpm format            # Format all files
pnpm format:check      # Check formatting
```

### TypeScript

```bash
pnpm type-check        # Check types without building
```

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- Mobile (320px and up)
- Tablet (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

Use the custom `use-mobile` hook to handle responsive behavior:

```tsx
import { useMobile } from '@/hooks/use-mobile'

export function Component() {
  const isMobile = useMobile()
  return isMobile ? <MobileView /> : <DesktopView />
}
```

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:

1. Backend API is running
2. `VITE_API_BASE_URL` environment variable is correct
3. Backend CORS is configured to allow the client domain

### Firebase Authentication Errors

- Verify Firebase configuration in `.env.local`
- Check Firebase project console for enabled auth methods
- Ensure email verification is configured

### Build Errors

```bash
# Clear cache and reinstall
pnpm clean:all
pnpm install
pnpm build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add TypeScript types for all code

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team & Support

**Maintainer:** [Mehedi2362](https://github.com/Mehedi2362)

For issues, feature requests, or discussions, please use the [GitHub Issues](https://github.com/Mehedi2362/e-Tuitionbd-client/issues) page.

## 🙏 Acknowledgments

- [React Community](https://react.dev)
- [Tailwind Labs](https://tailwindlabs.com)
- [shadcn](https://github.com/shadcn) for the amazing component library
- Firebase and Stripe teams

---

**Made with ❤️ for the education community**
