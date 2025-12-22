"use client";

import { motion } from 'framer-motion';
import { Loader2, Building, Wrench, Bot } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white/90 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Animated Logo Container */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 rounded-full border-4 border-blue-200"></div>
          </motion.div>
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-2"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-blue-400"></div>
          </motion.div>
          
          {/* Inner Logo */}
          <div className="relative w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [-2, 2, -2]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Building className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <motion.h2 
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PT ATMI SOLO
          </motion.h2>
          
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Memuat Halaman...
          </motion.p>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </motion.div>

        {/* Floating Icons */}
        <div className="flex space-x-4">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0
            }}
          >
            <Wrench className="w-6 h-6 text-blue-500" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.3
            }}
          >
            <Bot className="w-6 h-6 text-blue-500" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.6
            }}
          >
            <Loader2 className="w-6 h-6 text-blue-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}