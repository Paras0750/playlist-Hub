import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleCollapse: () => void;
    toggleMobileOpen: () => void;
    closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width <= 768) {
            setIsCollapsed(true);
            setIsMobileOpen(false);
        } else if (width <= 1024) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const toggleCollapse = () => setIsCollapsed((prev) => !prev);
    const toggleMobileOpen = () => setIsMobileOpen((prev) => !prev);
    const closeMobile = () => setIsMobileOpen(false);

    return (
        <SidebarContext.Provider
            value={{ isCollapsed, isMobileOpen, toggleCollapse, toggleMobileOpen, closeMobile }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
