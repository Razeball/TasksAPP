
//The possible color
type TaskColor = 'red' | 'blue' | 'green';
//the style for each color
const colorStyles = {
  red: {
    border: "border-red-400 shadow-red-400/30",
    bg: "bg-red-500/25",
  },
  blue: {
    border: "border-blue-400 shadow-blue-400/30",
    bg: "bg-blue-500/25",
  },
  green: {
    border: "border-green-400 shadow-green-400/30",
    bg: "bg-green-500/25",
  },
};

//by passing the color as argument it will return the style for that color
//if the color is invalid the default value would be red
export function getTaskStyle(color: TaskColor) {
  const styles = colorStyles[color] || colorStyles.red;
  return {
    cardBorder: styles.border,
    cardHeaderBg: styles.bg,
  };
}