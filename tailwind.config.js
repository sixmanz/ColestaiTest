/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                colestia: {
                    bg: '#201c1d',       // Deepest Black (from palette)
                    card: '#201c1d',

                    // The New Palette - Minimalist Refactor
                    purple: '#9501ff',   // Vibrant Purple (Primary)
                    magenta: '#c084fc',  // Lighter Purple (Highlights)
                    gold: '#c084fc',     // Replaced Gold with Light Purple
                    blue: '#273488',     // Deep Blue (Secondary)
                    white: '#FFFFFF',

                    // Gradients
                    'gradient-start': '#9501ff',
                    'gradient-mid': '#7e22ce', // Darker purple mid
                    'gradient-end': '#273488',
                }
            },
            fontFamily: {
                sans: ['Noto Sans Thai', 'Comfortaa', 'sans-serif'],
                display: ['Comfortaa', 'Noto Sans Thai', 'sans-serif'],
            },
            backgroundImage: {
                'colestia-gradient': 'linear-gradient(to right, #9501ff, #273488)',
            }
        },
    },
    plugins: [],
}
