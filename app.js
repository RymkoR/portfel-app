document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const deposit = parseFloat(document.getElementById("deposit").value);
  const bonds = parseFloat(document.getElementById("bonds").value);
  const ikze = parseFloat(document.getElementById("ikze").value);
  const depositReturn = parseFloat(document.getElementById("depositReturn").value);
  const bondsReturn = parseFloat(document.getElementById("bondsReturn").value);
  const ikzeReturn = parseFloat(document.getElementById("ikzeReturn").value);

  const total = deposit + bonds + ikze;
  if (total !== 100) {
    alert("Suma udziałów musi wynosić 100%");
    return;
  }

  const totalReturn = (
    (deposit * depositReturn + bonds * bondsReturn + ikze * ikzeReturn) / 100
  ).toFixed(2);

  document.getElementById("result").innerText = `Łączna stopa zwrotu: ${totalReturn}%`;

  const ctx = document.getElementById("pieChart").getContext("2d");
  if (window.pieChart) window.pieChart.destroy();
  window.pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Depozyt", "Fundusz obligacyjny", "IKZE"],
      datasets: [
        {
          data: [deposit, bonds, ikze],
          backgroundColor: ["#3498db", "#2ecc71", "#f39c12"],
        },
      ],
    },
  });
});
