/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "surface-container-low": "#f6f2f7",
      "surface-container-high": "#eae7eb",
      "on-secondary-fixed-variant": "#404754",
      "on-primary-fixed-variant": "#783200",
      "on-error-container": "#93000a",
      "on-tertiary-fixed": "#002109",
      "tertiary-fixed-dim": "#4ae176",
      "inverse-surface": "#303033",
      outline: "#8c7164",
      "outline-variant": "#e0c0b1",
      primary: "#9d4300",
      "primary-container": "#f97316",
      "secondary-fixed-dim": "#c0c7d6",
      "secondary-fixed": "#dce2f3",
      "on-primary-fixed": "#341100",
      "on-error": "#ffffff",
      "surface-tint": "#9d4300",
      "on-tertiary": "#ffffff",
      "tertiary-fixed": "#6bff8f",
      error: "#ba1a1a",
      "on-secondary": "#ffffff",
      secondary: "#585f6c",
      "inverse-on-surface": "#f3f0f4",
      "surface-bright": "#fbf8fc",
      "inverse-primary": "#ffb690",
      "on-secondary-fixed": "#151c27",
      "on-background": "#1b1b1e",
      "on-surface": "#1b1b1e",
      "secondary-container": "#dce2f3",
      "error-container": "#ffdad6",
      background: "#fbf8fc",
      "on-primary-container": "#582200",
      "surface-container-lowest": "#ffffff",
      "primary-fixed": "#ffdbca",
      "surface-container": "#f0edf1",
      surface: "#fbf8fc",
      "on-primary": "#ffffff",
      "tertiary-container": "#00b251",
      tertiary: "#006e2f",
      "on-tertiary-fixed-variant": "#005321",
      "surface-dim": "#dcd9dd",
      "surface-variant": "#e4e1e6",
      "primary-fixed-dim": "#ffb690",
      "on-tertiary-container": "#003b16",
      "on-surface-variant": "#584237",
      "on-secondary-container": "#5e6572",
      "surface-container-highest": "#e4e1e6"
    },
    borderRadius: {
      DEFAULT: "1rem",
      lg: "2rem",
      xl: "3rem",
      full: "9999px"
    },
    spacing: {
      gutter: "24px",
      sm: "8px",
      "container-max": "1280px",
      lg: "24px",
      base: "8px",
      xs: "4px",
      xl: "32px",
      md: "16px",
      "2xl": "48px"
    },
    fontFamily: {
      "body-lg": ["Cairo", "sans-serif"],
      "headline-md": ["Cairo", "sans-serif"],
      "label-sm": ["Cairo", "sans-serif"],
      "label-bold": ["Tajawal", "sans-serif"],
      "headline-lg": ["Cairo", "sans-serif"],
      "body-md": ["Inter", "sans-serif"],
      "display-md": ["Tajawal", "sans-serif"],
      "display-lg": ["Tajawal", "sans-serif"],
      "label-md": ["Cairo", "sans-serif"],
      "headline-xl": ["Cairo", "sans-serif"]
    },
    fontSize: {
      "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "headline-md": ["18px", { lineHeight: "28px", fontWeight: "600" }],
      "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
      "label-bold": ["14px", { lineHeight: "1.0", fontWeight: "700" }],
      "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "700" }],
      "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "display-md": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
      "display-lg": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
      "label-md": ["14px", { lineHeight: "20px", fontWeight: "600" }],
      "headline-xl": ["32px", { lineHeight: "40px", fontWeight: "700" }]
    },
    animation: {
      'spin-slow': 'spin 20s linear infinite',
      'fade-in': 'fadeIn 0.5s ease-out',
      'scale-in': 'scaleIn 0.5s ease-out',
      'slide-up': 'slideUp 0.5s ease-out'
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      scaleIn: {
        '0%': { transform: 'scale(0.95)' },
        '100%': { transform: 'scale(1)' }
      },
      slideUp: {
        '0%': { transform: 'translateY(16px)' },
        '100%': { transform: 'translateY(0)' }
      }
    },
    backdropBlur: {
      'xs': '2px',
      'sm': '4px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '40px',
      '3xl': '64px'
    }
  },
  plugins: []
}
