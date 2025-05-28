'use client'
import { ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useTenantStore } from "@/app/store/user-info";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};
export default function CurrectUSerProvider({ children }: Props) {
  const { user } = useUser();
  const router = useRouter()
  const { tenant, setUser } = useTenantStore();

  //Logica para buscar do banco de dados

  useEffect(() => {
    setUser({
      id: '1',
      nome: 'Carlos Rosa da Silva',
      plano: 'Premium',
      role: "ADMIN",
      logo: "https://img.freepik.com/vetores-gratis/vetor-de-design-de-gradiente-colorido-de-passaro_343694-2506.jpg?semt=ais_hybrid&w=740"
    });
  }, []);

  if (!user) return <div>Loading...{}</div>;
  if(tenant?.role === 'USER') {
    router.push('/dashboard/pontos')
  }

  return <div>{children}</div>;
}
