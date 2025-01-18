import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
type Player = "one" | "two";

type Selected = {
  player: Player;
  index: number;
};
type contextType = {
  player: Player;
  handleSelect: (value: Selected) => void;
  selected: Selected[];
  getPlayerSelectedIndexes: (player: Player) => number[];
  reset: () => void;
  reseted: boolean;
  handleChosenPrev: (value: Selected) => void;
};
const PlayerContext = createContext<contextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("must wrap in a provider");
  return context;
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [player, setPlayer] = useState<Player>(() => {
    if (searchParams.get("player")) {
      return searchParams.get("player") as Player;
    }
    const player = (localStorage.getItem("player") as Player) ?? "one";
    return player;
  });
  const [selected, setSelected] = useState<Selected[]>(() => {
    if (searchParams.get("moves")) {
      return JSON.parse(searchParams.get("moves")!);
    }
    const moves = localStorage.getItem("moves");
    return moves ? JSON.parse(moves) : [];
  });
  useEffect(() => {
    const currentMoves = JSON.stringify(selected);
    const currentPlayer = player;

    const prevMoves = searchParams.get("moves");
    const prevPlayer = searchParams.get("player");

    if (currentMoves !== prevMoves || currentPlayer !== prevPlayer) {
      setSearchParams({ moves: currentMoves, player: currentPlayer });
      localStorage.setItem("moves", currentMoves);
      localStorage.setItem("player", currentPlayer);
    }
  }, [selected, player, setSearchParams, searchParams]);
  const [reseted, setReseted] = useState(false);
  const handleChange = useCallback(() => {
    setPlayer((prevPlayer) => (prevPlayer === "one" ? "two" : "one"));
  }, []);
  const handleSelect = useCallback(
    (playerChoice: Selected) => {
      setSelected((prev) => [...prev, playerChoice]);
      handleChange();
      setReseted(false);
    },
    [handleChange]
  );

  const handleChosenPrev = useCallback(
    (playerChoice: Selected) => {
      const chosenMove = selected.findIndex(
        (choice) => choice === playerChoice
      );
      setSelected(selected.slice(0, chosenMove + 1));
      setPlayer(playerChoice.player === "one" ? "two" : "one");
      setReseted(true);
    },
    [selected]
  );

  const getPlayerSelectedIndexes = useCallback(
    (player: Player): number[] => {
      return selected
        .filter((choice) => choice.player === player)
        .map((choice) => choice.index);
    },
    [selected]
  );
  const handleReset = useCallback(() => {
    setSelected([]);
    setReseted(true);
    setPlayer("one");
    localStorage.clear();
  }, []);
  return (
    <PlayerContext.Provider
      value={{
        player,
        handleSelect,
        selected,
        getPlayerSelectedIndexes,
        reset: handleReset,
        reseted,
        handleChosenPrev,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
