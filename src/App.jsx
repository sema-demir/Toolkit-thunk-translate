import { useDispatch, useSelector } from "react-redux";
import { getLanguages } from "./redux/actions/translateAction";
import { useEffect } from "react";

const App = () => {
  const langState = useSelector((store) => store.language);
  console.log(langState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  return (
    <div className="bg-slate-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className=" text-center text-4xl font-semibold mb-7 ">Çeviri</h1>
        {/* Üst alan */}
        <div className="flex gap-2 text-black">
          <select className="flex-1">
            <option value="">Seçenek</option>
          </select>
          <button className="bg-zinc-700 py-3 px-6 rounded transition hover:ring-2 hover:bg-zinc-800 text-white ">
            Değiş
          </button>
          <select className="flex-1">
            <option value="">Seçenek</option>
          </select>
        </div>
        {/* Text alanları */}
        <div className="flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3">
          <div className="flex-1">
            <textarea className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black" />
          </div>
          <div className="relative flex-1">
            <textarea className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black" />
          </div>
        </div>
        <button className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition">
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
