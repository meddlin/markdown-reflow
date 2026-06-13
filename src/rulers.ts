export type EditorRuler = number | { column: number; color?: string; [key: string]: unknown }

export interface MaxLineLengthRulerSyncOptions {
  enabled: boolean
  maxLineLength: number
  previousManagedLineLength: number | undefined
}

export interface MaxLineLengthRulerSyncResult {
  rulers: EditorRuler[]
  managedLineLength: number | undefined
  changed: boolean
}

export function syncMaxLineLengthRulers(
  rulers: readonly EditorRuler[] | undefined,
  options: MaxLineLengthRulerSyncOptions,
): MaxLineLengthRulerSyncResult {
  let originalRulers = rulers ?? []
  let nextRulers = [...originalRulers]

  if (
    options.previousManagedLineLength !== undefined &&
    (!options.enabled || options.previousManagedLineLength !== options.maxLineLength)
  ) {
    nextRulers = removeOneNumericRuler(nextRulers, options.previousManagedLineLength)
  }

  if (!options.enabled) {
    return {
      rulers: nextRulers,
      managedLineLength: undefined,
      changed: !rulersAreEqual(originalRulers, nextRulers),
    }
  }

  if (hasRulerAtColumn(nextRulers, options.maxLineLength)) {
    let managedLineLength =
      options.previousManagedLineLength === options.maxLineLength &&
      hasNumericRulerAtColumn(nextRulers, options.maxLineLength)
        ? options.maxLineLength
        : undefined

    return {
      rulers: nextRulers,
      managedLineLength,
      changed: !rulersAreEqual(originalRulers, nextRulers),
    }
  }

  nextRulers.push(options.maxLineLength)

  return {
    rulers: nextRulers,
    managedLineLength: options.maxLineLength,
    changed: true,
  }
}

function removeOneNumericRuler(rulers: readonly EditorRuler[], column: number): EditorRuler[] {
  let removed = false
  return rulers.filter((ruler) => {
    if (!removed && ruler === column) {
      removed = true
      return false
    }

    return true
  })
}

function hasRulerAtColumn(rulers: readonly EditorRuler[], column: number): boolean {
  return rulers.some((ruler) => getRulerColumn(ruler) === column)
}

function hasNumericRulerAtColumn(rulers: readonly EditorRuler[], column: number): boolean {
  return rulers.some((ruler) => ruler === column)
}

function getRulerColumn(ruler: EditorRuler): number | undefined {
  return typeof ruler === 'number' ? ruler : ruler.column
}

function rulersAreEqual(a: readonly EditorRuler[], b: readonly EditorRuler[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  return a.every((ruler, index) => ruler === b[index])
}
