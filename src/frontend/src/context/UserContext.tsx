import { useActor } from "@/hooks/useActor";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserType {
  phone: string;
  name: string;
}

interface UserContextType {
  user: UserType | null;
  notificationsEnabled: boolean;
  setUser: (user: UserType) => void;
  clearUser: () => void;
  toggleNotifications: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { actor } = useActor();

  const [user, setUserState] = useState<UserType | null>(() => {
    try {
      const stored = localStorage.getItem("temple_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    () => {
      try {
        return localStorage.getItem("temple_notifications") !== "false";
      } catch {
        return true;
      }
    },
  );

  // When actor becomes available and user is logged in, restore backend preference
  useEffect(() => {
    if (actor && user) {
      actor
        .getUserNotificationPreference(user.phone)
        .then((pref) => {
          setNotificationsEnabled(pref);
          localStorage.setItem("temple_notifications", String(pref));
        })
        .catch(() => {});
    }
  }, [actor, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("temple_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("temple_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("temple_notifications", String(notificationsEnabled));
  }, [notificationsEnabled]);

  const setUser = (u: UserType) => {
    setUserState(u);
    if (actor) {
      actor
        .getUserNotificationPreference(u.phone)
        .then((pref) => {
          setNotificationsEnabled(pref);
          localStorage.setItem("temple_notifications", String(pref));
        })
        .catch(() => {});
    }
  };

  const clearUser = () => {
    setUserState(null);
    setNotificationsEnabled(true);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const next = !prev;
      if (actor && user) {
        actor.setNotificationPreference(user.phone, next).catch(() => {});
      }
      return next;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        notificationsEnabled,
        setUser,
        clearUser,
        toggleNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
