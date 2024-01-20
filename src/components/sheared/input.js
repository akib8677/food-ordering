const Input = ({ type,className, name, label, value, onChange, placeholder, disabled }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        name={name}
        disabled={disabled}
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
