
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Replace this with your actual Clerk publishable key from https://go.clerk.com/lovable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YOUR_KEY_HERE"

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "pk_test_YOUR_KEY_HERE") {
    console.error("Please set your Clerk publishable key. Get it from https://go.clerk.com/lovable");
}

createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
    </ClerkProvider>
);
