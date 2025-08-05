document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const deposit = parseFloat(document.getElementById("deposit").value);
  const bonds = parseFloat(document.getElementById("bonds").value);
  const ikze = parseFloat(document.getElementById("ikze").value);
  const depositReturn = parseFloat(document.getElementById("depositReturn").value);
  const bondsReturn = parseFloat(document.getElementById("bondsReturn").value);
  const ikzeReturn = parseFloat(document.getElementById("ikzeReturn").value);

  const total = deposit + bonds + ikze;

  if (isNaN(deposit) || isNaN(bonds) || isNaN(ikze) || total <= 0) {
    alert("Wprowadź poprawne wartości. Suma portfela musi być większa niż 0.");
    return;
  }

  const totalReturn = (
    ((deposit * depositReturn) +
     (bonds * bondsReturn) +
     (ikze * ikzeReturn)) / total
  ).toFixed(2);

  // Formatowanie liczb w stylu "10 000"
  const formattedDeposit = deposit.toLocaleString("pl-PL");
  const formattedBonds = bonds.toLocaleString("pl-PL");
  const formattedIkze = ikze.toLocaleString("pl-PL");

  document.getElementById("result").innerText =
    `Łączna stopa zwrotu: ${totalReturn}%\n` +
    `Depozyt: ${formattedDeposit} PLN\n` +
    `Obligacje: ${formattedBonds} PLN\n` +
    `IKZE: ${formattedIkze} PLN`;

  const ctx = document.getElementById("pieChart").getContext("2d");

  if (window.pieChart instanceof Chart) {
    window.pieChart.destroy();
  }

  window.pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Depozyt", "Fundusz obligacyjny", "IKZE"],
      datasets: [{
        data: [deposit, bonds, ikze],
        backgroundColor: ["#3498db", "#2ecc71", "#f39c12"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || "";
              const value = context.parsed;
              const formatted = value.toLocaleString("pl-PL");
              return `${label}: ${formatted} PLN`;
            }
          }
        }
      }
    }
  });
});
