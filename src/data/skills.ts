import {
  type IconType,
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiStrapi,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiWordpress,
  SiElementor,
  SiPrisma,
  SiTypescript,
} from '@icons-pack/react-simple-icons'

const SKILLS: { field: string; skills: { skill: string; icon: IconType }[] }[] =
  [
    {
      field: 'Frontend',
      skills: [
        { skill: 'html', icon: SiHtml5 },
        { skill: 'css', icon: SiCss3 },
        { skill: 'javascript', icon: SiJavascript },
        { skill: 'typescript', icon: SiTypescript },
        { skill: 'react', icon: SiReact },
        { skill: 'nextjs', icon: SiNextdotjs },
        { skill: 'tailwind', icon: SiTailwindcss },
        {
          skill: 'bootstrap',
          icon: SiBootstrap,
        },
        {
          skill: 'elementor',
          icon: SiElementor,
        },
      ],
    },
    {
      field: 'Backend',
      skills: [
        {
          skill: 'nodejs',
          icon: SiNodedotjs,
        },
        {
          skill: 'postgresql',
          icon: SiPostgresql,
        },
        {
          skill: 'mongodb',
          icon: SiMongodb,
        },
        {
          skill: 'mysql',
          icon: SiMysql,
        },
        {
          skill: 'prisma',
          icon: SiPrisma,
        },
        {
          skill: 'wordpress',
          icon: SiWordpress,
        },
        {
          skill: 'strapi',
          icon: SiStrapi,
        },
      ],
    },
  ]

export default SKILLS
