"use client";

import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";

export default function ActivityMonitor() {
  const { data: session } = useSession();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const TIMEOUT_MS = 30 * 60 * 1000; 

  useEffect(() => {
    if (!session) return;

    const doLogout = () => {
      signOut({ callbackUrl: "/login" });
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(doLogout, TIMEOUT_MS);
    };

    const events = [
      "mousedown", 
      "mousemove", 
      "keydown",   
      "scroll",   
      "touchstart" 
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [session, TIMEOUT_MS]); 
  return null;
}