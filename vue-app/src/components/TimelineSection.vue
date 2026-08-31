<template>
  <section id="timeline" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">02</span>
        <h2 class="section-title">航行轨迹</h2>
        <span class="section-line"></span>
      </div>
      <div class="timeline" v-reveal>
        <div v-for="t in site.timeline" :key="t.date" class="timeline-item">
          <div class="timeline-date">{{ t.date }}</div>
          <div class="timeline-role">{{ t.role }}</div>
          <div class="timeline-org">{{ t.org }}</div>
          <div class="timeline-desc">{{ t.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
</script>
