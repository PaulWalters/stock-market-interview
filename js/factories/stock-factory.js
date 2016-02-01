
// dataservice factory
angular
    .module('stockApp')
    .factory('dataservice', dataservice);

function dataservice($http) {
    return {
        getQuote: getQuote
    };

    function getQuote(symbol) {
        return $http.get('http://cors-anywhere-eu.herokuapp.com/http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol)
            .then(getQuoteComplete)
            .catch(getQuoteFailed);

        function getQuoteComplete(response) {
            return response.data;
        }

        function getQuoteFailed(error) {
            //logger.error('XHR Failed for getQuote.' + error.data);
        }
    }
}