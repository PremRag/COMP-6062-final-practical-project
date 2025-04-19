const app = Vue.createApp({
    data() {
      return {
        user: {
          first_name: "",
          last_name: "",
          age: "",
          profile_picture: "",
        },
        city: "London",
        province: "Ontario",
        country: "Canada",
        weather: null,
  
        word: "",
        dictionary: {
          word: "",
          phonetic: "",
          definition: ""
        }
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
        const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              alert(data.message);
              this.weather = null;
            } else {
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
            }
          })
          .catch(error => {
            console.error("Error fetching weather:", error);
            this.weather = null;
          });
      },
  
      getDefinition() {
        const url = `http://comp6062.liamstewart.ca/define?word=${this.word}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.length === 0 || data[0].word === undefined) {
              alert("Word not found");
              this.dictionary = { word: "", phonetic: "", definition: "" };
            } else {
              this.dictionary = {
                word: data[0].word || "",
                phonetic: data[0].phonetic || "",
                definition: data[0].definition || ""
              };
            }
          })
          .catch(error => {
            console.error("Definition fetch failed:", error);
            this.dictionary = { word: "", phonetic: "", definition: "" };
          });
      }
      
      
    },
  
    created() {
      this.newUser();
      this.getWeather();
    }
  });
  
  app.mount("#app");
  