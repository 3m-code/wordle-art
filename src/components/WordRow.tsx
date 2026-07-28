import type { Pattern } from "../models/Pattern";


interface Props {
  word: string;
  pattern: Pattern;
}


export function WordRow(
    {
      word,
      pattern
    }: Props
) {

  const letters =
      word.split("");


  return (
      <div className="word-row">

        {
          letters.map(
              (letter, index) => (

                  <div
                      key={index}
                      className={
                          "cell " +
                          pattern.cells[0][index]
                              .toLowerCase()
                      }
                  >
                    {letter}
                  </div>

              )
          )
        }

      </div>
  );
}