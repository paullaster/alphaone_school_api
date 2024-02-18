import axios from 'axios';
class Setupcontroller {
    async getCountriesList(req, res) {
        try {
            const query = req.query;
            const countryApi = `https://restcountries.com/v3.1/all`;
            axios.interceptors.request.use(config => {
                config.params = {
                    ...query,
                }
                return config;
            });

            const response = await axios.get(countryApi);
            console.log(response);

        } catch (error) {
            
        }
    }
}