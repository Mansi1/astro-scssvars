import type { SCSSVarsOption } from '.'

export const createCss = ({ variables }: SCSSVarsOption): Array<string> => {
  const fileLines = ['/* this file is generated */', ':root {']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`  --${key}: ${value};`)
  })
  fileLines.push('}')
  return fileLines
}
