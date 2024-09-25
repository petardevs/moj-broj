/* ============================= ZAUSTAVLJANJE BROJEVA ============================== */

var dugme = document.querySelector(".stop");
var cifre = document.querySelectorAll(".digit");

var string2 = [10, 15, 20];
var string3 = [25, 50, 75, 100];
let i=0;

document.addEventListener("keydown", (e)=> {

    if(e.keyCode == 32 && !document.querySelector(".box").classList.contains("spreman"))
    {
        var random1 = Math.floor(Math.random() * 9)+1;
        var random2 = Math.floor(Math.random() * 3);
        var random3 = Math.floor(Math.random() * 4);
        var smallNum = string2[random2];
        var bigNum = string3[random3];
        if(i<7)
        {
            cifre[i].setAttribute("data-num",random1);
            cifre[i].classList.add("stop");
            cifre[i+1].classList.remove("hide");
        }
        if(i==7)
        {
            cifre[i].setAttribute("data-num",smallNum);
            cifre[i].classList.add("stop");
            cifre[i+1].classList.remove("hide");
        }
        if(i==8)
        {
            cifre[i].setAttribute("data-num",bigNum);
            cifre[i].classList.add("stop");
            document.querySelector(".box").classList.add("spreman");
            input.classList.remove("closed");
            timer();
        }
        i++;
        
    }
});

/* ================================ UNOSENJE BROJEVA ================================== */

var brojevi = document.querySelectorAll(".click");
var operacije = document.querySelectorAll(".operacija");
var input = document.querySelector(".resenje");

brojevi.forEach(broj => {
    broj.addEventListener("click", ()=> {
        if(document.querySelector(".box").classList.contains("spreman") && !broj.classList.contains("block") && !input.classList.contains("closed") && !input.classList.contains("znak"))
        {
            let brojR = broj.getAttribute("data-num");
            input.textContent += brojR;
            broj.classList.add("block");
            input.classList.add("znak");
        }
    });
});

/* ============================= UNOSENJE OPERACIJA =============================== */

operacije.forEach(operacija => {
    operacija.addEventListener("click", ()=> {
        var zadnja = input.textContent[input.textContent.length - 1];
        if(document.querySelector(".box").classList.contains("spreman") && 
            !input.classList.contains("closed") && input.classList.contains("znak") 
            || input.classList.contains("znak2"))
        {
            input.textContent += operacija.innerHTML;
            input.classList.remove("znak");
            input.classList.remove("znak2");
        }
        else if(document.querySelector(".box").classList.contains("spreman") &&
            !input.classList.contains("closed") && !input.classList.contains("znak") &&
            operacija.classList.contains("zagrada"))
        {
            input.textContent += operacija.innerHTML;
            input.classList.remove("znak");
        }
        else if(document.querySelector(".box").classList.contains("spreman") &&
            !input.classList.contains("closed") && !input.classList.contains("znak") && 
            zadnja == ")")
        {
            input.textContent += operacija.innerHTML;
            input.classList.remove("znak");
        }
    });
});

/* =================================== PONISTI ==================================== */

document.querySelector(".ponisti").addEventListener("click", ()=> {

    var zadnja = input.textContent[input.textContent.length - 1];
    let predzadnja = input.textContent[input.textContent.length - 2];
    let prepredzadnja = input.textContent[input.textContent.length - 3];

    if(isNum(zadnja) && isNum(predzadnja) && !isNum(prepredzadnja))
    {
        input.textContent = input.textContent.slice(0, -2);
    }
    else if((isNum(zadnja) && isNum(predzadnja)) && isNum(prepredzadnja))
    {
        input.textContent = input.textContent.slice(0, -3);
    }
    else if(!isNum(zadnja) && isNum(predzadnja))
    {
        input.classList.add("znak2");
        input.textContent = input.textContent.slice(0, -1);
        console.log(zadnja);
    }
    else
    {
        input.textContent = input.textContent.slice(0, -1);
    }
    function isNum(e){
        return !isNaN(e);
    }
    brojevi.forEach(broj => {
        broj.classList.remove("block");
        input.classList.remove("znak");
    });
});

