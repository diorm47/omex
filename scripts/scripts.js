const getData = async () => {
  try {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      "https://api-omex.omexeth.io/datas",
      {
        method: "GET",
        headers: headersList,
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    let res = await response.json();
    const data = res[0];

    document.querySelector(".whitepaper_desc").innerText = data.whitepaper_text;
    document.querySelectorAll(".whitepaper_btn").forEach((btn) => {
      btn.href = `https://api-omex.omexeth.io${data.whitepaper_link}`;
    });

    document.querySelector(
      ".token_btn"
    ).href = `https://api-omex.omexeth.io${data.tokenomics_link}`;

    fetchDiagramData(data.token);

    startTimer(data.timer);
  } catch (error) {
    console.error("Ошибка запроса:", error);
  }
};
getData();

// timer
function startTimer(timer) {
  const [days, hours, minutes, seconds] = timer.split(":").map(Number);
  let totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

  function updateTimer() {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      return;
    }

    totalSeconds--;

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const timerValues = document.querySelectorAll(".timer_value p");
    timerValues[0].textContent = d.toString().padStart(2, "0");
    timerValues[1].textContent = h.toString().padStart(2, "0");
    timerValues[2].textContent = m.toString().padStart(2, "0");
    timerValues[3].textContent = s.toString().padStart(2, "0");
  }

  // Запускаем обновление каждую секунду
  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

// diagramm data
function fetchDiagramData(diagramData) {
  if (diagramData) {
    if (typeof diagramData === "string") {
      diagramData = JSON.parse(diagramData);
    }

    const mapping = [
      { key: "community", selector: ".diagram_desc div:nth-child(1) span" },
      { key: "ecosystem", selector: ".diagram_desc div:nth-child(2) span" },
      { key: "team", selector: ".diagram_desc div:nth-child(3) span" },
      {
        key: "advisors",
        selector: ".diagram_desc div:nth-child(4) span",
      },
      { key: "seed", selector: ".diagram_desc div:nth-child(5) span" },
      { key: "ido", selector: ".diagram_desc div:nth-child(6) span" },
      { key: "liquidity", selector: ".diagram_desc div:nth-child(7) span" },
    
    ];

    mapping.forEach(({ key, selector }) => {
      const element = document.querySelector(selector);
      if (element && diagramData[key] !== undefined) {
        element.innerText = `${diagramData[key]}%`;
      }
    });
  } else {
    console.log("Нет данных!");
  }
}

// redirecter
function scrollToTarget(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
}
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    scrollToTarget(window.location.hash);
  }
});
