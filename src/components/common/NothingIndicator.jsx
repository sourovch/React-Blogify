import nothingIcon from "../../assets/icons/empty.svg";

function NothingIndicator() {
  return (
    <div className="min-h-[250px] flex flex-col items-center justify-center">
      <img src={nothingIcon} alt="nothing" />
      <div className="text-gray-300">Nothing is here!!</div>
    </div>
  );
}

export default NothingIndicator;
