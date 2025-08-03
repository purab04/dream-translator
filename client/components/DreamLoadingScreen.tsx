import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star } from "lucide-react";

interface DreamLoadingScreenProps {
  isVisible: boolean;
  message?: string;
}

export function DreamLoadingScreen({ isVisible, message = "Interpreting your dream..." }: DreamLoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
        >
          <div className="relative">
            {/* Central loading element */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Rotating outer ring */}
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-dream-purple border-r-dream-blue rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Counter-rotating inner ring */}
              <motion.div
                className="absolute inset-2 border-2 border-transparent border-b-dream-pink border-l-dream-indigo rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Central icon */}
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl"
              >
                <Moon className="w-12 h-12 text-dream-purple" />
              </motion.div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-dream-blue rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * (60 + Math.sin(Date.now() / 1000) * 20),
                  y: Math.sin((i / 8) * Math.PI * 2) * (60 + Math.cos(Date.now() / 1000) * 20),
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Sparkle effects */}
            <motion.div
              className="absolute -top-8 -right-8"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <Sparkles className="w-6 h-6 text-dream-pink" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8"
              animate={{
                scale: [0, 1, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <Star className="w-5 h-5 text-dream-indigo" />
            </motion.div>

            {/* Bloom effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-dream-purple/20 to-dream-blue/20 blur-xl"
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.p
              className="text-lg font-medium text-center"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message}
            </motion.p>
            
            <motion.div
              className="flex justify-center mt-4 space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-dream-purple rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
