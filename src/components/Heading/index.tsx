import styles from './styles.module.css';

type HeadingProps = {
  children: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  const { children } = props;
  const { heading } = styles;
  return <h1 className={heading}>{children}</h1>;
}
