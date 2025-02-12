import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://httpbin.org/get")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default FetchData;
