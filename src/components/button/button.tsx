type info = {
    title: string
    textColor: string
    background: string
    
  }
  
  const Button = (props: info) => {
    return (
      <button className="bg-[{props.background}]">
        {props.title}
      </button>
    )
  }
  
  export default Button