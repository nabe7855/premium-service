/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← これを追加
  ],
  theme: {
    extend: {
      colors: {
              'strawberry-primary': '#FF66A3',
              'strawberry-bg': '#FFF0F5',         // 背景用
              'strawberry-text': '#FF1493',       // テキスト用
            },

    },
  },
  plugins: [],
}

