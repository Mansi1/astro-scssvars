import { join } from 'path'
import { existsSync } from 'fs'
import type { AdditionalOption, SCSSVarsOption } from '.'

export const validate = ({ variablesFile }: SCSSVarsOption, { rootDirectory, extension }: AdditionalOption) => {
  const absoulteVariablesFile = join(rootDirectory, variablesFile)
  if (!existsSync(absoulteVariablesFile)) {
    throw new Error(`Variables file does not exist ${variablesFile}`)
  }
  if (extension !== 'css' && extension !== 'scss' && extension !== 'sass') {
    throw new Error(`output file wrong extension ${extension} expecting css | scss | sass`)
  }
}
