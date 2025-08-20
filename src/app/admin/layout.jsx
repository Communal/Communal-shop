// app/admin/layout.js
"use client";

import { DM_Sans } from 'next/font/google';
import '../globals.css';
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/adminStore";
import AdminHeader from "./components/AdminHeader";

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-DMsans',
  subsets: ['latin'],
});

export default function AdminLayout({ children }) {
  const { initializeAdmin, loading, user } = useAdminStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initializeAdmin();
      setInitialized(true);
    }
  }, [initializeAdmin, initialized]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background pt-20 ${dmSans.variable}`}>
      <AdminHeader />
      <main className="px-4 pb-8 min-h-screen"> {/* Added min-h-screen */}
        {children}
      </main>
    </div>
  );
}