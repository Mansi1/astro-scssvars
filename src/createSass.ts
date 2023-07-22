import type { SCSSVarsOption } from '.'

export const createSass = ({ variables }: SCSSVarsOption): Array<string> => {
  const fileLines = ['/* this file is generated */', ':root ']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`  --${key}: ${value};`)
  })
  fileLines.push('')
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`$${key}: ${value}`)
  })
  return fileLines
}
