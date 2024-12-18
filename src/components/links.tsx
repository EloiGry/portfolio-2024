import {
  IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
} from '@icons-pack/react-simple-icons'

export default function Links() {
  const links: { icon: IconType; href: string, ariaLabel: string }[] = [
    {
      icon: SiGmail,
      href: 'mailto:eloi.grychta@gmail.com',
      ariaLabel: 'Mail'
    },
    {
      icon: SiGithub,
      href: 'https://github.com/EloiGry',
      ariaLabel: 'Github'
    },
    {
      icon: SiLinkedin,
      href: 'https://www.linkedin.com/in/eloi-grychta/',
      ariaLabel: 'Linkedin'
    },
  ]

  return (
    <div className="mr-auto mt-20 flex w-full flex-wrap items-center gap-10">
      {links.map((link, id) => {
        return (
          <a target="_blank" key={id} href={link.href} aria-label={link.ariaLabel}>
            <link.icon title="" />
          </a>
        )
      })}
    </div>
  )
}
