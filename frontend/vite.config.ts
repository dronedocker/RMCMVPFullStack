import vue from '@vitejs/plugin-vue'
import path from 'path'
import { ConfigEnv, defineConfig, UserConfigExport } from 'vite'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import eslintPlugin from 'vite-plugin-eslint'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { viteVConsole } from 'vite-plugin-vconsole'

export default ({ command, mode }: ConfigEnv): UserConfigExport =>
  defineConfig({
    plugins: [
      vue(),
      eslintPlugin({ fix: true }),
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()],
      }),
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteVConsole({
        entry: path.resolve(__dirname, './src/main.ts'),
        localEnabled: command === 'serve',
        config: {
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
      PkgConfig(),
      OptimizationPersist(),
    ],
    server: {
      open: true,
      host: '0.0.0.0',
      port: 8080,
    },
    envDir: './env',
    resolve: {
      alias: [
        {
          find: '/@',
          replacement: path.resolve(__dirname, './src'),
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, './src'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import \"./src/styles/variables\";',
        },
      },
    },
    base: '/',
    build: {
      target: 'es2020', // Fix for Mapbox GL JS (BigInt support)
      sourcemap: true,
    },
  })
