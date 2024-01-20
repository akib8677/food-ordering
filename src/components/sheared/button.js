

const Button = ({label, iconLeft, onClick, styleName, icon, disabled, type}) => {
  return (
    <button onClick={onClick} className={styleName} type={type} disabled={disabled}>
      {iconLeft} {label} {icon}
    </button>
  )
}

export default Button
