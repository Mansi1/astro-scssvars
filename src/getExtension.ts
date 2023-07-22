export const getExtension = (filePath: string) => {
  if (filePath.indexOf('.') === -1) {
    throw new Error('Output file does not have an allowed extension')
  }
  const parts = filePath.split('.')
  return parts[parts.length - 1]
}
