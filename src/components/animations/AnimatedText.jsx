import { motion } from 'framer-motion';

export default function AnimatedText({ text, delay = 0, className }) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.07,
            duration: 0.45,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
