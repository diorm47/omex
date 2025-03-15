import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

function fetchDiagramData() {
  const db = getDatabase();
  const dataRef = ref(db, "diagram");

  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let diagramData = snapshot.val();

        if (typeof diagramData === "string") {
          diagramData = JSON.parse(diagramData);
        }

        const mapping = [
          { key: "team", selector: ".diagram_desc div:nth-child(1) span" },
          { key: "staking", selector: ".diagram_desc div:nth-child(2) span" },
          { key: "liquidity", selector: ".diagram_desc div:nth-child(3) span" },
          {
            key: "partnerships",
            selector: ".diagram_desc div:nth-child(4) span",
          },
          { key: "marketing", selector: ".diagram_desc div:nth-child(5) span" },
          { key: "airdrop", selector: ".diagram_desc div:nth-child(6) span" },
          { key: "presale", selector: ".diagram_desc div:nth-child(7) span" },
          { key: "ecosystem", selector: ".diagram_desc div:nth-child(8) span" },
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
    })
    .catch((error) => console.error("Ошибка:", error));
}

window.onload = fetchDiagramData;
