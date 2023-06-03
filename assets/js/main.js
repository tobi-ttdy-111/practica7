
// coeficientesFriccion
const coeficientesFriccion = [
    {
        "us": 1.0,
        "uk": 0.8
    },
    {
        "us": 0.74,
        "uk": 0.57
    },
    {
        "us": 0.61,
        "uk": 0.47
    },
    {
        "us": 0.94,
        "uk": 0.4
    },
    {
        "us": 0.53,
        "uk": 0.36
    },
    {
        "us": 0.5,
        "uk": 0.2
    },
    {
        "us": 0.14,
        "uk": 0.1
    },
    {
        "us": .15,
        "uk": 0.06
    },
    {
        "us": .04,
        "uk": 0.04
    },
    {
        "us": .1,
        "uk": 0.03
    },
    {
        "us": .01,
        "uk": 0.003
    },
];


// mainVariables
let selTipo = document.querySelector( "#selTipo" );
let selFriccion = document.querySelector( "#selFriccion" );
let inpAngulo = document.querySelector( "#inpAngulo" );


// actualizadores
let actualFriccion = document.querySelector( "#actualFriccion" );
let actualAngulo = document.querySelectorAll( ".actualAngulo" );
let actualCoeficiente = document.querySelectorAll( ".actualCoeficiente" );
let actualResultado = document.querySelector( "#actualResultado" );


// respuestas
let resAnguloCritico = document.querySelector( "#resAnguloCritico" );
let resMovilidadObjeto = document.querySelector( "#resMovilidadObjeto" );
let resNota = document.querySelector( "#resNota" );


// calcularResultado
const calcularResultado = () => {

    console.clear();
    let tFriccion = selFriccion.value;
    let cFriccion;
    if ( selTipo.value == "estatica" ) {
        cFriccion = coeficientesFriccion[ parseInt( tFriccion ) ].us;
    } else {
        cFriccion = coeficientesFriccion[ parseInt( tFriccion ) ].uk;
    };

    if ( inpAngulo.value < 1 || inpAngulo.value > 89 ) {
        resAnguloCritico.innerHTML = ``;
        resMovilidadObjeto.innerHTML = ``;
        resNota.innerHTML = `
        <span style="color: #F36A94">
            Nota: El angulo no es válido <br>
            Ingresa un angulo cuyo valor se encuentre entre 1 y 89 grados
        </span>
        `;
        return;
    };

    const anguloNecesario = Math.atan( cFriccion ) * 57.2958;
    actualFriccion.innerHTML = `( actual: ${ cFriccion } )`;
    actualAngulo.forEach( ( e ) => { e.innerHTML = `${ inpAngulo.value || 45 }º`; });
    actualCoeficiente.forEach( ( e ) => { e.innerHTML = `${ cFriccion }º`; });
    actualResultado.innerHTML = `${ anguloNecesario }`;

    if ( inpAngulo.value < anguloNecesario ) {
        resAnguloCritico.innerHTML = `Ángulo crítico: <span style="color: #F36A94">NO</span>`;
        if ( selTipo.value == "estatica" ) {
            resMovilidadObjeto.innerHTML = `<span style="color: #F36A94">El objeto no se moverá</span>`;
            resNota.innerHTML = `Nota: El ángulo debe ser mayor a ${ anguloNecesario }º para que el objeto se mueva`;
        } else {
            resMovilidadObjeto.innerHTML = `<span style="color: #F36A94">El objeto dejara de moverse</span>`;
            resNota.innerHTML = `Nota: El ángulo debe ser mayor a ${ anguloNecesario }º para que el objeto siga moviendose`;
        };
    } else {
        resAnguloCritico.innerHTML = `Ángulo crítico: <span style="color: #6EE7C3">SI</span>`;
        if ( selTipo.value == "estatica" ) {
            resMovilidadObjeto.innerHTML = `<span style="color: #6EE7C3">El objeto se moverá</span>`;
            resNota.innerHTML = `Nota: El ángulo es mayor a ${ anguloNecesario }º para que se mueva el objeto`;
        } else {
            resMovilidadObjeto.innerHTML = `<span style="color: #6EE7C3">El objeto seguira moviendose</span>`;
            resNota.innerHTML = `Nota: El ángulo es mayor a ${ anguloNecesario }º por eso continúa el movimiento`;
        };
    }

};
