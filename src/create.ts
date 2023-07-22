import { INTEGRATION_NAME, type AdditionalOption, type SCSSVarsOption } from '.'

import { createCss } from './createCss'
import { createScss } from './createScss'
import { createSass } from './createSass'
import { join } from 'path'
import { writeFileSync } from 'fs'
export const create = (integrationOption: SCSSVarsOption, { extension, rootDirectory }: AdditionalOption) => {
  const lines: Array<string> = [
    `/* this file is generated with ${INTEGRATION_NAME} */`,
    '/* !!do not commit this file, add it to your ignore list!! */',
  ]
  if (extension === 'css') {
    lines.push(...createCss(integrationOption))
  } else if (extension === 'scss') {
    lines.push(...createScss(integrationOption))
  } else if (extension === 'sass') {
    lines.push(...createSass(integrationOption))
  } else {
    throw new Error('Error generating css output')
  }
  const absoluteOutputFilePath = join(rootDirectory, integrationOption.outputFile)
  writeFileSync(absoluteOutputFilePath, lines.join('\n'))
}
