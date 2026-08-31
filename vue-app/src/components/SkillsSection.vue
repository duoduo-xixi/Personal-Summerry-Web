<template>
  <section id="skills" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">01</span>
        <h2 class="section-title">技能矩阵</h2>
        <span class="section-line"></span>
      </div>
      <div class="skills-grid">
        <div
          v-for="(s, i) in site.skills"
          :key="s.name"
          class="skill-card reveal"
          v-reveal
          :style="{ transitionDelay: i * 60 + 'ms' }"
        >
          <div class="skill-icon">{{ s.icon }}</div>
          <div class="skill-name">{{ s.name }}</div>
          <div class="skill-tag">{{ s.tag }}</div>
          <div class="skill-bar">
            <div class="skill-bar-fill" :style="{ width: s.level + '%' }"></div>
          </div>
          <div class="skill-level">{{ s.level }}%</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
</script>
