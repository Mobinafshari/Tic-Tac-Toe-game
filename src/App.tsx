import { Toaster } from "react-hot-toast";
import Dooz from "./components/Dooz";
import { ContextProvider } from "./context/mainContext";
import styles from "./styles/index.module.scss";

function App() {
  return (
    <ContextProvider>
      <section className={styles["parent"]}>
        <Dooz />
      </section>
      <Toaster />
    </ContextProvider>
  );
}

export default App;
