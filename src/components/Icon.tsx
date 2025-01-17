import CustomIcon from "../assets/icons";

type Props = {
  player: "one" | "two";
};
function Icon({ player }: Props) {
  if (player === "one") return <CustomIcon icon="Cross"/>;
  if (player === "two") return <CustomIcon icon="O" />;

  return null;
}

export default Icon;
