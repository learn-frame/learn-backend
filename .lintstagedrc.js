export default {
  'apps/*.{js,jsx,ts,tsx}': ['pnpm run format', 'pnpm run lint'],
  'libs/*.{js,jsx,ts,tsx}': ['pnpm run format', 'pnpm run lint'],
}
