import { join } from 'path'
import { existsSync } from 'fs'
import type { AdditionalOption, SCSSVarsOption } from '.'

export const validate = ({ watchFile }: SCSSVarsOption, { rootDirectory, extension }: AdditionalOption) => {
  const absoulteWatchFile = join(rootDirectory, watchFile)
  if (!existsSync(absoulteWatchFile)) {
    throw new Error(`Watch file does not exist ${watchFile}`)
  }
  if (extension !== 'css' && extension !== 'scss' && extension !== 'sass') {
    throw new Error(`output file wrong extension ${extension} expecting css | scss | sass`)
  }
}
