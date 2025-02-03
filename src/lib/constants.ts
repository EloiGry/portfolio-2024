import workpage from '../../messages/fr.json'

export const keys = Object.keys(workpage.Workpage).filter((key) =>
  key.startsWith('project_'),
)
