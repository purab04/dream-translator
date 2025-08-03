import { motion } from "framer-motion";
import { Moon, BookOpen, Home, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dream Interpreter", icon: Home },
    { path: "/journal", label: "Dream Journal", icon: BookOpen },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-8 h-8 text-transparent bg-gradient-to-br from-violet-400 to-indigo-600 bg-clip-text" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
              Dream Translator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-full
                      ${isActive 
                        ? 'bg-gradient-to-r from-dream-purple to-dream-blue text-white' 
                        : 'hover:bg-background/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`
                      p-2 rounded-full
                      ${isActive 
                        ? 'bg-gradient-to-r from-dream-purple to-dream-blue text-white' 
                        : 'hover:bg-background/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 10px hsl(var(--dream-glow) / 0.2)",
                "0 0 20px hsl(var(--dream-glow) / 0.4)", 
                "0 0 10px hsl(var(--dream-glow) / 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
          >
            <Button
              size="sm"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-dream-purple to-dream-blue rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span>Premium</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
