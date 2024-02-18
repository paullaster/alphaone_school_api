import countries from '../../../../../countries.json' with { type: "json" };
class Setupcontroller {
    async getCountriesList(req, res) {
        try {
            res.ApiResponse.success(countries);

        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}

export default new Setupcontroller();