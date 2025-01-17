import { lazy, Suspense, SVGProps } from "react";

const icons = {
  Cross: lazy(() => import("./icons/cross-icon.svg?react")),
  O: lazy(() => import("./icons/O-icon.svg?react")),
};

type CustomIcon = {
  icon: keyof typeof icons;
  svgProps?: SVGProps<SVGSVGElement>;
};
const CustomIcon = ({ icon, svgProps }: CustomIcon) => {
  const Icon = icons[icon];
  return (
    <Suspense>
      <Icon {...svgProps} ref={null} />
    </Suspense>
  );
};

export default CustomIcon;
