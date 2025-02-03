import Link from 'next/link'
import { SiReaddotcv } from '@icons-pack/react-simple-icons'

type CvProps = {
  href: string
}

export function CvBlock({ href }: CvProps) {
  return (
    <Link href={href} target="_blank">
      <SiReaddotcv />
    </Link>
  )
}
