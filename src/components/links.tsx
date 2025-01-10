import {
  IconType,
  SiGithub,
  SiLinkedin,
} from '@icons-pack/react-simple-icons'

export default function Links() {
  const links: { icon: IconType; href: string, ariaLabel: string }[] = [
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
    <div className="flex items-center gap-10">
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
