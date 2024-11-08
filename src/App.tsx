import { Toaster } from "react-hot-toast";
import Dooz from "./components/Dooz";
import { ContextProvider } from "./context/mainContext";
import styles from "./styles/index.module.scss";

function App() {
  return (
    <ContextProvider>
      <div className={styles["parent"]}>
        <Dooz />
      </div>
      <Toaster />
    </ContextProvider>
  );
}

export default App;
