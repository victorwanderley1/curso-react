function Input(props) {
  return (
    //Pode usar os props assim
    //     <input
    //     type={props.type}
    //     placeholder={props.placeholder}
    //     className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
    //     value={props.value}
    //     onChange={props.onChange}
    //   />
    //Ou  assim:
    <input
      className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      {...props}
    />
  );
}

export default Input;
