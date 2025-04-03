import styles from './styles.module.css';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container(props: ContainerProps) {
  const { container, content } = styles;
  return (
    <div className={container}>
      <div className={content}>{props.children}</div>
    </div>
  );
}
