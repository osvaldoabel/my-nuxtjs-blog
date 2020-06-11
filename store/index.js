import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },

      addPost(state, post) {
        state.loadedPosts.push(post);
      },

      editPost(state, editedPost) {
        const postIndex = state
        .loadedPosts.findIndex(
          post => post.id == editedPost.id
        );

        state.loadedPosts[postIndex] = editedPost;
      },

      setToken(state, token) {
        state.token = token;
      },

      clearToken(state) {
        state.token = null;
      },
    },
    actions: {
      // nuxtServerInit(vuexContext, context) {
      //   let link = "/posts.json"

      //   return context.app.$axios.$get(link)
      //               .then(data => {
      //                   const postArray = []

      //                   for (const key in data) {
      //                     postArray.push({...data[key], id: key})
      //                   }

      //                   vuexContext.commit('setPosts', postArray)
      //               })
      //               .catch(e => context.error(e))

      // },

        addPost(vuexContext, post) {

          const authToken = vuexContext.state.token;
          const link = `/posts.json?auth=${authToken}`

          const createdPost = {
            ...post,
            updatedDate: new Date()
          };

          return this.$axios
            .$post(link, createdPost)
            .then(data => {
              vuexContext.commit('addPost', {...createdPost, id: data.name})
              this.$router.push('/admin')
            })
            .catch(e => console.log(e));
        },

        editPost(vuexContext, editedPost) {
          const authToken = vuexContext.state.token;
          const link = `${'/posts/'+editedPost.id}.json?auth=${authToken}`
          return this.$axios.$put(link, editedPost)
            .then(data => {
                vuexContext.commit('editPost', editedPost)
              }
            )
            .catch(
              e => console.log(e)
            )
        },
        setPosts(vuexContext, posts) {
          vuexContext.commit('setPosts', posts)
        },

        authenticateUser(vuexContext, authData) {
          let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`+ process.env.fbAPIKey;

          if (!authData.isLogin) {
            let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ process.env.fbAPIKey;
          }

          return this.$axios.$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
            localStorage.setItem('token', result.idToken);
            const expirationDate = new Date().getTime() + Number.parseInt(result.expiresIn) * 1000;

            localStorage.setItem('tokenExpiration', expirationDate )
            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate', expirationDate)

            console.log("idToken: "+ result.idToken);

          })
          .catch(e => console.log(e));
        },

      initAuth(vuexContext, req) {

        let token;
        let expirationDate;
        let jwtCookie;

        if (req) {

          if (!req.headers.cookie) {
            return;
          }

          jwtCookie = req.headers.cookie
            .split(';')
            .find(c =>  c.trim().startsWith('jwt='));

          if (!jwtCookie) {
            return;
          }

          token = jwtCookie.split('=')[1];
          expirationDate = req.headers.cookie
            .split(';')
            .find(c =>  c.trim().startsWith('expirationDate='))
            .split("=")[1];

        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        }

        if (new Date().getDate() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch('logout');
          return;
        }

        vuexContext.commit('setToken', token);
      },

      logout(vuexContext) {
        vuexContext.commit('clearToken');

        Cookie.remove('jwt');
        Cookie.remove('expirationDate');

        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      },
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },

      loadedPost(state) {
        return state.loadedPosts[0]
      },

      isAuthenticated(state) {
        return state.token != null;
      }
    }
  })
}
export default createStore
