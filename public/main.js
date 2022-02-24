async function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  console.log(e);
  try {
    let timer = new easytimer.Timer();
    timer.start({ precision: "secondTenths" });

    const response = await fetch("/DBrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.getElementById("query").value,
        size: document.getElementById("size").value,
      }),
    });

    const data = await response.json();
    console.log(JSON.stringify(data));
    document.getElementById("OGanswer").innerHTML = JSON.stringify(data);

    // timer.stop();
    console.log(timer.getTimeValues().toString());
    document.getElementById("OGtime").innerHTML = `${
      timer.getTimeValues().secondTenths
    }&nbsp;tenths of a second`;
  } catch (error) {
    console.log(error);
  }
  // You must return false to prevent the default form behavior
  return false;
}
