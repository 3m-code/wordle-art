import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("https://wordsrated.com/solvers/todays-wordle-hints-plus-answer/")
        .then(response => response.text())
        .then(html => {
          console.log(html);
          setData(html);
        })
        .catch(error => {
          console.error(error);
          setData("ERROR: " + error);
        });
  }, []);

  return (
      <div>
        <h1>Wordle Art Test</h1>

        <textarea
            value={data}
            readOnly
            style={{
              width: "800px",
              height: "500px"
            }}
        />
      </div>
  );
}

export default App;