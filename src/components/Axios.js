import axios from 'axios'; // Importa axios

// Asegúrate de que dispatch y setSt estén disponibles en el alcance
// Si estas son funciones de Redux, por ejemplo, deberías importarlas
// o pasarlas como parámetros a la función apiCons

function apiCons(dispatch, setSt) {
    return async function getData(e) {
        e.preventDefault();

        try {
            const rta = await axios.get('https://rickandmortyapi.com/api/character');
            const lst = [];

            for (let x = 0; x < rta.data.results.length; x += 2) {
                lst.push(rta.data.results.slice(x, x + 2));
            }

            dispatch(setSt(lst));
        } catch (error) {
            console.log("ERROR: " + error.message);
        }
    };
}

export default apiCons;
