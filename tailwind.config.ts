import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'manda-blue': '#1e40af',
        'manda-green': '#059669',
        'manda-red': '#dc2626',
        'manda-gray': '#6b7280',
      },
    },
  },
  plugins: [],
}
export default config