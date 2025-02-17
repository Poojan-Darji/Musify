import { createContext } from "react";
import { PlayerContextType } from "../types";

export const PlayerContext = createContext<PlayerContextType>(
    {} as PlayerContextType
);
