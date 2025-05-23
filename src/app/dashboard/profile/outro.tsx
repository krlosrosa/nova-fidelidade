"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Schema de validação
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  phone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 10 caracteres.",
  }),
  logoUrl: z.string().url().optional(),
  customDomain: z.string().optional(),
  slug: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface BusinessProfileProps {
  business: {
    id: string;
    name: string;
    phone: string;
    subscription_plan: string;
    subscription_status: string;
    trial_ends_at: Date | null;
    email: string;
    slug: string;
    logo_url: string | null;
    custom_domain: string | null;
    metadata: Record<string, any>;
  };
}

export function BusinessProfile({ business }: BusinessProfileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(business.logo_url || "");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: business.name,
      email: business.email,
      phone: business.phone,
      logoUrl: business.logo_url || "",
      customDomain: business.custom_domain || "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("As alterações foram salvas.");
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar as alterações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setIsDeleting(true);

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Sua conta foi excluída com sucesso.");
      // Redirecionar para página de login ou home
      window.location.href = "/";
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir a conta. Tente novamente.");
    } finally {
      setIsDeleting(false);
      setDeleteConfirmation("");
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue("logoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const subscriptionPlans = {
    free: "Grátis",
    basic: "Básico",
    pro: "Profissional",
    enterprise: "Empresarial",
  };

  const subscriptionStatus = {
    active: "Ativo",
    canceled: "Cancelado",
    past_due: "Pagamento pendente",
    trialing: "Período de teste",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configurações do Perfil</h1>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              business.subscription_status === "active"
                ? "default"
                : "secondary"
            }
          >
            {subscriptionStatus[
              business.subscription_status as keyof typeof subscriptionStatus
            ] || business.subscription_status}
          </Badge>
          <Badge variant="outline">
            {subscriptionPlans[
              business.subscription_plan as keyof typeof subscriptionPlans
            ] || business.subscription_plan}
          </Badge>
          {business.trial_ends_at &&
            new Date(business.trial_ends_at) > new Date() && (
              <Badge variant="secondary">
                Teste até{" "}
                {new Date(business.trial_ends_at).toLocaleDateString()}
              </Badge>
            )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={logoPreview} />
                  <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="logo">Logo do Estabelecimento</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <FormDescription>
                    Recomendamos uma imagem quadrada com pelo menos 200x200
                    pixels.
                  </FormDescription>
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Estabelecimento</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu negócio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="contato@negocio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o número que será vinculado ao WhatsApp para o
                      programa de fidelidade.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Personalizada</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {hostname}
                        </span>
                        <Input
                          value={business.slug}
                          disabled
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Este é o identificador único do seu negócio na plataforma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="customDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domínio Personalizado</FormLabel>
                    <FormControl>
                      <Input placeholder="seusite.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Configure um CNAME apontando para nossa plataforma para
                      usar seu próprio domínio.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">
                  Receber notificações por e-mail
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="whatsapp-notifications" defaultChecked />
                <Label htmlFor="whatsapp-notifications">
                  Receber notificações por WhatsApp
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Form>

      {/* Seção de Exclusão de Conta */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Excluir Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e todos os dados associados.
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Excluir minha conta</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você tem certeza absoluta?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-4">
                      <p>
                        Esta ação não pode ser desfeita. Isso excluirá
                        permanentemente:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Sua conta e todos os dados associados</li>
                        <li>O histórico de clientes e fidelidade</li>
                        <li>As configurações do atendimento por IA</li>
                        <li>Todos os dados de pagamento e assinatura</li>
                      </ul>
                      <p className="pt-2">
                        Digite <span className="font-bold">"excluir"</span>{" "}
                        abaixo para confirmar:
                      </p>
                      <Input
                        placeholder="Digite 'excluir' para confirmar"
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={
                      deleteConfirmation.toLowerCase() !== "excluir" ||
                      isDeleting
                    }
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isDeleting
                      ? "Excluindo..."
                      : "Excluir Conta Permanentemente"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
