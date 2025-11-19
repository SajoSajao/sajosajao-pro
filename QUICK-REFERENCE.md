# 🚀 Quick Reference - SajoSajao Beauty Academy React App

## 📍 Project Location
```
d:\xampp\htdocs\beauty\beauty-react
```

## ⚡ Quick Commands

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
# Opens: http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app with routing |
| `src/pages/Home.tsx` | Homepage |
| `src/pages/Courses.tsx` | Courses listing |
| `src/pages/CourseDetails.tsx` | Course details |
| `src/pages/Contact.tsx` | Contact form |
| `src/components/ui/` | Reusable UI components |
| `src/components/common/` | Navbar, Footer, Modals |
| `src/constants/courses.ts` | Course data |
| `src/utils/validation.ts` | Form validation schemas |
| `src/utils/sanitize.ts` | Security utilities |

## 🎨 Components Available

### UI Components
- `<Button variant="primary|secondary|outline" size="sm|md|lg">`
- `<Card hover>`
- `<Input label="Name" icon="fas fa-user" />`
- `<Textarea label="Message" />`
- `<Modal isOpen={true} onClose={fn} title="Title">`
- `<LoadingSpinner size="sm|md|lg" color="rose|white|gray" />`

### Common Components
- `<Navbar onEnrollClick={fn} />`
- `<Footer />`
- `<EnrollmentModal isOpen={true} onClose={fn} />`

## 🎯 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Homepage with hero, about, testimonials |
| `/courses` | Courses | Course listing with filters |
| `/courses/:id` | CourseDetails | Individual course details |
| `/contact` | Contact | Contact form |

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'rose': '#E8A5A5',     // Your primary color
  'blush': '#F8E8E8',    // Light backgrounds
  // ...
}
```

### Add/Edit Courses
Edit `src/constants/courses.ts`:
```typescript
export const COURSES: Course[] = [
  {
    id: 'your-course',
    title: 'Your Course Name',
    // ...
  }
];
```

### Update Contact Info
Edit `src/constants/navigation.ts`:
```typescript
export const CONTACT_INFO = {
  address: 'Your Address',
  phone: 'Your Phone',
  email: 'your@email.com'
};
```

## 🔒 Security Features

✅ Input sanitization (DOMPurify)
✅ Form validation (Zod schemas)
✅ XSS prevention
✅ TypeScript strict mode
✅ Environment variables

## 📦 Tech Stack

- **Framework**: React 19 + TypeScript 5
- **Build Tool**: Vite 7
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3
- **Forms**: React Hook Form + Zod
- **Security**: DOMPurify

## 🐛 Common Issues

### Port in use
Change port in `vite.config.ts`:
```typescript
server: { port: 3001 }
```

### TypeScript errors
Restart TS Server: Ctrl+Shift+P → "TypeScript: Restart TS Server"

### Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 File Structure

```
src/
├── components/
│   ├── ui/              # Reusable components
│   └── common/          # Navbar, Footer
├── pages/               # Page components
├── layouts/             # Layout wrappers
├── hooks/               # Custom hooks
├── utils/               # Utilities
├── constants/           # Data & config
├── types/               # TypeScript types
├── App.tsx              # Main app
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## ✨ Features Implemented

✅ 4 Complete Pages
✅ 12 Reusable Components  
✅ React Router Navigation
✅ Form Validation (Zod + React Hook Form)
✅ Security (XSS Protection, Sanitization)
✅ TypeScript Strict Mode
✅ Tailwind CSS Styling
✅ Custom Hooks & Utilities
✅ Responsive Design
✅ Accessibility Features

## 📞 Support

**Email**: info@sajosajao.com  
**Phone**: +1 (555) 123-4567

---

**Ready to run?**
```bash
cd d:\xampp\htdocs\beauty\beauty-react
npm install
npm run dev
```

🎉 **Happy Coding!**
