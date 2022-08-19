import { ReactNode } from "react";

export interface AdminLayoutConfig {
    theme: any;
    showSetting: boolean;
    showFixHeader: boolean;
    showFixSideBar: boolean;
    showSideBarLogo: boolean;
    collapsedSideBar: boolean;
}

export interface AdminLayoutProps {
    children: ReactNode;
    footer?: ReactNode;
    menus?: any[];
}