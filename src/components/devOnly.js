const DevOnly = ({children}) => {
  return <>{process.env.NODE_ENV === "production" ? undefined : children}</>;
}

export default DevOnly;
