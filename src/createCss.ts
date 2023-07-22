export const createCss = (variables: Record<string, any>): Array<string> => {
  const fileLines = [':root {']
  Object.entries(variables).forEach(([key, value]) => {
    fileLines.push(`  --${key}: ${value};`)
  })
  fileLines.push('}')
  return fileLines
}
