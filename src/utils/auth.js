import axios from "@/utils/axios.js";

/**
 * Класс, управляющий всем, что связано с аутентификацией
 */
class Auth {
  constructor(axiosInstance) {
    this.#axios = axiosInstance;
    this.#axios.interceptors.response.use(
      (response) => response,
      this.#handleError
    );
    this.#setAccessToken(this.accessToken());
  }

  #axios = null;
  #isRefreshing = false;
  #failedQueue = [];

  // URL that person tried to access without authentication
  unauthorizedTo = "";

  /**
   * Обработать очередь провалившихся запросов
   * @param {Object} error Ошибка
   * @param {String} token Токен доступа
   */
  #processQueue = (error, token = null) => {
    this.#failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.#failedQueue = [];
  };

  /**
   * Обработать ошибку запроса
   * @param {Object} error
   */
  #handleError = (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (this.#isRefreshing) {
        return new Promise((resolve, reject) => {
          this.#failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return this.#axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      this.#isRefreshing = true;

      return new Promise((resolve, reject) => {
        this.refreshTokens(this.refreshToken())
          .then(() => {
            this.#processQueue(null, this.accessToken());
            originalRequest.headers["Authorization"] =
              "Bearer " + this.accessToken();
            resolve(this.#axios(originalRequest));
          })
          .catch((err) => {
            this.#processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            this.#isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  };

  #tokens = {
    access_token: localStorage.getItem("accessToken") ?? "",
    refresh_token: localStorage.getItem("refreshToken") ?? "",
  };

  /**
   * Получить токен доступа
   * @return {String} Токен доступа
   */
  accessToken() {
    return this.#tokens.access_token ?? "";
  }

  /**
   * Получить токен обновления
   * @return {String} Токен обновления
   */
  refreshToken() {
    return this.#tokens.refresh_token ?? "";
  }

  /**
   * Авторизован ли пользователь?
   * @return {Boolean} Статус авторизации
   */
  isAuthenticated() {
    return !!this.accessToken() && !!this.refreshToken();
  }

  /**
   * Записать токены
   * @param {Object} tokens Пара токенов (accessToken, refreshToken)
   */
  #writeTokens = (tokens) => {
    localStorage.setItem("accessToken", tokens.access_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);

    this.#tokens = tokens;
    this.#setAccessToken(this.accessToken());
  };

  #setAccessToken = (token) => {
    if (token) {
      this.#axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  };

  /**
   * Стереть токены
   */
  #resetTokens = () => {
    this.#writeTokens({ access_token: "", refresh_token: "" });
  };

  /**
   * Обновить токены
   * @param {String} refreshToken
   */
  async refreshTokens(refreshToken) {
    return new Promise((resolve, reject) => {
      const data = {
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      };

      this.#axios
        .post("auth/token", data)
        .then((res) => {
          this.#writeTokens(res.data);
          resolve();
        })
        .catch((err) => {
          console.error("Error occured while refreshing tokens", err);
          reject(err);
        });
    });
  }

  /**
   * Вход в аккаунт
   * @param {String} username Триколор ID или номер телефона
   * @param {String} password Пароль
   * @return {Promise} Ответ сервера
   */
  async login(username, password) {
    return new Promise((resolve, reject) => {
      const loginData = {
        username,
        password,
        grant_type: "password",
      };

      this.#axios
        .post("auth/token", loginData)
        .then((res) => {
          this.#writeTokens(res.data);
          resolve();
        })
        .catch((err) => {
          console.error("Error occured while loginning", err);
          reject(err);
        });
    });
  }

  /**
   * Выход из аккаунта
   * @return {Promise} Ответ сервера
   */
  async logout() {
    return new Promise((resolve, reject) => {
      this.#axios
        .post("auth/logout")
        .then(() => {
          this.#resetTokens();

          localStorage.clear();
          sessionStorage.clear();

          this.unauthorizedTo = "";

          resolve();
        })
        .catch((err) => {
          console.error("Error occured while trying to logout", err);
          reject(err);
        });
    });
  }
}

export default new Auth(axios);
