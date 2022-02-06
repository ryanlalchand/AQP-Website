async function fetchData(query) {
  try {
    const response = await fetch("/DBrequest?query=" + query);
    const data = await response.json();
    console.log(data);
    console.log(query);
  } catch (error) {
    console.log(error);
  }
}
