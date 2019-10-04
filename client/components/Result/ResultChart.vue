<template>
  <div>
    <div id="chartdiv"></div>
    <div id="point">
      <span :style="fontSize">美味しいワインである確率</span>
      <span class="display-3">{{ result }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesThemesDataviz from '@amcharts/amcharts4/themes/dataviz';
import { appStore } from '@/store'


@Component
export default class ResultChart extends Vue {
  private result = 0;

  get fontSize() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return { fontSize: '10px' };
      default:
        return { fontSize: '12px' };
    }
  }

  mounted() {
    am4core.useTheme(am4themesAnimated);
    am4core.useTheme(am4themesThemesDataviz);

    this.result = appStore.result.value;

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.RadarChart);

    chart.data = appStore.wineAttributes.map(w => {
      return {
        category: w.japanese_title,
        value: w.value
      }
    });
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererCircular>());

    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;
    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(-60);
    labelTemplate.location = 0.5;
    labelTemplate.relativeRotation = 90;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererRadial>());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.tooltip.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.columns.template.strokeWidth = 0;
    series.tooltipText = "{valueY}";
    series.columns.template.radarColumn.cornerRadius = 10;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = "vertical";

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.radarColumn.states.create("hover");
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;


    series.columns.template.adapter.add("fill", (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(50);
    chart.cursor.lineY.disabled = true;

  }
}
</script>

<style scoped>
  #chartdiv {
    height: 450px;
  }
  #point{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 240px;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>
