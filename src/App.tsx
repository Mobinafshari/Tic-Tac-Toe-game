import { Toaster } from "react-hot-toast";
import Dooz from "./components/Dooz";
import { ContextProvider } from "./context/mainContext";
import styles from "./styles/index.module.scss";
import GameHistory from "./components/History/GameHistory";

function App() {
  return (
    <ContextProvider>
      <section className={styles["parent"]}>
        <GameHistory />
        <Dooz />
      </section>
      <Toaster />
    </ContextProvider>
  );
}

export default App;
