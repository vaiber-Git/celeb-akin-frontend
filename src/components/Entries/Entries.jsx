const Entries = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">
        {`Hey! ${name.toUpperCase()}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

export default Entries;
