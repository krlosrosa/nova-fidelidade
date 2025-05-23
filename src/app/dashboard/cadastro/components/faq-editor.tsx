'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface FAQItem {
  question: string
  answer: string
}

export function FAQEditor({
  faqs,
  onChange,
}: {
  faqs: FAQItem[]
  onChange: (faqs: FAQItem[]) => void
}) {
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')

  const addFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      onChange([...faqs, { question: newQuestion, answer: newAnswer }])
      setNewQuestion('')
      setNewAnswer('')
    }
  }

  const removeFAQ = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{faq.question}</p>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFAQ(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Pergunta frequente"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <Textarea
          placeholder="Resposta"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFAQ}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar FAQ
        </Button>
      </div>
    </div>
  )
}