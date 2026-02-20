import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { User, Bell, Shield, Palette, Download, LogOut, Sun, Moon } from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => { setDarkMode(!darkMode); document.documentElement.classList.toggle("dark"); };

  return (
    <AppLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Profile */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profile</h3>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center text-white font-bold text-xl">AK</div>
            <div>
              <p className="font-semibold text-foreground">Alex Kumar</p>
              <p className="text-sm text-muted-foreground">alex@study.ai</p>
              <button className="text-xs text-primary hover:underline mt-0.5">Change photo</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["Full Name","Alex Kumar"],["Email","alex@study.ai"],["Target Score","90%"],["Daily Goal","4 hours"]].map(([l,v]) => (
              <div key={l}>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">{l}</label>
                <input defaultValue={v} className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 rounded-xl gradient-hero text-white text-sm font-medium shadow-card">Save Changes</button>
        </div>

        {/* Appearance */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-primary" /> Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <button onClick={toggleDark} className={`w-12 h-6 rounded-full relative transition-all ${darkMode ? "gradient-study" : "bg-muted"}`}>
              <motion.div animate={{ x: darkMode ? 22 : 2 }} className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm flex items-center justify-center">
                {darkMode ? <Moon className="w-3 h-3 text-primary" /> : <Sun className="w-3 h-3 text-warning" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</h3>
          <div className="space-y-3">
            {[["Push Notifications","Get alerts on your device",true],["Email Digest","Daily summary email",false],["Streak Alerts","Alert when streak at risk",true],["Achievement Unlocked","Badges and milestones",true]].map(([l,d,on]) => (
              <div key={l as string} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div><p className="text-sm text-foreground">{l as string}</p><p className="text-xs text-muted-foreground">{d as string}</p></div>
                <div className={`w-11 h-6 rounded-full relative cursor-pointer ${on ? "gradient-study" : "bg-muted"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger */}
        <div className="bg-card border border-destructive/30 rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-base text-destructive mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Account</h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-colors"><Download className="w-4 h-4" /> Export Data</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"><LogOut className="w-4 h-4" /> Sign Out</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
