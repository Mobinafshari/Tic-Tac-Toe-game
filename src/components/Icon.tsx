import { LuCross } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";


type Props = {
  player : "one" | "two"
}
function Icon({player} : Props) {

  if (player === "one" ) return <LuCross style={{color : "blue"}}/>;
  if (player === "two" ) return <FaRegCircle style={{ color: "red" }} />;

  return null;
}

export default Icon;
