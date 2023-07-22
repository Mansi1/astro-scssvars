import type { AstroIntegration } from 'astro'
import type { LogLevel, Logger } from 'vite'

import { join } from 'path'
import { validate } from './validate'
import { createLogger } from 'vite'
import { createScss } from './createScss'
import { getExtension } from './getExtension'
import { create } from './create'

const INTEGRATION_NAME = 'scssvars'

export type SCSSVarsOption = {
  variables: Record<string, string | number>
  watchFile: string
  outputFile: string
  logLevel?: LogLevel
}

export type AdditionalOption = {
  rootDirectory: string
  extension: string
  logger: Logger
}
export default (integrationOptions: SCSSVarsOption): AstroIntegration => {
  const extension = getExtension(integrationOptions.outputFile)

  const logger = createLogger(integrationOptions.logLevel || 'info', {
    prefix: `[${INTEGRATION_NAME}]`,
  })

  const rootDirectory = process.cwd()

  const additionalOptions: AdditionalOption = { rootDirectory, logger, extension }

  validate(integrationOptions, additionalOptions)

  return {
    name: INTEGRATION_NAME,
    hooks: {
      'astro:server:setup': (options): void | Promise<void> => {
        options.server.watcher.on('change', (path) => {
          if (path === join(rootDirectory, integrationOptions.watchFile)) {
            create(integrationOptions, additionalOptions)
          }
        })
      },
      'astro:config:done': async () => {
        create(integrationOptions, additionalOptions)
      },
      'astro:build:setup': async () => {
        create(integrationOptions, additionalOptions)
      },
    },
  }
}
