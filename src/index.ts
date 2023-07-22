import type { AstroIntegration } from 'astro'
import type { Logger } from 'vite'

import { join } from 'path'
import { validate } from './validate'
import { createLogger } from 'vite'
import { getExtension } from './getExtension'
import { create } from './create'

export const INTEGRATION_NAME = 'scssvars'

export type SCSSVarsOption = {
  variablesFile: string
  outputFile: string
}

export type AdditionalOption = {
  rootDirectory: string
  extension: string
  logger: Logger
}
export default (integrationOptions: SCSSVarsOption): AstroIntegration => {
  const extension = getExtension(integrationOptions.outputFile)

  const logger = createLogger('info', {
    prefix: `[${INTEGRATION_NAME}]`,
  })

  const rootDirectory = process.cwd()

  const additionalOptions: AdditionalOption = { rootDirectory, logger, extension }

  validate(integrationOptions, additionalOptions)

  return {
    name: INTEGRATION_NAME,
    hooks: {
      'astro:server:setup': (options): void | Promise<void> => {
        options.server.watcher.on('change', async (path) => {
          if (path === join(rootDirectory, integrationOptions.variablesFile)) {
            await create(integrationOptions, additionalOptions)
          }
        })
      },
      'astro:config:done': async () => {
        await create(integrationOptions, additionalOptions)
      },
      'astro:build:setup': async () => {
        await create(integrationOptions, additionalOptions)
      },
    },
  }
}
