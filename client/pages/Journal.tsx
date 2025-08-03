import { motion } from "framer-motion";
import { BookOpen, Star, Calendar } from "lucide-react";
import { CosmicBackground } from "../components/CosmicBackground";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Journal() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-16 h-16 text-dream-purple" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-shimmer mb-6">
            Dream Journal
          </h1>
          
          <motion.div
            className="glass-effect rounded-2xl p-8 dream-glow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Star className="w-12 h-12 text-dream-blue mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Your Dream Archive</h2>
            <p className="text-muted-foreground mb-6">
              This is where your interpreted dreams will be saved. Create your first dream interpretation 
              to start building your personal dream archive and track patterns in your subconscious mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="px-6 py-3 bg-gradient-to-r from-dream-purple to-dream-blue">
                  <Calendar className="w-4 h-4 mr-2" />
                  Interpret a Dream
                </Button>
              </Link>
              
              <Button variant="outline" className="px-6 py-3" disabled>
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Archive (Coming Soon)
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
