const axios = require('axios');

module.exports = {
  geolocate: address => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => {
          if (response.data.status === 'OK') {
            // console.log('GEOLOCATE UTIL STATUS=OK');
            // console.log(response.data.results[0]);
            const results = response.data.results[0];

            resolve({
              formattedAddress: results.formatted_address,
              coordinates: results.geometry.location
            });
          } else if (response.data.status === 'ZERO_RESULTS') {
            console.log('GEOLOCATE UTIL STATUS=ZERO_RESULTS');
            resolve({ coordinates: {} });
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              console.log('GEOLOCATE UTIL STATUS=ERROR_MESSAGE');
              console.log(response.data.error_message);
              reject(new Error(response.data.error_message));
            } else {
              console.log('GEOLOCATE UTIL STATUS=ERROR_CATCH_ALL');
              console.log(response.data);
              reject(new Error(response.data));
            }
          }
        })
        .catch(error => {
          console.log('GEOLOCATE UTIL GOOGLE API CATCH');
          console.log(error);
          return reject(new Error(error));
        });
    });
  }
};
