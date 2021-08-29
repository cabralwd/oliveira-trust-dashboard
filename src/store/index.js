import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  strict: true,
  state: {
    estaCarregando: false,
    usuario: {
      nome: "",
      email: "",
      senha: "",
    },
  },
  mutations: {
    MUDAR_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    CARREGAMENTO_PAGINA(state, payload) {
      state.estaCarregando = payload;
    },
  },
  actions: {
    // Apenas para exemplificar, não irei utilizar token de autenticação por não se tratar de um sistema real
    obterUsuario(context, payload) {
      context.commit("CARREGAMENTO_PAGINA", true);

      return axios
        .get("https://api-dashboard-oliveira-trust.herokuapp.com/usuario")
        .then((response) => {
          let usuario = response.data[0].email,
            senha = response.data[0].senha;

          context.commit("CARREGAMENTO_PAGINA", false);

          if (usuario === payload[0].login && senha === payload[0].senha) {
            context.commit("MUDAR_USUARIO", response.data[0]);
            window.localStorage.user = usuario;
            window.localStorage.password = senha;
          } else {
            Swal.fire({
              icon: "error",
              title: "usuário ou senha inválidos",
              confirmButtonColor: "#dc3545",
            });
          }
        })
        .catch((error) => {
          context.commit("CARREGAMENTO_PAGINA", false);
          Swal.fire({
            icon: "error",
            title: error,
            confirmButtonColor: "#dc3545",
          });
        });
    },
    manterLogado(context) {
      return axios
        .get("https://api-dashboard-oliveira-trust.herokuapp.com/usuario")
        .then((response) => {
          context.commit("MUDAR_USUARIO", response.data[0]);
        });
    },
    deslogarUsuario(context) {
      context.commit("MUDAR_USUARIO", {
        nome: "",
        email: "",
        senha: "",
      });
    },
  },
  modules: {},
});
