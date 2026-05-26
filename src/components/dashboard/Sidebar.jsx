import React from "react";
import { LayoutDashboard, Compass, TrendingUp, Bookmark, Menu } from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed, goHome, activeView, setActiveView }) => {
  const menuItems = [
    { id: "overview", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "explore", name: "Explore Topics", icon: <Compass size={20} /> },
    { id: "progress", name: "Your Progress", icon: <TrendingUp size={20} /> },
    { id: "saved", name: "Saved Lessons", icon: <Bookmark size={20} /> },
  ];

  return (
    <aside className={`h-screen bg-[#F8FAFC] border-r border-gray-200 fixed left-0 top-0 flex flex-col transition-all duration-300 z-50 ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className={`p-6 mb-4 flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors w-fit">
          <Menu size={20} />
        </button>

        <div 
          onClick={goHome} 
          className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-all px-1"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:rotate-6 transition-transform">
            M
          </div>
          {!isCollapsed && <h1 className="text-lg font-black text-[#0F172A] tracking-tighter">MicroLearn</h1>}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all ${
              activeView === item.id ? "bg-gray-200 text-[#0F172A] font-bold" : "text-gray-500 hover:bg-gray-100"
            } ${isCollapsed ? "justify-center" : ""}`}
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm">{item.name}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;