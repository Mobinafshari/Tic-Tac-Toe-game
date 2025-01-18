import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

type Player = "one" | "two";

type Selected = {
  player: Player;
  index: number;
};

type ContextType = {
  player: Player;
  handleSelect: (value: Selected) => void;
  selected: Selected[];
  getPlayerSelectedIndexes: (player: Player) => number[];
  reset: () => void;
  reseted: boolean;
  handleChosenPrev: (value: Selected) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const PlayerContext = createContext<ContextType | undefined>(undefined);

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

  const [history, setHistory] = useState<Selected[][]>(() => {
    if (searchParams.get("moves")) {
      return [JSON.parse(searchParams.get("moves")!)];
    }
    const moves = localStorage.getItem("moves");
    return moves ? [JSON.parse(moves)] : [[]];
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [reseted, setReseted] = useState(false);

  const selected = useMemo(
    () => history[currentStep] ?? [],
    [history, currentStep]
  );
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

  const handleChange = useCallback(() => {
    setPlayer((prevPlayer) => (prevPlayer === "one" ? "two" : "one"));
  }, []);

  const handleSelect = useCallback(
    (playerChoice: Selected) => {
      const newHistory = history.slice(0, currentStep + 1);
      const newSelected = [...selected, playerChoice];
      setHistory([...newHistory, newSelected]);
      setCurrentStep(newHistory.length);
      handleChange();
      setReseted(false);
    },
    [history, currentStep, selected, handleChange]
  );

  const handleChosenPrev = useCallback(
    (playerChoice: Selected) => {
      const chosenMove = selected.findIndex(
        (choice) => choice === playerChoice
      );
      setHistory((prev) =>
        prev
          .slice(0, chosenMove + 2)
          
      );
      setPlayer(playerChoice.player === "one" ? "two" : "one");
      setReseted(true);
      setCurrentStep(playerChoice.index + 1);
    },
    [selected, currentStep]
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setPlayer((prevPlayer) => (prevPlayer === "one" ? "two" : "one"));
      setReseted(false);
    }
  }, [currentStep]);

  const redo = useCallback(() => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setPlayer((prevPlayer) => (prevPlayer === "one" ? "two" : "one"));
      setReseted(false);
    }
  }, [currentStep, history.length]);

  const getPlayerSelectedIndexes = useCallback(
    (player: Player): number[] => {
      return selected
        .filter((choice) => choice.player === player)
        .map((choice) => choice.index);
    },
    [selected]
  );

  const handleReset = useCallback(() => {
    setHistory([[]]);
    setCurrentStep(0);
    setPlayer("one");
    setReseted(true);
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
        undo,
        redo,
        canUndo: currentStep > 0,
        canRedo: currentStep < history.length - 1,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
