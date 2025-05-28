import type { Linter } from 'eslint'

declare const flat: {
  noRestrictedImportsRules: {
    patterns: string[]
    paths: [
      {
        name: string
        importNames: string[]
        message: string
      }
    ]
  }
  configs: Record<'all' | 'recommended' | 'react' | 'prettier', Linter.Config[]>
}

export = flat
