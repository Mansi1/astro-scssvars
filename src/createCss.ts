import type { SCSSVarsOption } from '.'

export const createCss = ({ variables }: SCSSVarsOption): Array<string> => {
  const fileLines = [':root {']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`  --${key}: ${value};`)
  })
  fileLines.push('}')
  return fileLines
}
