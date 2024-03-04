import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Loader from "./components/Loader";
import { updateText } from "./redux/slices/translateSlice";
const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);
  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();
  //console.log(langState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  //diziyi react-select sitesindeki istenen formatta value ve label istendiği için  code ve name degerlerini cevirmek gerekiyor

  //use Memo kullanarak bileşenin her yenilemede render edilmesini önledik
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages] //bos diziye verileri tanıttık
  );
  //console.log(langState.languages);

  //değişme fonksiyonu
  const handleChange = () => {
    //select alanlarındaki degerleri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    //text alanalrındaki veriyi değiştir
    setText(translateState.text);

    //slice daki text degerini güncelle
    dispatch(updateText(text));
  };
  return (
    <div className="bg-slate-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className=" text-center text-4xl font-semibold mb-7 ">
          Translation App
        </h1>
        {/* Üst alan */}
        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />
          <button
            onClick={handleChange}
            className="bg-zinc-700 py-2 px-6 rounded transition hover:ring-2 hover:bg-zinc-800 text-white "
          >
            Değiş
          </button>
          <Select
            value={targetLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
          />
        </div>
        {/* Text alanları */}
        <div className="flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            />
          </div>
          <div className="relative flex-1">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            />
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        {/* button */}
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
