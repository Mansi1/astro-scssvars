import type { AdditionalOption, SCSSVarsOption } from '.'

import { join } from 'path'

import { readConfigFile } from '@jsheaven/read-config-file'

export const getVariables = async (integrationOption: SCSSVarsOption, additionalOptions: AdditionalOption) => {
  try {
    return await readConfigFile({
      configFilePath: join(additionalOptions.rootDirectory, integrationOption.variablesFile),
    })
  } catch (e) {
    additionalOptions.logger.error(e, { timestamp: true })
    additionalOptions.logger.error(
      "Error reading variable file, have to have an default export and have to run with node options NODE_OPTIONS='--experimental-vm-modules'",
      { timestamp: true },
    )
  }
}
