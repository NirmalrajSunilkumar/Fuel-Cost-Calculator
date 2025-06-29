function updateUnitLabel() {
  const fuelType = document.getElementById("fuelType").value;
  document.getElementById("unitLabel").textContent = fuelType === "cng" ? "km/kg" : "km/litre";
  document.getElementById("priceUnit").textContent = fuelType === "cng" ? "kg" : "litre";
}

function calculateCost() {
  const distance = parseFloat(document.getElementById("distance").value);
  const mileage = parseFloat(document.getElementById("mileage").value);
  const price = parseFloat(document.getElementById("price").value);
  const isRoundTrip = document.getElementById("roundTrip").checked;
  const fuelType = document.getElementById("fuelType").value;

  if (mileage <= 0 || distance <= 0) {
    document.getElementById("result").innerText = "Enter valid numbers.";
    return;
  }

  const totalDistance = isRoundTrip ? distance * 2 : distance;
  const fuelNeeded = totalDistance / mileage;
  const totalCost = (fuelNeeded * price).toFixed(2);

  let co2PerKm;
  switch (fuelType) {
    case "petrol": co2PerKm = 2.31; break;
    case "diesel": co2PerKm = 2.68; break;
    case "cng": co2PerKm = 2.16; break;
  }

  const totalCO2 = (totalDistance * co2PerKm).toFixed(2);
  const fuelUnit = fuelType === "cng" ? "kg" : "litres";

  document.getElementById("result").innerHTML = `
    🔧 Fuel needed: ${fuelNeeded.toFixed(2)} ${fuelUnit}<br>
    💰 Total cost: ₹${totalCost}<br>
    🌿 Estimated CO₂ emitted: ${totalCO2} grams
  `;

  drawCO2Bar(totalCO2);
}

function drawCO2Bar(co2) {
  const bar = document.getElementById("co2Bar");
  const width = Math.min(100, (co2 / 1000) * 10); // scale and cap
  bar.innerHTML = `<div style="
    width: ${width}%;
    height: 20px;
    background: linear-gradient(90deg, #76c7c0, #4db6ac);
    border-radius: 5px;
    transition: width 1s;
  "></div>`;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}