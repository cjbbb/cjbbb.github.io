/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin-slow 12s linear infinite',
                'slide-up': 'slide-up 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            },
            keyframes: {
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'slide-up': {
                    '0%, 20%': { transform: 'translateY(0)' },
                    '25%, 45%': { transform: 'translateY(-100%)' },
                    '50%, 70%': { transform: 'translateY(-200%)' },
                    '75%, 100%': { transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
