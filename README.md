# Xdecor Client

Professional frontend application for the Xdecor home decoration booking platform. Built with React 19, Vite, and modern web technologies.

## 🚀 Live Demo

🔗 **Production**: [https://keen-meerkat-3d3a72.netlify.app](https://keen-meerkat-3d3a72.netlify.app)

## 🎯 Project Overview

Xdecor is a comprehensive home decoration booking platform that connects users with professional decorators. The platform provides a seamless experience for browsing services, making bookings, processing payments, and managing the entire decoration workflow.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Firebase Authentication**: Secure email/password and Google OAuth
- **Role-based Access Control**: User, Decorator, and Admin roles
- **Protected Routes**: Route guards for different user types
- **Profile Management**: Complete user profile system

### 🏠 Service Management
- **Service Catalog**: Browse and search decoration services
- **Service Details**: Comprehensive service information with images
- **Service Filtering**: Search and filter by categories
- **Responsive Design**: Mobile-first approach

### 📅 Booking System
- **Easy Booking**: Streamlined booking process
- **Booking Management**: View and manage all bookings
- **Status Tracking**: Real-time booking status updates
- **Calendar Integration**: Date and time selection

### 💳 Payment Processing
- **Stripe Integration**: Secure payment processing
- **Payment History**: Complete transaction records
- **Multiple Payment Methods**: Card payments with Stripe
- **Payment Status**: Real-time payment confirmations

### 📊 Dashboard Features
- **User Dashboard**: Personal bookings and payment history
- **Admin Dashboard**: Service management and analytics
- **Decorator Dashboard**: Assigned bookings and earnings
- **Analytics**: Revenue and demand insights

### 🎨 Modern UI/UX
- **Tailwind CSS**: Utility-first styling
- **DaisyUI**: Beautiful component library
- **Framer Motion**: Smooth animations
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.0**: Latest React with concurrent features
- **Vite 7.2.4**: Lightning-fast build tool
- **React Router 7.10.1**: Modern routing solution
- **TypeScript**: Type-safe development (optional)

### Styling & UI
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **DaisyUI 5.5.8**: Component library for Tailwind
- **Framer Motion 12.23.25**: Animation library
- **React Icons 5.5.0**: Icon library
- **Styled Components 6.1.19**: CSS-in-JS styling

### State Management & Data
- **TanStack React Query 5.90.12**: Server state management
- **React Hook Form 7.68.0**: Form handling
- **Axios 1.13.2**: HTTP client
- **React Context**: Global state management

### Authentication & Services
- **Firebase 12.6.0**: Authentication and hosting
- **Stripe 20.0.0**: Payment processing

### Additional Features
- **React Toastify 11.0.5**: Toast notifications
- **SweetAlert2 11.26.4**: Beautiful alerts
- **Recharts 3.5.1**: Data visualization
- **Leaflet**: Map integration
- **Lottie React**: Animation support
- **Swiper**: Touch slider

## 📋 Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Firebase Account**: For authentication
- **Stripe Account**: For payments

## ⚙️ Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # API Configuration
   VITE_API_URL=https://xdecor.vercel.app
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   
   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   ```

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Analyze bundle
npm run analyze
```

### Development Server
```bash
npm run dev
```
Opens development server at `http://localhost:5173`

## 🏗️ Project Structure

```
client/
├── public/                 # Static assets
│   ├── logoxx.png         # Application logo
│   ├── vite.svg           # Vite logo
│   └── _redirects         # Netlify redirects
├── src/
│   ├── assets/            # Images and animations
│   ├── components/        # Reusable components
│   │   ├── Loading/       # Loading components
│   │   ├── Logo/          # Logo component
│   │   └── ThemeToggle/   # Theme switcher
│   ├── contexts/          # React contexts
│   │   └── AuthProvider/  # Authentication context
│   ├── data/              # Static data
│   ├── firebase/          # Firebase configuration
│   ├── hooks/             # Custom hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   └── useRole.js     # Role management hook
│   ├── layout/            # Layout components
│   │   ├── RootLayout.jsx # Main layout
│   │   ├── AuthLayout.jsx # Auth pages layout
│   │   └── DashboardLayout.jsx # Dashboard layout
│   ├── pages/             # Page components
│   │   ├── Home/          # Homepage
│   │   ├── Auth/          # Authentication pages
│   │   ├── Services/      # Service pages
│   │   ├── Dashboard/     # Dashboard pages
│   │   └── Error/         # Error pages
│   ├── routes/            # Routing configuration
│   │   ├── router.jsx     # Main router
│   │   ├── PrivateRoute.jsx # Protected routes
│   │   ├── AdminRoute.jsx # Admin routes
│   │   └── DecoratorRoute.jsx # Decorator routes
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Application entry
│   ├── index.css          # Global styles
│   └── App.css            # Component styles
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # Documentation
```

## 🔐 Authentication Flow

1. **User Registration/Login**: Firebase Authentication
2. **Role Assignment**: Automatic role assignment (user/decorator/admin)
3. **Route Protection**: Role-based route access
4. **Session Management**: Persistent authentication state

## 🎨 Styling Architecture

### Tailwind CSS Configuration
- **Custom Colors**: Brand color palette
- **Responsive Design**: Mobile-first breakpoints
- **Component Classes**: Reusable utility classes

### DaisyUI Components
- **Pre-built Components**: Buttons, cards, modals
- **Theme System**: Light/dark mode support
- **Customizable**: Easy theme customization

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full desktop functionality
- **Touch Friendly**: Touch-optimized interactions

## 🔧 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: Optimized image loading
- **Bundle Analysis**: Bundle size monitoring
- **Caching**: Efficient caching strategies

## 🚀 Deployment

### Netlify Deployment
1. **Connect Repository**: Link GitHub repository
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Configure in Netlify dashboard
4. **Deploy**: Automatic deployment on push

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy dist folder to hosting service
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run e2e tests (when configured)
npm run test:e2e
```

## 📊 Analytics & Monitoring

- **Performance Monitoring**: Web Vitals tracking
- **Error Tracking**: Error boundary implementation
- **User Analytics**: User behavior tracking
- **Bundle Analysis**: Bundle size monitoring

## 🔒 Security Features

- **Environment Variables**: Secure configuration
- **Route Protection**: Authentication guards
- **Input Validation**: Form validation
- **XSS Protection**: Sanitized inputs
- **HTTPS**: Secure communication

## 🤝 Contributing

1. **Fork Repository**: Create a fork
2. **Create Branch**: Feature/bugfix branch
3. **Make Changes**: Implement changes
4. **Test Thoroughly**: Ensure functionality
5. **Submit PR**: Create pull request

### Code Standards
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format
- **Component Structure**: Consistent component patterns

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- **Issues**: Create GitHub issue
- **Documentation**: Check README and code comments
- **Community**: Join project discussions

## 🔄 Version History

- **v2.0.0**: Complete refactor with modern architecture
- **v1.0.0**: Initial release

---

**Xdecor Client v2.0.0** - Professional, modern, and scalable frontend application