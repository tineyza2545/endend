<template>
  <div align="center">
    <div id="chart">
      <VueApexCharts
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        colors: ['#4BC3E6'],
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      productData: [],
    }
  },
  mounted() {
    this.listData()
  },
  methods: {
    ...mapActions({
      sumForChart: 'admin/sumForChart',
    }),
    async listData() {
      this.productData = await this.sumForChart()
      // console.log(this.productData)

     
      const dataValues =  this.productData.map((item) => item.NAME)
      const dataValues2 =  this.productData.map((item) => item.PID)
      const dataValues3 =  this.productData.map((item) => item.ALLTOTALPRODUCT)

      this.series = [
        {
          name: 'จำนวนแพ็ค',
          data: dataValues2,
        },
      ]

      this.chartOptions = {
        xaxis: {
          categories: dataValues,
        },
      }
    },
  },
}
</script>

<style>
</style>