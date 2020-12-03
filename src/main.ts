import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDay,
  faCalendarPlus,
  faChevronLeft,
  faChevronRight,
  faClock,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";

const icons = [
  faCalendarDay,
  faCalendarPlus,
  faClock,
  faSlidersH,
  faChevronLeft,
  faChevronRight
];
icons.forEach(icon => library.add(icon));

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
