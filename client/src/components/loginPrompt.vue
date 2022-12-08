<template>
  <div class="container p-5">
    <div class="mb-4 bg-light rounded-3" id="login-box">
      <h1 class="mb-5">Login</h1>
      <form>
        <div class="mb-2 row">
          <label for="nickname" class="col-sm-4 col-form-label">ID</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              v-model="userInfo.nickname"
              id="nickname"
              placeholder="ID"
              required
            />
            <br />
          </div>
        </div>

        <div class="mb-2 row">
          <label for="password" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              v-model="userInfo.password"
              id="password"
              placeholder="Password"
              required
            />
            <br />
          </div>
        </div>
        <button type="button" class="btn btn-danger w-100" @click="loginSubmit">
          Login
        </button>
      </form>
      <p id="noAccount">If you don't have an account....</p>
      <button type="button" class="btn btn-primary w-100" @click="goToJoin">
        Create account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPrompt",
  /*
  setup() {
    const user = useUserInfoStore();
    return {
      user,
    };
  },
  */
};
</script>

<script setup>
import useAxios from "../modules/axios";
import { useUserInfoStore } from "/@stores/userInfo";
import { reactive } from "vue";
import router from "../routers";

const { axiosGet, axiosPost } = useAxios();

const userInfo = reactive({
  nickname: "",
  password: "",
});

const goToJoin = () => {
  router.push("join");
};

const onLoginSuccess = (respData) => {
  console.log(respData);
  const userStore = useUserInfoStore();
  userStore.setInfo(userInfo.nickname, true, respData.accesstoken, "");
  console.log("✅ userStore", userStore.getInfo);
  if (userStore.loggedIn) {
    router.push("/");
  }
};

const onLoginFail = (respData = null) => {
  console.log("❌ FAILED");
};

const loginSubmit = () => {
  //axiosPost("/users/login", userInfo, onLoginSuccess, onLoginFail);
  const data = {
    id: userInfo.nickname,
    password: userInfo.password,
  };
  axiosPost(
    "http://gonggu-alb-test-333249785.ap-northeast-2.elb.amazonaws.com/login",
    data,
    onLoginSuccess,
    onLoginFail
  );
};
</script>

<style>
#login-box {
  padding: 5% 30% 5% 30%;
}
</style>
