import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // Assuming user is deploying to <username>.github.io directly. If it's a project page, this should be '/<repo-name>/'
})
