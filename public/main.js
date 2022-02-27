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

    return OGanswer[0]["count(*)"];
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

    return AQPanswer[0]["count(*)"] * 100;
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

  let AQPanswer = await getAQPanswer();
  AQPanswer = parseInt(AQPanswer);
  AQPtimer.pause();

  let OGanswer = await getOGanswer();
  OGanswer = parseInt(OGanswer);
  OGtimer.pause();

  var relativeError = Math.trunc(
    Math.abs((AQPanswer - OGanswer) / OGanswer) * 100
  );

  document.getElementById(
    "relativeError"
  ).innerHTML = `${relativeError.toString()}%`;

  if (AQPtimer.getTotalTimeValues().secondTenths == 0) {
    var speedBoost = parseInt(OGtimer.getTotalTimeValues().secondTenths) / 0.5;
  } else {
    var speedBoost =
      parseInt(OGtimer.getTotalTimeValues().secondTenths) /
      parseInt(AQPtimer.getTotalTimeValues().secondTenths);
  }

  document.getElementById("speedBoost").innerHTML = `${speedBoost.toString()}x`;
  // You must return false to prevent the default form behavior
  return false;
}
