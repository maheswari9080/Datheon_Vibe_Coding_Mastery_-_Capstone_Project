"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Profile } from "@/types/database";

export interface UserSession {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserSession | null;
  profile: Profile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signUp: (email: string, password?: string, displayName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default demo session for zero-friction exploration
const DEMO_USER: UserSession = {
  id: "cf-user-001-demo",
  email: "creator@creatorflow.ai",
  displayName: "Alex Rivera (Demo Creator)",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    async function initAuth() {
      if (isConfigured) {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const u = session.user;
            const sessionUser: UserSession = {
              id: u.id,
              email: u.email || "",
              displayName: u.user_metadata?.display_name || u.email?.split("@")[0] || "Creator",
              avatarUrl: u.user_metadata?.avatar_url,
            };
            setUser(sessionUser);
            setProfile({
              id: u.id,
              display_name: sessionUser.displayName,
              avatar_url: sessionUser.avatarUrl,
              created_at: u.created_at,
              updated_at: u.updated_at || u.created_at,
            });
          }
        } catch (e) {
          console.error("Supabase auth session fetch error:", e);
        }
      } else {
        // Local mode session check
        const localSession = localStorage.getItem("creatorflow_session");
        if (localSession) {
          try {
            const parsed = JSON.parse(localSession);
            setUser(parsed);
            setProfile({
              id: parsed.id,
              display_name: parsed.displayName,
              avatar_url: parsed.avatarUrl,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          } catch {
            localStorage.removeItem("creatorflow_session");
          }
        } else {
          // Auto-initiate demo user for frictionless review
          setUser(DEMO_USER);
          setProfile({
            id: DEMO_USER.id,
            display_name: DEMO_USER.displayName,
            avatar_url: DEMO_USER.avatarUrl,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
      setIsLoading(false);
    }

    initAuth();
  }, [isConfigured]);

  const signIn = async (email: string, password?: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    if (isConfigured) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || "password123",
      });

      if (error) {
        setIsLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        const sessionUser: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          displayName: data.user.user_metadata?.display_name || email.split("@")[0],
        };
        setUser(sessionUser);
      }
    } else {
      // Local simulated session
      const newUser: UserSession = {
        id: "cf-user-" + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split("@")[0],
      };
      localStorage.setItem("creatorflow_session", JSON.stringify(newUser));
      setUser(newUser);
      setProfile({
        id: newUser.id,
        display_name: newUser.displayName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    setIsLoading(false);
    return {};
  };

  const signUp = async (
    email: string,
    password?: string,
    displayName?: string
  ): Promise<{ error?: string }> => {
    setIsLoading(true);
    if (isConfigured) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password || "password123",
        options: {
          data: {
            display_name: displayName || email.split("@")[0],
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        const sessionUser: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          displayName: displayName || email.split("@")[0],
        };
        setUser(sessionUser);
      }
    } else {
      const newUser: UserSession = {
        id: "cf-user-" + Math.random().toString(36).substring(2, 9),
        email,
        displayName: displayName || email.split("@")[0],
      };
      localStorage.setItem("creatorflow_session", JSON.stringify(newUser));
      setUser(newUser);
      setProfile({
        id: newUser.id,
        display_name: newUser.displayName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    setIsLoading(false);
    return {};
  };

  const signOut = async () => {
    setIsLoading(true);
    if (isConfigured) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    localStorage.removeItem("creatorflow_session");
    setUser(null);
    setProfile(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isConfigured,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
