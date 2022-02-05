import classNames from "classnames";

function Navbar(props) {
  return (
    <div
      id="header-container"
      className={classNames([
        "sticky",
        "top-0",
        "flex",
        "w-full",
        "bg-black",
        "justify-center",
        "items-center",
      ])}
    >
      <div className="inline-flex flex-1 mr-auto items-center"></div>
      <div className="text-center">
        <h1
          className={classNames([
            "text-2xl",
            "font-semibold",
            "roboto-mono",
            "tracking-wide",
            "text-white",
          ])}
        >
          CLIPPERS
        </h1>
      </div>
      <div className="flex-1 ml-auto"></div>
    </div>
  );
}

export default Navbar;
