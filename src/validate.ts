import { join } from 'path'
import { existsSync } from 'fs'
import type { AdditionalOptions, SCSSVarsOptions } from '.'

export const validate = ({ watchFile }: SCSSVarsOptions, { rootDirectory, extension }: AdditionalOptions) => {
  const absoulteWatchFile = join(rootDirectory, watchFile)
  if (!existsSync(absoulteWatchFile)) {
    throw new Error(`Watch file does not exist ${watchFile}`)
  }
  if (extension !== 'css' && extension !== 'scss' && extension !== 'sass') {
    throw new Error(`output file wrong extension ${extension} expecting css | scss | sass`)
  }
}
