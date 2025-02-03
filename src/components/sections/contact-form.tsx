'use client'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { LoadingSpinner } from '../ui/loading-spinner'
import { ContactForm as ContactType } from '@/types/contactForm'

import { useSubmit } from '@formspree/react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MailCheck } from 'lucide-react'

type Inputs = {
  name: string
  email: string
  object: string
  message: string
}

type ContactFormProps = {
  formData: ContactType
}

export function ContactForm({ formData }: ContactFormProps) {
  const schema: ZodType<Inputs> = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: formData.errors_object })
      .refine((val) => val !== '', { message: formData.errors_object }),
    email: z
      .string()
      .email({ message: formData.errors_email })
      .min(1, { message: formData.errors_email }),
    object: z
      .string()
      .trim()
      .min(1, { message: formData.errors_object })
      .refine((val) => val !== '', { message: formData.errors_object }),
    message: z
      .string()
      .trim()
      .min(1, { message: formData.errors_message })
      .refine((val) => val !== '', { message: formData.errors_message }),
  })

  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<Inputs>({ resolver: zodResolver(schema) })

  const submit = useSubmit<Inputs>(process.env.NEXT_PUBLIC_FORM as string, {
    onError(errs) {
      const formErrs = errs.getFormErrors()
      for (const { code, message } of formErrs) {
        setError(`root.${code}`, {
          type: code,
          message,
        })
      }

      const fieldErrs = errs.getAllFieldErrors()
      for (const [field, errs] of fieldErrs) {
        setError(field, {
          message: errs.map((e) => e.message).join(', '),
        })
      }
    },
  })

  return (
    <div>
      {isSubmitSuccessful ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <MailCheck width={32} height={32} />
          <h2 className="text-lg font-semibold">{formData.success_message}</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold"> {formData.title}</h2>
          <p className="font-medium"> {formData.description}</p>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
            <div className="block">
              <Label htmlFor="name">{formData.name}</Label>
              <Input
                {...register('name')}
                type="text"
                id="name"
                placeholder={formData.name}
                className="bg-main dark:bg-main"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="block">
              <Label htmlFor="email">{formData.email}</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder={formData.email}
                className="bg-main dark:bg-main"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="block">
              <Label htmlFor="object">{formData.object}</Label>
              <Input
                {...register('object')}
                type="text"
                id="object"
                placeholder={formData.object}
                className="bg-main dark:bg-main"
              />
              {errors.object && (
                <p className="text-red-500">{errors.object.message}</p>
              )}
            </div>
            <div className="block">
              <Label htmlFor="message">{formData.message}</Label>
              <Textarea
                {...register('message')}
                id="message"
                rows={8}
                placeholder={formData.object}
                className="bg-main dark:bg-main"
              />
            </div>
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
            <Input type="text" name="_gotcha" className="hidden" />
            {errors.root && (
              <div className="block">
                <p className="text-red-500">{formData.global_error}</p>
              </div>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : formData.submit}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
