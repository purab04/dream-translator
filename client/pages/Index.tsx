import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Moon, Zap, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { CosmicBackground } from "../components/CosmicBackground";
import { VoiceInput } from "../components/VoiceInput";
import { DreamAvatar } from "../components/DreamAvatar";
import { DreamLoadingScreen } from "../components/DreamLoadingScreen";

interface DreamInterpretation {
  text: string;
  isLoading: boolean;
}

export default function Index() {
  const [dreamText, setDreamText] = useState("");
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");

  const handleDreamSubmit = async () => {
    if (!dreamText.trim()) return;

    setInterpretation({ text: "", isLoading: true });

    // Simulate AI processing
    setTimeout(() => {
      const mockInterpretation = `Your dream reveals a journey of transformation and self-discovery. The imagery you described suggests a deep longing for change and growth in your life. The symbols present indicate that you are ready to embrace new opportunities and trust your intuition. This dream is encouraging you to step into your power and pursue the path that truly resonates with your soul.`;
      
      setInterpretation({ text: mockInterpretation, isLoading: false });
    }, 3000);
  };

  const handleVoiceText = (text: string) => {
    setDreamText(text);
  };

  const handleSaveToJournal = () => {
    // Here you would typically save to a backend/database
    // For now, we'll just show success and redirect
    alert("Dream saved to your journal! 🌙✨");
    // You could also use toast notification instead
  };

  const isLoading = interpretation?.isLoading;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      <DreamLoadingScreen isVisible={isLoading} message="Consulting the cosmic wisdom..." />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mr-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Moon className="w-10 h-10 text-transparent bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 bg-clip-text" />
            </motion.div>

            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight relative z-10">
                <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Dream
                </span>
                {' '}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                  Translator
                </span>
              </h1>

              {/* Premium glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 blur-xl rounded-lg" />

              {/* Subtle accent line */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              />
            </div>

            <motion.div
              className="ml-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Sparkles className="w-10 h-10 text-transparent bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 bg-clip-text" />
            </motion.div>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Unlock the mysteries of your subconscious. Share your dreams and receive 
            profound interpretations from our AI dream guide.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!interpretation ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-2xl p-8 md:p-12 dream-glow"
              >
                {/* Input Mode Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="glass-effect rounded-full p-1 flex">
                    <Button
                      variant={inputMode === "text" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setInputMode("text")}
                      className="rounded-full px-6"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button
                      variant={inputMode === "voice" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setInputMode("voice")}
                      className="rounded-full px-6"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Voice
                    </Button>
                  </div>
                </div>

                {/* Input Area */}
                <AnimatePresence mode="wait">
                  {inputMode === "text" ? (
                    <motion.div
                      key="text-input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-3 text-dream-purple">
                          Describe Your Dream
                        </label>
                        <Textarea
                          value={dreamText}
                          onChange={(e) => setDreamText(e.target.value)}
                          placeholder="I was walking through a forest filled with glowing butterflies. The trees seemed to whisper secrets as I passed by. There was a mysterious door at the end of the path..."
                          className="min-h-[120px] bg-background/50 border-cosmic-600 focus:border-dream-purple resize-none text-lg"
                          disabled={isLoading}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="voice-input"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="py-8"
                    >
                      <VoiceInput onVoiceText={handleVoiceText} isDisabled={isLoading} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Button
                    onClick={handleDreamSubmit}
                    disabled={!dreamText.trim() || isLoading}
                    className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-dream-purple to-dream-blue hover:from-dream-purple/90 hover:to-dream-blue/90 transition-all duration-300 dream-glow"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Interpret My Dream
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="interpretation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Dream Summary */}
                <motion.div
                  className="glass-effect rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-dream-purple mb-3">Your Dream</h3>
                  <p className="text-muted-foreground">{dreamText}</p>
                </motion.div>

                {/* Interpretation */}
                <motion.div
                  className="glass-effect rounded-2xl p-8 dream-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Avatar */}
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <DreamAvatar isActive={!isLoading} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="flex items-center mb-6">
                        <Moon className="w-6 h-6 text-dream-purple mr-3" />
                        <h3 className="text-xl font-semibold">Dream Interpretation</h3>
                      </div>

                      <AnimatePresence>
                        {isLoading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center py-12"
                          >
                            <motion.div
                              className="w-16 h-16 border-4 border-dream-purple/30 border-t-dream-purple rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.p
                              className="mt-6 text-lg text-muted-foreground"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Consulting the cosmic wisdom...
                            </motion.p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="interpretation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                          >
                            <motion.p
                              className="text-lg leading-relaxed"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            >
                              {interpretation.text}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                {!isLoading && (
                  <motion.div
                    className="flex justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Button
                      onClick={() => {
                        setInterpretation(null);
                        setDreamText("");
                      }}
                      variant="outline"
                      className="px-6"
                    >
                      Interpret Another Dream
                    </Button>
                    <Button
                      onClick={handleSaveToJournal}
                      className="px-6 bg-gradient-to-r from-dream-purple to-dream-blue"
                    >
                      Save to Journal
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
