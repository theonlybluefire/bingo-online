export async function fetchWords(): Promise<string[]> {
  let returnedWords: string[] = [];
  await fetch("./words.json")
    .then((response) => response.json())
    .then((data: Array<string>) => {
      returnedWords = data;
    })
    .catch((error) => {
      console.error("FetchWords: Error fetching words:", error);
      throw new Error(error);
    });

  return returnedWords;
}
