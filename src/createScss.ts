import { createCss } from './createCss'

export const createScss = (variables: Record<string, any>): Array<string> => {
  const fileLines = ['/* sass variables */']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`$${key}: ${value};`)
  })

  return [...createCss(variables), '', ...fileLines]
}
