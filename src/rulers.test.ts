import { describe, expect, it } from 'vitest'

import { syncMaxLineLengthRulers } from './rulers'

describe('max line length ruler helpers', () => {
  it('adds a managed ruler to an empty ruler list', () => {
    expect(
      syncMaxLineLengthRulers([], {
        enabled: true,
        maxLineLength: 100,
        previousManagedLineLength: undefined,
      }),
    ).toEqual({
      rulers: [100],
      managedLineLength: 100,
      changed: true,
    })
  })

  it('keeps existing rulers and avoids duplicate columns', () => {
    expect(
      syncMaxLineLengthRulers([80, 100], {
        enabled: true,
        maxLineLength: 100,
        previousManagedLineLength: undefined,
      }),
    ).toEqual({
      rulers: [80, 100],
      managedLineLength: undefined,
      changed: false,
    })
  })

  it('removes only the managed ruler when disabled', () => {
    expect(
      syncMaxLineLengthRulers([80, 100, 120], {
        enabled: false,
        maxLineLength: 100,
        previousManagedLineLength: 100,
      }),
    ).toEqual({
      rulers: [80, 120],
      managedLineLength: undefined,
      changed: true,
    })
  })

  it('replaces the old managed ruler when the max line length changes', () => {
    expect(
      syncMaxLineLengthRulers([80, 100], {
        enabled: true,
        maxLineLength: 88,
        previousManagedLineLength: 100,
      }),
    ).toEqual({
      rulers: [80, 88],
      managedLineLength: 88,
      changed: true,
    })
  })

  it('leaves user rulers intact when the indicator is disabled', () => {
    expect(
      syncMaxLineLengthRulers([80, 100], {
        enabled: false,
        maxLineLength: 100,
        previousManagedLineLength: undefined,
      }),
    ).toEqual({
      rulers: [80, 100],
      managedLineLength: undefined,
      changed: false,
    })
  })

  it('does not claim ownership of an existing object ruler at the max column', () => {
    expect(
      syncMaxLineLengthRulers([{ column: 100, color: '#ff0000' }], {
        enabled: true,
        maxLineLength: 100,
        previousManagedLineLength: undefined,
      }),
    ).toEqual({
      rulers: [{ column: 100, color: '#ff0000' }],
      managedLineLength: undefined,
      changed: false,
    })
  })
})
