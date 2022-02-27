async function getOGanswer() {
  try {
    const OGresponse = await fetch("/OGanswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.getElementById("query").value,
        size: document.getElementById("size").value,
      }),
    });

    const OGanswer = await OGresponse.json();

    document.getElementById("OGanswer").innerHTML = JSON.stringify(
      OGanswer[0]["count(*)"]
    );

    return;
  } catch (error) {
    console.log(error);
  }
}

async function getAQPanswer() {
  try {
    const AQPresponse = await fetch("/AQPanswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.getElementById("query").value,
        size: document.getElementById("size").value,
      }),
    });

    const AQPanswer = await AQPresponse.json();

    document.getElementById("AQPanswer").innerHTML = JSON.stringify(
      AQPanswer[0]["count(*)"] * 100
    );

    return;
  } catch (error) {
    console.log(error);
  }
}

async function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  console.log(e);

  let OGtimer = new easytimer.Timer();
  OGtimer.start({ precision: "secondTenths" });
  let AQPtimer = new easytimer.Timer();
  AQPtimer.start({ precision: "secondTenths" });

  OGtimer.addEventListener("secondTenthsUpdated", function (e) {
    document.getElementById(
      "OGtime"
    ).innerHTML = `${OGtimer.getTimeValues().toString([
      "hours",
      "minutes",
      "seconds",
      "secondTenths",
    ])}`;
  });

  AQPtimer.addEventListener("secondTenthsUpdated", function (e) {
    document.getElementById(
      "AQPtime"
    ).innerHTML = `${AQPtimer.getTimeValues().toString([
      "hours",
      "minutes",
      "seconds",
      "secondTenths",
    ])}`;
  });

  await getAQPanswer()
    .then(AQPtimer.stop())
    .then(
      (document.getElementById(
        "AQPtime"
      ).innerHTML = `${AQPtimer.getTotalTimeValues().toString([
        "hours",
        "minutes",
        "seconds",
        "secondTenths",
      ])}`)
    );

  await getOGanswer()
    .then(AQPtimer.stop())
    .then(
      (document.getElementById(
        "AQPtime"
      ).innerHTML = `${AQPtimer.getTotalTimeValues().toString([
        "hours",
        "minutes",
        "seconds",
        "secondTenths",
      ])}`)
    );

  // You must return false to prevent the default form behavior
  return false;
}
