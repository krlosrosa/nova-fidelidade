'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChatwootWidgetProps {
  websiteToken?: string
  baseUrl?: string
  className?: string
}

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void
      toggle: () => void
      isOpen: () => boolean
    }
    $chatwoot?: {
      toggle: () => void
      isOpen: () => boolean
    }
  }
}

export function ChatwootWidget({ 
  websiteToken = 'UZKSBMzfihJjNNofgSbRxKzi',
  baseUrl = 'https://chat.ragde.app',
  className 
}: ChatwootWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Função para carregar o script do Chatwoot
    const loadChatwootScript = () => {
      const script = document.createElement('script')
      script.src = `${baseUrl}/packs/js/sdk.js`
      script.defer = true
      script.async = true
      
      script.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken,
            baseUrl
          })
          setIsLoaded(true)
        }
      }
      
      document.head.appendChild(script)
    }

    // Verificar se o script já foi carregado
    if (!window.chatwootSDK && !document.querySelector(`script[src="${baseUrl}/packs/js/sdk.js"]`)) {
      loadChatwootScript()
    } else if (window.chatwootSDK) {
      setIsLoaded(true)
    }

    // Listener para detectar mudanças no estado do chat
    const checkChatwootState = () => {
      if (window.$chatwoot && typeof window.$chatwoot.isOpen === 'function') {
        setIsOpen(window.$chatwoot.isOpen())
      }
    }

    const interval = setInterval(checkChatwootState, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [baseUrl, websiteToken])

  // Função para alternar o chat
  const toggleChat = () => {
    if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
      window.$chatwoot.toggle()
      setIsOpen(!isOpen)
    } else if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
      window.chatwootSDK.toggle()
      setIsOpen(!isOpen)
    }
  }

  // Ocultar o widget em telas muito pequenas ou quando especificado
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 360)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isVisible || !isLoaded) {
    return null
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Button
        onClick={toggleChat}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out",
          "hover:scale-110 hover:shadow-xl",
          "bg-primary hover:bg-primary/90",
          "border-2 border-white/20",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat de suporte"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>
      
      {/* Indicador de mensagem não lida (opcional) */}
      <div className={cn(
        "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500",
        "animate-pulse opacity-0 transition-opacity duration-300",
        // Você pode controlar isso via props ou estado
        "hidden" // Remova esta classe quando quiser mostrar notificações
      )}>
        <span className="sr-only">Nova mensagem</span>
      </div>
    </div>
  )
}

// Hook para usar o Chatwoot programaticamente
export function useChatwoot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkChatwoot = () => {
      if (window.$chatwoot || window.chatwootSDK) {
        setIsLoaded(true)
        if (window.$chatwoot && typeof window.$chatwoot.isOpen === 'function') {
          setIsOpen(window.$chatwoot.isOpen())
        }
      }
    }

    const interval = setInterval(checkChatwoot, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggle = () => {
    if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
      window.$chatwoot.toggle()
    } else if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
      window.chatwootSDK.toggle()
    }
  }

  const open = () => {
    if (!isOpen) {
      toggle()
    }
  }

  const close = () => {
    if (isOpen) {
      toggle()
    }
  }

  return {
    isOpen,
    isLoaded,
    toggle,
    open,
    close
  }
}