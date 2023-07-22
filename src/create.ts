import { INTEGRATION_NAME, type AdditionalOption, type SCSSVarsOption } from '.'

import { createCss } from './createCss'
import { createScss } from './createScss'
import { createSass } from './createSass'
import { getVariables } from './getVariables'
import { join } from 'path'
import { writeFileSync } from 'fs'

export const create = async (integrationOption: SCSSVarsOption, additionalOptions: AdditionalOption) => {
  const variables = await getVariables(integrationOption, additionalOptions)
  const lines: Array<string> = [
    `/* this file is generated with ${INTEGRATION_NAME} */`,
    '/* !!do not commit this file, add it to your ignore list!! */',
  ]
  if (additionalOptions.extension === 'css') {
    lines.push(...createCss(variables))
  } else if (additionalOptions.extension === 'scss') {
    lines.push(...createScss(variables))
  } else if (additionalOptions.extension === 'sass') {
    lines.push(...createSass(variables))
  } else {
    throw new Error('Error generating css output')
  }
  const absoluteOutputFilePath = join(additionalOptions.rootDirectory, integrationOption.outputFile)
  writeFileSync(absoluteOutputFilePath, lines.join('\n'))
}
