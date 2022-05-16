import { CircularProgress } from "@mui/material";

export function Loader(props) {
  return (
    <div
      className="loader"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Loader;
