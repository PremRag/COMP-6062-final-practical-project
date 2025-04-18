const app = Vue.createApp({
  data() {
    return {
      user: {
        // this is for  profile
        first_name: "",
        last_name: "",
        age: "",
        profile_picture: "",
      },
      // this is for weather 
      city: "London",
      province: "Ontario",
      country: "Canada",
      weather: null,
    };
  },
  methods: {
    newUser() {
      fetch("http://comp6062.liamstewart.ca/random-user-profile")
        .then(response => response.json())
        .then(data => {
          this.user = data;
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
        });
    },
    getWeather() {
        const url = `https://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.weather = {
              temperature: data.temperature,
              wind_speed: data.wind_speed,
              weather_description: data.weather_description,
              location: {
                city: data.location.city,
                region: data.location.region,
                country: data.location.country,
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                population: data.location.population
              }
            };
          })
          .catch(error => {
            console.error("Error fetching weather:", error);
          });
      }
  },
  created() {
    this.newUser();  
    this.getWeather();  
  }
});
app.mount("#app");
