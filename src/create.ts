import type { AdditionalOption, SCSSVarsOption } from '.'

import { createCss } from './createCss'
import { createScss } from './createScss'
import { createSass } from './createSass'
import { join } from 'path'
import { writeFileSync } from 'fs'

export const create = (integrationOption: SCSSVarsOption, { extension, rootDirectory }: AdditionalOption) => {
  let lines: Array<string>
  if (extension === 'css') {
    lines = createCss(integrationOption)
  } else if (extension === 'scss') {
    lines = createScss(integrationOption)
  } else if (extension === 'sass') {
    lines = createSass(integrationOption)
  } else {
    throw new Error('Error generating css output')
  }
  const absoluteOutputFilePath = join(rootDirectory, integrationOption.outputFile)
  writeFileSync(absoluteOutputFilePath, lines.join('\n'))
}
