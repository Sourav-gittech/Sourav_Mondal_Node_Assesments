import NavbarSection from "../../../layout/navbar/page";
import SidebarSection from "../../../layout/sidebar/page";
import FooterSection from "../../../layout/footer/page";

export default function ProductLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            {/* Sidebar */}
            <SidebarSection />

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <NavbarSection />

                <main className="flex-1 max-h-[610px] overflow-y-auto p-6">
                    {children}
                </main>

                <FooterSection />
            </div>
        </div>
    );
}