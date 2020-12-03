<template>
  <div class="relative">
    <slot></slot>
    <div v-if="calendarVisibilityState === CalendarVisibilityState.Opened">
      <slot></slot>
      <div
        class="action__box"
        v-if="calendarState === CalendarState.SelectQuickActions"
      >
        <ul class="action__list">
          <li class="action__list__item">
            <font-awesome-icon icon="clock" />
            <span class="ml-3"> Maintenant</span>
            <span class="font-normal ml-auto">Dim. 16:00</span>
          </li>
          <li class="action__list__item">
            <font-awesome-icon icon="calendar-plus" />
            <span class="ml-3">Demain</span>
            <span class="font-normal ml-auto">Dim. 16:00</span>
          </li>
          <li class="action__list__item">
            <font-awesome-icon icon="calendar-day" />
            <span class="ml-3">Le prochain lundi</span>
            <span class="font-normal ml-auto">Lun. 09:00</span>
          </li>
          <li
            class="mb-1.5 px-4 py-2 cursor-pointer"
            @click="calendarState = CalendarState.SelectDays"
          >
            <font-awesome-icon icon="sliders-h" />
            <span class="ml-3">Choisir une date et une heure</span>
          </li>
        </ul>
      </div>
      <div class="calendar" v-if="calendarState === CalendarState.SelectDays">
        <div class="calendar__pickable">
          <span
            class="calendar__pickable__chevron"
            @click="selectedTime = substractMonths(1, selectedTime)"
          >
            <span>
              <font-awesome-icon icon="chevron-left" />
            </span>
          </span>
          <span class="font-bold py-4 capitalize"
            >{{ formatMonthName(selectedTime) }}
            {{ selectedTime.getFullYear() }}</span
          >
          <span
            class="calendar__pickable__chevron"
            @click="selectedTime = addMonths(1, selectedTime)"
          >
            <span>
              <font-awesome-icon icon="chevron-right" />
            </span>
          </span>
        </div>
        <div class="calendar__days__container px-6 mb-10">
          <span
            class="calendar__days__column"
            :key="day"
            v-for="day in daysOfWeek"
            >{{ day }}</span
          >
          <span
            class="calendar__days box-border"
            :key="`${i}-${index}`"
            v-for="(i, index) in buildDaysArray(selectedTime)"
          >
            <span class="calendar__days"> {{ i }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  addMonths,
  buildDaysArray,
  formatMonthName,
  substractMonths
} from "@/utils/date-utils";
import {
  CalendarState,
  CalendarVisibilityState
} from "@/utils/datepicker-state";

export default defineComponent({
  name: "DatePicker",
  props: {
    placeholder: {
      type: String,
      required: false
    },
    disabledFrom: {
      type: Date,
      required: false
    },
    disabledTo: {
      type: Date,
      required: false
    },
    interval: {
      type: String,
      required: false
    }
  },

  setup(props) {
    const calendarVisibilityState = ref(CalendarVisibilityState.Opened);
    const calendarState = ref(CalendarState.SelectQuickActions);
    const daysOfWeek = ref(["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]);
    const selectedTime = ref(new Date());

    buildDaysArray(selectedTime.value);

    return {
      calendarVisibilityState,
      CalendarVisibilityState,
      CalendarState,
      calendarState,
      daysOfWeek,
      buildDaysArray,
      selectedTime,
      formatMonthName,
      addMonths,
      substractMonths,
      ref
    };
  }
});
</script>

<style scoped>
.action__box {
  background-color: #2f3034;
  width: 20rem;
  @apply absolute block rounded-xl -left-2 py-4 top-8;
}
.action__list {
  color: #bab9bf;
  font-weight: bold;
  font-size: 0.9rem;
}
.action__list__item {
  @apply mb-1.5 flex px-4 py-2 items-center cursor-pointer;
}
.action__list li:hover {
  background-color: #242426;
  border-left: 2px solid rgb(248, 113, 113);
  border-right: 2px solid rgb(248, 113, 113);
}
.calendar {
  background-color: #2f3034;
  color: #e6e6e9;
  width: 24rem;
  @apply block absolute rounded-xl -left-2 top-8;
}
.calendar__pickable {
  @apply flex items-center justify-between;
}
.calendar__pickable__chevron {
  font-size: 0.8rem;
  @apply px-4 py-4;
}
.calendar__pickable__chevron span {
  @apply p-2 hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer;
}
.calendar__days {
  @apply w-8 h-8 cursor-pointer font-bold;
}
.calendar__days span {
  @apply hover:bg-red-400 rounded-full w-full h-full flex justify-center items-center;
}
.calendar__days__container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.7rem;
}
.calendar__days__column {
  color: #bab9bf;
  font-size: 0.9rem;
  @apply w-8 h-8 text-center;
}
</style>
