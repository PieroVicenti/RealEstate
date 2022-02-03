import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'


//we get the response about properties rent  & sales
export const fetchApi = async (url) =>{
    const {data} = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '0e01a33303msh064dc39320c46e1p17b480jsnf0eb66b8a041'
          }
    })

    return data;
};
