module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        balatro: {
          mult: "#FE5F55",
          chips: "#009dff",
          money: "#f3b958",
          filter: "#ff9a00",
          attention: "#ff9a00",
          green: "#4BC292",
          "pale-green": "#56a887",
          orange: "#fda200",
          gold: "#eac058",
          purple: "#8867a5",
          black: "#374244",
          "light-black": "#4f6367",
          grey: "#5f7377",
          joker: "#708b91",
          tarot: "#a782d1",
          planet: "#13afce",
          spectral: "#4584fa",
          voucher: "#fd682b",
          edition: "#4ca893",
          enhanced: "#8389DD",
          red: "#ff4c40",
          redshadow: "#a92b23",
          transparentblack: "#00000060",
          lightgrey: "#b9c2d2",
          lightgreyshadow: "#777e89",
          buttonshadow: "#1e2f32",
          cardholdershadow: "#0b1415",
        },
      },
      fontFamily: {
        game: ["m6x11plus", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".shadow-lightgrey": {
          "box-shadow": "0 8px 0 -2px #777e89",
          transform: "translateY(-4px)",
          "margin-bottom": "4px",
        },
        ".shadow-red": {
          "box-shadow": "0 8px 0 -2px #a92b23",
          transform: "translateY(-4px)",
          "margin-bottom": "4px",
        },
        ".shadow-black": {
          "box-shadow": "0 8px 0 -2px #374244",
          transform: "translateY(-4px)",
          "margin-bottom": "4px",
        },
        ".shadow-cardholder": {
          "box-shadow": "0 8px 0 -2px #0b1415",
          transform: "translateY(-4px)",
          "margin-bottom": "4px",
        },
        ".shadow-button": {
          "box-shadow": "0 8px 0 -2px #1e2f32",
          transform: "translateY(-4px)",
          "margin-bottom": "4px",
        },
        ".text-shadow-pixel": {
          "text-shadow": "0 2px 0 rgba(0, 0, 0, 0.5)",
        },
        ".pixelated": {
          "image-rendering": "pixelated",
        },
        ".pixel-corners": {
          "clip-path": `
            polygon(
         0px calc(100% - 24px),
    6px calc(100% - 24px),
    6px calc(100% - 12px),
    12px calc(100% - 12px),
    12px calc(100% - 6px),
    24px calc(100% - 6px),
    24px 100%,
    calc(100% - 24px) 100%,
    calc(100% - 24px) calc(100% - 6px),
    calc(100% - 12px) calc(100% - 6px),
    calc(100% - 12px) calc(100% - 12px),
    calc(100% - 6px) calc(100% - 12px),
    calc(100% - 6px) calc(100% - 24px),
    100% calc(100% - 24px),
    100% 24px,
    calc(100% - 6px) 24px,
    calc(100% - 6px) 12px,
    calc(100% - 12px) 12px,
    calc(100% - 12px) 6px,
    calc(100% - 24px) 6px,
    calc(100% - 24px) 0px,
    24px 0px,
    24px 6px,
    12px 6px,
    12px 12px,
    6px 12px,
    6px 24px,
    0px 24px
            )
          `,
        },
        ".pixel-corners-small": {
          "clip-path": `
            polygon(
 0px calc(100% - 8px),
  0px calc(100% - 4px),
    4px calc(100% - 4px),
    4px 100%,
    calc(100% - 4px) 100%,
    calc(100% - 4px) calc(100% - 4px),
    100% calc(100% - 4px),
    100% 4px,
    calc(100% - 4px) 4px,
    calc(100% - 4px) 0px,
    4px 0px,
    4px 4px,
    0px 4px
            )
          `,
        },
      });
    },
  ],
};
