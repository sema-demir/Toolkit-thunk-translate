import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

// asenkron thunk aksiyonları
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // api'dan dil verilerini al
    const res = await axios.request(languageOptions);

    // aksiyonun payload'ını belirle
    return res.data.data.languages;
  }
);

// api ın çeviri uç noktasına istek at
export const translateText = createAsyncThunk(
  "translate/translateText",
  //actionu dispatch edreken gönderilen parametreler
  async (action_params) => {
    const { sourceLang, targetLang, text } = action_params;
    //gönderilecek parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    // axios ayarlarını belirle
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "e4f5ce1768msh41219fbd34033ffp143b1bjsn94b55b3d9b12",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    // isteği at
    const res = await axios.request(options);
    console.log(res.data);

    return res.data.data.translatedText;
  }
);
