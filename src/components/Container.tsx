import type { FunctionComponent, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  classNames?: string;
}

const Container: FunctionComponent<ContainerProps> = ({ children, classNames = "" }): JSX.Element => {

  return (
    <div className={`m-auto max-w-xl bg-slate-200 ${classNames}`}>
      {children}
    </div>
  );
};

export default Container;