import Icon from "../assets/Icon.svg";
export default function Avatar() {
  return (
    <div className="avatar">
      <div className="ring-primary ring-offset-base-100 sm:w-44 lg:w-80 rounded-full ring-2 ring-offset-2">
        <img src={Icon} />
      </div>
    </div>
  );
}
