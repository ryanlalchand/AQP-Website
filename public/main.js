async function fetchData(query) {
  try {
    const response = await fetch("/DBrequest?query=" + query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
