export const createSass = (variables: Record<string, any>): Array<string> => {
  const fileLines = [':root ']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`  --${key}: ${value}`)
  })
  fileLines.push('')
  fileLines.push('/* sass variables */')
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`$${key}: ${value}`)
  })
  return fileLines
}
