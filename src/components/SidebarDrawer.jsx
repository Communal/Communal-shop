"use client";
import { useState } from "react";
import {
  Menu as MenuIcon,
  X as XIcon,
  Home as HomeIcon,
  User as UserIcon,
  ShoppingCart as OrdersIcon,
  Clock as HistoryIcon,
  HelpCircle as FaqIcon,
  ChevronRightIcon,
  SendIcon,
} from "lucide-react";
import Button from "./Button";
import Link from "next/link";

export default function SidebarDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button aria-label="Open sidebar" onClick={() => setOpen(true)}>
        <MenuIcon className="text-background size-7" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-foreground pb-10 text-background p-4 flex flex-col transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <button
          className="absolute top-4 right-4"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
        >
          <XIcon className="text-background size-7" />
        </button>

        <div className="space-y-5">
          <h2 className="text-2xl font-bold mt-5">Communal One</h2>

          <div className="bg-[#ff7f1f] rounded-xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between mb-2 bg-background-2 p-2">
              <span className="font-semibold text-lg text-foreground">
                Account Balance
              </span>
              <Button size="sm" style={{ boxShadow: "0 2px 4px 0 #e97a00" }}>
                Add Funds
              </Button>
            </div>

            <div className="text-3xl font-bold px-5 py-1.5">$5,000</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 mt-10">
          <SidebarLink icon={<HomeIcon className="size-6" />} label="Home" />
          <SidebarLink icon={<UserIcon className="size-6" />} label="Profile" />
          <SidebarLink
            icon={<OrdersIcon className="size-6" />}
            label="My Orders"
          />
          <SidebarLink
            icon={<HistoryIcon className="size-6" />}
            label="Purchase History"
          />
          <SidebarLink icon={<FaqIcon className="size-6" />} label="FAQs" />
        </nav>

        {/* Contact & Logout */}
        <div>
          <Link href="#" className="flex items-center gap-3">
            <span className="font-semibold">Contact Us :</span>
            <SendIcon className="size-5" />
          </Link>
          <Button className="w-full !bg-background !text-foreground !rounded-xl !text-xl !font-bold !py-3 !shadow-md !border-0 hover:opacity-90 mt-5">
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ icon, label }) {
  return (
    <button className="w-full flex items-center justify-between hover:bg-foreground/80 text-white font-semibold text-lg py-4 rounded-none border-b-2 border-white focus:outline-none transition-colors">
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ChevronRightIcon className="size-6" />
    </button>
  );
}
