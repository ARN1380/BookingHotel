import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function usePost({ url, newBookmark }) {
  const [response, setResponse] = useState();
  useEffect(() => {
    axios
      .post(url, newBookmark)
      .then((response) => setResponse(response))
      .catch((error) => toast.error("couldn't save your bookmark!"));
  }, []);

  return response;
}
