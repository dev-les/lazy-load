<template>
  <div>
    <h1>Lazy Load</h1>
    <div class="item container" v-for="(item, index) of items" :key="index">
      <img class="image" :src="item.thumbnailurl"/>
      <h2>
        {{item.title}}
      </h2>
    </div>
    <div>
      <p>Loading</p>
      <pulse-loader :loading="loading" :color="loaderColor"></pulse-loader>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'App',
  components: {
    PulseLoader
  },
  data() {
    return {
      items: null,
      loading: false,
      loaderColor: 'white'
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/data?offset=0')
      .then(response => {
        this.items = response.data;
      })
      .catch(err => {
        console.log(err);
      })

      window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

      if((scrollTop + clientHeight >= scrollHeight - 5) && this.items.length < 100 && !this.loading){
        this.loading = true;
        axios.get(`http://localhost:3000/data?offset=${this.items.length}`)
          .then(response => {
            setTimeout(() => {
              this.items.push(...response.data);
              this.loading = false;
            }, '2000');
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #338BD4;
}
h2 {
  margin: 0;
  padding: 50px;
  color: white;
  font-size: 32px;
}
h1 {
  color: white;
  font-size: 62px;
}
p {
margin: 0;
padding-bottom: 30px;
color: white;
}

.container {
  background-color: #5A5858;
  margin: 20px;
  height: 50%;
  min-height: 200px;
  border-radius: 25px;
}

.item {
  display: flex;
}
.image {
  padding: 25px;
  border-radius: 50%;
  position: relative;
  top: 0;
  left: 0;
}
.loader p {
  color: white;
  font-size: 32px;
}
</style>
