const BTN = document.getElementById("calcular");
const RES = document.getElementById("resultado");
const INP = document.getElementById("peso");
function calcularHidratacion(peso) {
  if (peso > 30) {
    // Cálculo según el método de superficie corporal
    let superficieCorporal = (peso * 4 + 7) / (peso + 90);
    let resultado = {
      res1: superficieCorporal * 1500,
      res2: superficieCorporal * 2000,
      res3: null,
    };
    return resultado;
  } else {
    // Cálculo según el método de Holliday-Segar
    let volumenDiario = 0;
    let mantenimiento = 0;
    let mMasMedio = 0;

    if (peso <= 10) {
      volumenDiario = peso * 100;
    } else if (peso <= 20) {
      volumenDiario = 1000 + (peso - 10) * 50;
    } else {
      volumenDiario = 1500 + (peso - 20) * 20;
    }

    mantenimiento = volumenDiario / 24;
    mMasMedio = mantenimiento * 1.5;

    let resultado = {
      res1: volumenDiario,
      res2: mantenimiento,
      res3: mMasMedio,
    };
    return resultado;
  }
}
INP.addEventListener("click", () => {
  RES.style.padding = 0;
  RES.style.fontSize = 0;
  setTimeout(() => {
    RES.style.width = 0;
    RES.style.height = 0;
  }, 700);
});
BTN.addEventListener("click", () => {
  const input = parseInt(document.getElementById("peso").value);
  if (input > 0 && input <= 30) {
    let resultado = calcularHidratacion(input);
    let list = [resultado.res1, resultado.res2, resultado.res3];
    let final = [];
    list.forEach(function (element) {
      if (typeof element === "number") {
        if (Number.isInteger(element)) {
          final.push(element);
        } else {
          final.push(element.toFixed(2));
        }
      } else {
        final.push(element);
      }
    });
    RES.innerHTML =
      `<p>${final[0]}cc/24hs</p>` +
      `<p>${final[1]}cc/hr</p>` +
      `<p>m+m/2 ${final[2]}cc/hr</p>`;
    RES.style.width = "auto";
    RES.style.height = "auto";
    RES.style.padding = "20px";
    RES.style.fontSize = "larger";
  } else {
    if (input > 30) {
      let resultado = calcularHidratacion(input);
      console.log(resultado);
      RES.innerHTML =
        `<p>SC*1000= ${resultado.res1.toFixed(2)}</p>` +
        `<p>SC*1500= ${resultado.res2.toFixed(2)}</p>`;
      RES.style.width = "auto";
      RES.style.height = "auto";
      RES.style.padding = "20px";
      RES.style.fontSize = "larger";
    } else {
      RES.innerHTML = `<p style="color:red;">*Ingrese su peso correctamente*</p>`;
      RES.style.width = "auto";
      RES.style.height = "auto";
      RES.style.padding = "20px";
      RES.style.fontSize = "larger";
    }
  }
});
