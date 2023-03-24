export const getAttributes = (
  props: Record<string, string>,
  filters: string[] = [],
) =>
  Object.keys(props)
    .map((key) => {
      if (filters.includes(key) || key === 'className')
        return undefined
      const value = props[key]
      if (value === '')
        return key
      return `${key}="${value.replace(/"/g, '\'')}"`
    })
    .filter(Boolean)
    .join(' ')
