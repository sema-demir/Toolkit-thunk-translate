import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";

// asenkron thunk aksiyonları
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // apidan dil verilerini al
    const res = await axios.request(languageOptions);

    // aksiyonun payloadını belirle
    return res.data.data.languages;
  }
);
