import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface DreamAvatarProps {
  isActive: boolean;
  avatarId?: number;
  onAvatarChange?: (id: number) => void;
}

const avatars = [
  {
    id: 1,
    name: "Luna",
    description: "Mystical dream guide",
    image: "/placeholder.svg",
    fallback: "🌙",
    color: "from-dream-purple to-dream-indigo",
  },
  {
    id: 2,
    name: "Stella",
    description: "Cosmic wisdom keeper",
    image: "/placeholder.svg", 
    fallback: "⭐",
    color: "from-dream-blue to-dream-pink",
  },
  {
    id: 3,
    name: "Aurora",
    description: "Ethereal interpreter",
    image: "/placeholder.svg",
    fallback: "🌈",
    color: "from-dream-pink to-dream-purple",
  },
];

export function DreamAvatar({ isActive, avatarId = 1, onAvatarChange }: DreamAvatarProps) {
  const [isBreathing, setIsBreathing] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarId);

  const currentAvatar = avatars.find(a => a.id === selectedAvatar) || avatars[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathing(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
    onAvatarChange?.(id);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Selection */}
      {onAvatarChange && (
        <div className="flex space-x-4">
          {avatars.map((avatar) => (
            <motion.button
              key={avatar.id}
              onClick={() => handleAvatarSelect(avatar.id)}
              className={`
                relative p-1 rounded-full transition-all duration-300
                ${selectedAvatar === avatar.id 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                  : 'hover:ring-1 hover:ring-primary/50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`
                w-12 h-12 rounded-full bg-gradient-to-br ${avatar.color} 
                flex items-center justify-center text-lg
              `}>
                {avatar.fallback}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Avatar */}
      <motion.div
        className="relative"
        animate={{
          scale: isActive ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: isBreathing ? 2 : 0.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className={`
            relative w-32 h-32 rounded-full overflow-hidden
            bg-gradient-to-br ${currentAvatar.color}
            ${isActive ? 'dream-glow' : ''}
          `}
          animate={{
            boxShadow: isActive 
              ? [
                  "0 0 20px hsl(var(--dream-glow) / 0.3)",
                  "0 0 40px hsl(var(--dream-glow) / 0.5)",
                  "0 0 20px hsl(var(--dream-glow) / 0.3)",
                ]
              : "0 0 10px hsl(var(--dream-glow) / 0.2)",
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <Avatar className="w-full h-full">
            <AvatarImage src={currentAvatar.image} alt={currentAvatar.name} />
            <AvatarFallback className={`
              text-4xl bg-gradient-to-br ${currentAvatar.color}
              border-0
            `}>
              {currentAvatar.fallback}
            </AvatarFallback>
          </Avatar>

          {/* Speaking indicator */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.1, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating particles */}
        <AnimatePresence>
          {isActive && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/60 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i / 6) * Math.PI * 2) * 60,
                    y: Math.sin((i / 6) * Math.PI * 2) * 60,
                  }}
                  exit={{
                    scale: 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Avatar Info */}
      <motion.div
        className="text-center"
        animate={{
          opacity: isActive ? [0.7, 1, 0.7] : 0.7,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <h3 className="font-semibold text-lg text-primary">{currentAvatar.name}</h3>
        <p className="text-sm text-muted-foreground">{currentAvatar.description}</p>
      </motion.div>
    </div>
  );
}
