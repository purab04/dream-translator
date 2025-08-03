import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Square } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

interface VoiceInputProps {
  onVoiceText: (text: string) => void;
  isDisabled?: boolean;
}

export function VoiceInput({ onVoiceText, isDisabled }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if speech recognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        if (transcript) {
          onVoiceText(transcript);
          setTranscript("");
        }
      };
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onVoiceText, transcript]);

  const startRecording = async () => {
    if (!recognitionRef.current || isDisabled) return;

    try {
      // Start speech recognition
      recognitionRef.current.start();
      setIsRecording(true);

      // Start audio visualization
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      updateAudioLevel();
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRecording(false);
    setAudioLevel(0);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="relative"
        animate={{ scale: isRecording ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={toggleRecording}
          disabled={isDisabled}
          className={`
            relative w-16 h-16 rounded-full border-2 transition-all duration-300
            ${isRecording 
              ? 'bg-destructive hover:bg-destructive/90 border-destructive shadow-lg dream-glow' 
              : 'bg-primary hover:bg-primary/90 border-primary/50 glass-effect'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Square className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Mic className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Audio level visualization */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ 
                scale: 1 + audioLevel * 0.5,
                opacity: 0.6 - audioLevel * 0.3
              }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>

        {/* Pulsing effect when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p
        className="text-sm text-muted-foreground text-center max-w-xs"
        animate={{ opacity: isRecording ? 1 : 0.7 }}
      >
        {isRecording ? "Listening... Speak your dream" : "Tap to record your dream"}
      </motion.p>

      {/* Live transcript preview */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-effect rounded-lg p-3 max-w-md text-sm text-center"
          >
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
