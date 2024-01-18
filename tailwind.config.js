/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/cloud-equipment/src/**/*.{js,jsx,ts,tsx}',
    './apps/superadmin/src/**/*.{js,jsx,ts,tsx}',
    './libs/auth/src/**/*.{js,jsx,ts,tsx}',
    './libs/reports/src/**/*.{js,jsx,ts,tsx}',
    './libs/price/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope'],
      },
      colors: {
        'ce-green': '#0E5F50',
        'ce-lgreen': '#EEFFFC',
        greenText: '#54D4BD',
        blackText: '#40484F',
        greyText: '#8F9AA3',
        greyText2: '#667085',
        borderLine: '#EAECF0',
        primary: {
          100: '#0D5F50',
          150: '#54D4BD',
        },
        secondary: {
          100: '#32324D',
          150: ' #F3F3FF',
          200: '#EAECF0',
          250: '#1A1A1A',
          300: '#292929',
        },
        neutral: {
          100: '#DCDCE4',
        },
      },
      boxShadow: {
        buttonShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
        pageFormShadow: '0px 4px 15px 0px rgba(216, 210, 252, 0.15)',
      },
    },
  },
  plugins: [],
};
