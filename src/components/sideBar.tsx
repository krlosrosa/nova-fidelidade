"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  Settings,
  CreditCard,
  BarChart2,
  HelpCircle,
  Menu,
  X,
  User,
  Building,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserButton, useUser } from "@clerk/nextjs";
import { useTenantStore } from "@/app/store/user-info";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { tenant } = useTenantStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (user?.publicMetadata) {
    const metaData = user.publicMetadata;
    if (!metaData.hasCompletedOnboarding) {
      router.replace("/onboard");
    }
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "funcionarios",
      href: "/dashboard/funcionarios",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Pontos",
      href: "/dashboard/pontos",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      name: "Minha assinatura",
      href: "/dashboard/subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Perfil do Negocio",
      href: "/dashboard/cadastro",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "Whatsapp",
      href: "/dashboard/whatsapp",
      icon: <Zap className="h-5 w-5" />,
    },
  ];

  const secondaryItems = [
    {
      name: "Meu Perfil",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Configurações",
      href: "/dashboard/config",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Ajuda",
      href: "/dashboard/faq",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Componente de navegação compartilhado para mobile e desktop
  const NavItems = ({ onClick }: { onClick: any }) => (
    <div className="flex flex-col justify-between h-full">
      <nav className="grid items-start gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-muted text-primary"
                : ""
            }`}
            onClick={onClick}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <nav className="grid items-start gap-1 mt-6">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              pathname === item.href ? "bg-muted text-primary" : ""
            }`}
            onClick={onClick}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Header Mobile */}
      {tenant?.role === "ADMIN" && (
        <div className="md:hidden flex h-14 items-center border-b px-4 sticky top-0 bg-background z-30 justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Gift className="h-6 w-6 text-primary" />
            <span className="text-lg">Fideliza</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-muted"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Mobile Sidebar (Overlay) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleSidebar}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-background p-4 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Gift className="h-6 w-6 text-primary" />
                <span className="text-lg">Fideliza</span>
              </Link>

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-muted"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              <NavItems onClick={toggleSidebar} />
            </div>

            {/* Perfil do usuário */}
            <div className="mt-auto pt-4 border-t">
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.imageUrl} alt="Avatar" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {tenant?.role === "ADMIN" && (
        <div className="hidden border-r bg-muted/40 md:block h-screen sticky top-0">
          <div className="flex h-full max-h-screen flex-col gap-2">
            {/* Logo/Cabeçalho */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Gift className="h-6 w-6 text-primary" />
                <span className="text-lg">Fideliza</span>
              </Link>
            </div>
            {/* Navegação principal */}
            <div className="flex-1 bg-red px-3 py-4">
              <NavItems onClick={() => {}} />
            </div>

            {/* Perfil do usuário */}
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.imageUrl} alt="Avatar" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
