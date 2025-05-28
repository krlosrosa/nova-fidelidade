"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash, Upload } from "lucide-react";

// Form schema
const formSchema = z.object({
  // Section 1
  officialName: z.string().min(2, "Nome muito curto"),
  fantasyName: z.string().optional(),
  cnpj: z.string().min(14, "CNPJ inválido"),
  businessType: z.string().min(2, "Informe o ramo"),
  businessDescription: z
    .string()
    .min(10, "Descrição muito curta")
    .max(200, "Descrição muito longa"),

  // Section 2
  address: z.string().min(5, "Endereço inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  whatsapp: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  socialMedia: z.string().optional(),

  // Section 3
  openingTime: z.string(),
  closingTime: z.string(),
  workingDays: z.array(z.string()).min(1, "Selecione pelo menos um dia"),
  closedOnHolidays: z.boolean(),

  // Section 4
  products: z
    .array(
      z.object({
        category: z.string().min(1, "Categoria obrigatória"),
        items: z
          .array(
            z.object({
              name: z.string().min(1, "Nome do item obrigatório"),
              price: z.string().min(1, "Preço obrigatório"),
            })
          )
          .min(1, "Adicione pelo menos um item"),
      })
    )
    .min(1, "Adicione pelo menos uma categoria")
    .refine(
      (products) => products.every(
        (product) => product.items.length > 0
      ),
      {
        message: "Cada categoria deve ter pelo menos um item",
      }
    ),

  // Section 5
  faqs: z
    .array(
      z.object({
        question: z.string().min(5, "Pergunta muito curta"),
        answer: z.string().min(5, "Resposta muito curta"),
      })
    )
    .optional(),

  // Section 6
  paymentMethods: z.array(z.string()).min(1, "Selecione pelo menos um método"),
  returnPolicy: z.string().optional(),
  reservationRequirements: z.string().optional(),

  // Section 7
  logo: z.any().optional(),
  menuFile: z.any().optional(),
});

export default function EstablishmentRegistration() {
  const [activeTab, setActiveTab] = useState("basic");
  const [productCategories, setProductCategories] = useState([
    { category: "", items: [{ name: "", price: "" }] },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      officialName: "",
      fantasyName: "",
      cnpj: "",
      businessType: "",
      businessDescription: "",
      address: "",
      phone: "",
      whatsapp: "",
      email: "",
      socialMedia: "",
      openingTime: "08:00",
      closingTime: "18:00",
      workingDays: [],
      closedOnHolidays: true,
      products: [],
      faqs: [],
      paymentMethods: [],
      returnPolicy: "",
      reservationRequirements: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Inclui os produtos e FAQs dos estados locais
      const completeValues = {
        ...values,
        products: productCategories,
        faqs: faqs
      };
      
      // Remove categorias vazias e itens vazios
      completeValues.products = completeValues.products
        .filter(cat => cat.category.trim() !== "")
        .map(cat => ({
          ...cat,
          items: cat.items.filter(item => item.name.trim() !== "" && item.price.trim() !== "")
        }))
        .filter(cat => cat.items.length > 0);
      
      // Remove FAQs vazios
      completeValues.faqs = completeValues.faqs.filter(faq => 
        faq.question.trim() !== "" && faq.answer.trim() !== ""
      );

      console.log("Dados enviados:", completeValues);
      await axios.post('https://novo.ragde.app/webhook-test/f0eeec39-eec4-467c-9886-9f3352170c4d', completeValues);
      alert("Cadastro enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Ocorreu um erro ao enviar o formulário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProductCategory = () => {
    setProductCategories([
      ...productCategories,
      { category: "", items: [{ name: "", price: "" }] },
    ]);
  };

  const removeProductCategory = (index: number) => {
    if (productCategories.length > 1) {
      const updated = [...productCategories];
      updated.splice(index, 1);
      setProductCategories(updated);
    }
  };

  const addProductItem = (categoryIndex: number) => {
    const updated = [...productCategories];
    updated[categoryIndex].items.push({ name: "", price: "" });
    setProductCategories(updated);
  };

  const removeProductItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...productCategories];
    if (updated[categoryIndex].items.length > 1) {
      updated[categoryIndex].items.splice(itemIndex, 1);
      setProductCategories(updated);
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    if (faqs.length > 1) {
      const updated = [...faqs];
      updated.splice(index, 1);
      setFaqs(updated);
    }
  };

  const workingDays = [
    { id: "monday", label: "Segunda" },
    { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" },
    { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const paymentMethods = [
    { id: "cash", label: "Dinheiro" },
    { id: "credit", label: "Cartão de crédito" },
    { id: "debit", label: "Cartão de débito" },
    { id: "pix", label: "Pix" },
    { id: "meal", label: "Vale-refeição" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cadastro do Estabelecimento
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-6 overflow-x-auto">
              <TabsTrigger value="basic" onClick={() => setActiveTab("basic")}>
                Dados Básicos
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                onClick={() => setActiveTab("contact")}
              >
                Contato
              </TabsTrigger>
              <TabsTrigger value="hours" onClick={() => setActiveTab("hours")}>
                Funcionamento
              </TabsTrigger>
              <TabsTrigger
                value="products"
                onClick={() => setActiveTab("products")}
              >
                Produtos
              </TabsTrigger>
              <TabsTrigger value="faq" onClick={() => setActiveTab("faq")}>
                Perguntas
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                onClick={() => setActiveTab("policies")}
              >
                Políticas
              </TabsTrigger>
            </TabsList>

            {/* Section 1: Basic Data */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Básicos do Estabelecimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="officialName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome oficial*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome registrado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fantasyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome fantasia (se diferente)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome como é conhecido"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00.000.000/0000-00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ramo de atuação*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Restaurante, loja de roupas, barbearia"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Descrição resumida (1-2 linhas sobre o negócio)*
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Restaurante especializado em comida italiana com ambiente familiar"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setActiveTab("contact")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>

            {/* Section 2: Contact Info */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço completo*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rua, número, bairro, cidade"
                            {...field}
                          />
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
                        <FormLabel>Telefone principal*</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 0000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
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
                        <FormLabel>E-mail comercial*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contato@estabelecimento.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Redes sociais (Instagram, Facebook, etc.)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: @meuestabelecimento"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("basic")}
                >
                  Voltar
                </Button>
                <Button type="button" onClick={() => setActiveTab("hours")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>


            {/* Section 4: Products/Services */}
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos/Serviços Oferecidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {productCategories.map((category, categoryIndex) => (
                    <div
                      key={categoryIndex}
                      className="space-y-4 border p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">
                          Categoria {categoryIndex + 1}
                        </h3>
                        {productCategories.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProductCategory(categoryIndex)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <Input
                        placeholder="Nome da categoria (Ex: 'Pratos principais')"
                        value={category.category}
                        onChange={(e) => {
                          const updated = [...productCategories];
                          updated[categoryIndex].category = e.target.value;
                          setProductCategories(updated);
                        }}
                      />

                      <div className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex gap-2 items-center"
                          >
                            <Input
                              placeholder={`Item ${itemIndex + 1}`}
                              value={item.name}
                              onChange={(e) => {
                                const updated = [...productCategories];
                                updated[categoryIndex].items[itemIndex].name =
                                  e.target.value;
                                setProductCategories(updated);
                              }}
                            />
                            <Input
                              placeholder="Preço"
                              value={item.price}
                              onChange={(e) => {
                                const updated = [...productCategories];
                                updated[categoryIndex].items[itemIndex].price =
                                  e.target.value;
                                setProductCategories(updated);
                              }}
                            />
                            {category.items.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeProductItem(categoryIndex, itemIndex)
                                }
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addProductItem(categoryIndex)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Item
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addProductCategory}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Categoria
                  </Button>

                  <div className="pt-4">
                    <FormLabel>
                      Ou faça upload do cardápio/lista de serviços
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.xlsx,.xls"
                        className="w-auto"
                      />
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("hours")}
                >
                  Voltar
                </Button>
                <Button type="button" onClick={() => setActiveTab("faq")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>

            {/* Section 5: FAQs */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="space-y-2 border p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Pergunta {index + 1}</h3>
                        {faqs.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFaq(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <Input
                        placeholder="Pergunta (Ex: 'Vocês aceitam cartão?')"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[index].question = e.target.value;
                          setFaqs(updated);
                        }}
                      />

                      <Textarea
                        placeholder="Resposta (Ex: 'Sim, aceitamos crédito, débito e Pix.')"
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[index].answer = e.target.value;
                          setFaqs(updated);
                        }}
                      />
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addFaq}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Pergunta
                  </Button>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("products")}
                >
                  Voltar
                </Button>
                <Button type="button" onClick={() => setActiveTab("policies")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>

            {/* Section 6: Policies */}
            <TabsContent value="policies">
              <Card>
                <CardHeader>
                  <CardTitle>Políticas e Regras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <FormLabel>Formas de pagamento aceitas*</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {paymentMethods.map((method) => (
                        <FormField
                          key={method.id}
                          control={form.control}
                          name="paymentMethods"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(method.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          method.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== method.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {method.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage>
                      {form.formState.errors.paymentMethods?.message}
                    </FormMessage>
                  </div>

                  <FormField
                    control={form.control}
                    name="returnPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Política de trocas/devoluções</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Aceitamos trocas em até 7 dias para produtos com etiqueta."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reservationRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Requisitos para reservas/agendamentos
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Reservas devem ser feitas com 24h de antecedência."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("faq")}
                >
                  Voltar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}