import { CommonComponentProps } from "../../interface";

const Container = ({ children, styles }: CommonComponentProps) => {
  return <div style={styles}>{children}</div>;
};

export default Container;
