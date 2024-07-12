import { useEffect, useState } from "react";
import { fetchDataFromFirebase } from "./util";

function Names() {
  const [data, setData] = useState();
  // fetch data from firebase
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetchDataFromFirebase();
        // sort response by name after trimming
        setData(
          response
            .filter(
              (item) =>
                new Date(item.timestamp) >= new Date("2024-07-12T13:33:00")
            )
            .filter((item) => !item.discarded)
            .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Names</h1>
      <ul>
        {data &&
          data.map((item) => (
            // li with no bullet point
            <li key={item.id} style={{ listStyleType: "none" }}>
              {item.name}
              {Number(item.code) > 0 && ` ${item.code}`}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Names;
