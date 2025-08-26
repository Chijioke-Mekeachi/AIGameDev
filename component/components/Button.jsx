"useClient"
export function Button({Text, onClick}){
    return(
        <div>
          <button onClick={onClick} type="button" className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-blue-500 text-white font-bold p-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out shadow-[0_0_10px_10px] text-3xl w-full p-1 shadow-blue-300/50 ">{Text}</button>
        </div>
    )
}