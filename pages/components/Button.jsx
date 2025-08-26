"useClient"
export function Button({Text, onClick}){
    return(
        <div>
          <button onClick={onClick} type="button" className="text-2xl bg-blue-800 p-2 font-weight-bold w-full text-center text-black rounded-lg shadow-[0_0_10px_10px] shadow-blue-300/50 ">{Text}</button>
        </div>
    )
}