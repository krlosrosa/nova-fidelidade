import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp
  appearance={{
    elements: {
      formFieldInput__tenant_name: {
        placeholder: "Nome da sua empresa/projeto",
      }
    }
  }}/>
}