/* =================================== IGRAJ OPET ==================================== */

document.querySelector(".igraj-opet").addEventListener("click", ()=> {

    input.textContent = "";
    document.querySelector(".choose-num1").value = "";
    document.querySelector(".choose-num2").value = "";
    document.querySelector(".final-num").innerHTML = "";
    
    brojevi.forEach(broj => {
        broj.classList.remove("block");
    });
    cifre.forEach(cifra => {
        cifra.classList.add("hide");
        cifra.classList.remove("stop");
    });

    document.querySelector(".box").classList.remove("spreman");
    cifre[0].classList.remove("hide");
    i=0;
    input.classList.remove("znak");
});

/* =================================== TAJMER ==================================== */

function timer(){

    let h = 100;
    var time = document.querySelector(".time");
    var foo = setInterval(function Timing() {
        if(h<1.68)
        {
            clearInterval(foo);
            document.querySelector(".resenje").classList.add("closed");
        }
        h = h - 1.67;
        time.style.height = h + '%';
    }, 1000);

    document.querySelector(".igraj-opet").addEventListener("click", ()=> {
        h=100;
        time.style.height = h + '%';
        clearInterval(foo);
    });
}

/* =================================== POTVRDI ==================================== */

var poeni = 0;
let igra = 1;
var ukupniPoeni = 0;
var poeniPlavog = parseInt(document.querySelector(".blue-points").textContent);

document.querySelector(".potvrdi").addEventListener("click", ()=> {

    var prva = document.querySelector("#digit1").getAttribute("data-num");
    var druga = document.querySelector("#digit2").getAttribute("data-num");
    var treca = document.querySelector("#digit3").getAttribute("data-num");
    var trazeniBroj = parseInt(prva + druga + treca);

    var izraz = input.textContent;
    var prijavljenBroj = document.querySelector(".choose-num1").value;
    var vrednostIzraza = eval(izraz);
    document.querySelector(".final-num").textContent = vrednostIzraza;

    if(prijavljenBroj == vrednostIzraza && prijavljenBroj != trazeniBroj)
    {
        poeni = 10;
    }
    else if(prijavljenBroj == trazeniBroj &&  prijavljenBroj == vrednostIzraza)
    {
        poeni = 20;
    }
    else
    {
        poeni=0;
    }

    let lista = `<li>${igra}. ---------------------- ${poeni}</li>`;
    document.querySelector(".poeni ul").innerHTML += lista;
    igra++;
    ukupniPoeni += poeni;
    poeniPlavog += poeni;
    document.querySelector(".blue-points").textContent = poeniPlavog;
    document.querySelector(".poeni p").innerHTML = `Ukupno: ---------------- ${ukupniPoeni}`;

    if(igra == 11)
    {
        document.querySelector(".popup").classList.add("visible");
        if(poeni < 50)
        {
            document.querySelector(".popup h1 .dobro").textContent = "Jbg";
        }
        if(poeni > 50 && poeni < 100)
        {
            document.querySelector(".popup h1 .dobro").textContent = "Dobro";
        }
        if(poeni > 100 && poeni < 150)
        {
            document.querySelector(".popup h1 .dobro").textContent = "Vrlo Dobro";
        }
        if(poeni > 150 && poeni < 200)
        {
            document.querySelector(".popup h1 .dobro").textContent = "Odlično";
        }
        if(poeni == 200)
        {
            document.querySelector(".popup h1 .dobro").textContent = "Ajnštajne";
        }
        document.querySelector(".popup h1 .poeni").textContent = poeni;
    }

    document.querySelector(".popup i").addEventListener("click", ()=> {
        document.querySelector(".popup").classList.remove("visible");
    });
});

document.querySelector(".popup p").addEventListener("click", ()=> {
    location.reload();
});