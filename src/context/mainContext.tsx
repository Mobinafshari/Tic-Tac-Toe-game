import { createContext, ReactNode, useContext, useState } from "react";
type Player = "one" | "two";

type Selected = {
  player : Player ;
  index : number;
}
type contextType = {
  player: Player;
  handleSelect: (value: Selected) => void;
  selected: Selected[];
  getPlayerSelectedIndices: (player: Player) => number[];
  reset: () => void;
  reseted : boolean;
};
const PlayerContext = createContext<contextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("must wrap in a provider");
  return context;
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player>("one");
  const [selected , setSelected] = useState<Selected[]>([]);
  const [ reseted ,setReseted] = useState(false)
  const handleChange = () => {
    setPlayer((prevPlayer) => (prevPlayer === "one" ? "two" : "one"));
  };
  const handleSelect = (playerChoice : Selected) => {
    setSelected((prev) => [...prev , playerChoice]);
    handleChange()
  };

  const getPlayerSelectedIndices = (player: Player): number[] => {
    return selected
      .filter((choice) => choice.player === player)
      .map((choice) => choice.index);
  };
  const handleReset = () => {
    setSelected([]);
    setReseted(true);
    setPlayer("one");
  }
  return (
    <PlayerContext.Provider
      value={{
        player,
        handleSelect,
        selected,
        getPlayerSelectedIndices,
        reset: handleReset,
        reseted,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
