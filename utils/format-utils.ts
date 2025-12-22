export function formatFileNameAsTitle(fileName: string): string {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, ''); // remove file extension

    const withSpaces = withoutExtension
        .replace(/[-_]+/g, ' ')              // convert "-" or "_" to space
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // split camelCase or PascalCase

    return withSpaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim();
}
