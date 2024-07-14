import { useEffect, useState } from "react";
import { fetchDataFromFirebase } from "./util";

function RegisterPerDay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchDataFromFirebase();
        let countDataByDate = response
          .filter((item) => item.discard !== true && item.applyType === "self")
          .reduce((acc, item) => {
            const dateTimeStap = item.timestamp.split(",")[0];
            acc[dateTimeStap] = (acc[dateTimeStap] || 0) + 1;
            return acc;
          }, {});
        // sort countDataByDate by date ascending
        countDataByDate = Object.entries(countDataByDate)
          .sort(([date1], [date2]) => date1.localeCompare(date2))
          .reduce((acc, [date, count]) => {
            acc[date] = count;
            return acc;
          }, {});
        setData(countDataByDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log(data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Register per day</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([date, count]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RegisterPerDay;
