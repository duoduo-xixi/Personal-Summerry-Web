import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const reveal = {
  mounted(el) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    el._revealIo = io;
  },
  unmounted(el) {
    if (el._revealIo) el._revealIo.disconnect();
  },
};

const app = createApp(App);
app.directive("reveal", reveal);
app.mount("#app");
