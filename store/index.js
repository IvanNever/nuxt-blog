import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("/posts.json")
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            "/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token,
            editedPost
          )
          .then(() => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };

        return this.$axios
          .$post("/posts.json", createdPost)
          .then(data => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: data.name
            });
          })
          .catch(e => console.log(e));
      },
      authUser(vuexContext, data) {
        let apiUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

        if (data.isLogin)
          apiUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

        return this.$axios
          .$post(apiUrl + process.env.fbAPIKey, {
            email: data.email,
            password: data.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContext.commit("setToken", res.idToken);
            localStorage.setItem("token", res.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + +res.expiresIn * 1000
            );

            Cookie.set("jwt", res.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + +res.expiresIn * 1000
            );
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;

        if (req) {
          if (!eq.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];

          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }

        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch("logout");
          return;
        }

        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuth(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
