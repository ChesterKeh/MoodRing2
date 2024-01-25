import AccountButton from "../AccountButton/AccountButton";

export default function Navbar({ user, setSelectedNavButton}) {
  const onNavButtonClick = (event) => {
    setSelectedNavButton(event.target.name);
  }

  return (
    <div>
      <button name="calendar" onClick={onNavButtonClick}>Calendar</button>
      <button name="journal" onClick={onNavButtonClick}>Journal</button>
      <AccountButton user={user}/>
    </div>
  );
}