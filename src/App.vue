<template>
  <div class="h-screen flex justify-center items-center flex-col">
    <label class="text-white my-3" for="picker">
      Choissisez une date
    </label>
    <date-picker placeholder="Bonsoir" id="picker" interval="multiple">
      <div class="flex">
        <input type="datetime-local" class="mx-2" placeholder="Date" />
      </div>
    </date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatePicker from "@/components/DatePicker.vue";

export default defineComponent({
  name: "App",
  components: { DatePicker }
});
</script>

<style>
body {
  background-color: #242022;
}
</style>
