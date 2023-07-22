import type { SCSSVarsOption } from '.'
import { createCss } from './createCss'

export const createScss = (options: SCSSVarsOption): Array<string> => {
  const fileLines = ['/* sass variables */']
  Object.entries(options.variables).forEach(([key, value]) => {
    fileLines.push(`$${key}: ${value};`)
  })

  return [...createCss(options), '', ...fileLines]
}
