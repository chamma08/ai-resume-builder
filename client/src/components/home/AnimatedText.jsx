import { motion } from "framer-motion";

const AnimatedTitle = () => {
  // Split text into two lines
  const line1 = "Your next Job starts with";
  const line2 = "an AI-Powered Resume";
  
  // Define which text should have the red gradient
  const highlightText = "AI-Powered";

  // Animation variants for each letter
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Container variant to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Delay between each letter (adjust for speed)
      }
    }
  };

  const renderAnimatedText = (text, startIndex) => {
    return text.split("").map((char, index) => {
      const isHighlighted = text.substring(index).startsWith(highlightText) && 
                           index === text.indexOf(highlightText);
      const isPartOfHighlight = index >= text.indexOf(highlightText) && 
                                index < text.indexOf(highlightText) + highlightText.length &&
                                text.includes(highlightText);
      
      return (
        <motion.span
          key={`char-${startIndex + index}`}
          variants={letterVariants}
          className={`inline-block ${
            isPartOfHighlight
              ? "bg-linear-to-r from-red-900 to-red-800 bg-clip-text text-transparent"
              : ""
          }`}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      );
    });
  };

  return (
    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-clip-text text-transparent bg-linear-to-r from-[#AB8C95] via-[#000000] to-[#616161]"
      >
        {renderAnimatedText(line1, 0)}
        <br />
        {renderAnimatedText(line2, line1.length)}
      </motion.span>
    </h1>
  );
};

export default AnimatedTitle;