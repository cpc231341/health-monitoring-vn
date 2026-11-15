import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Os componentes não importam React: usam o runtime automático, como no build.
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'dist-electron/'
      ]
    }
  }
})
