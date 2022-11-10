<template>
  <canvas ref="barChart" id="bar-chart" width="400" height="400"></canvas>
</template>

<script>

export default {
    
    props : [
        'propsdata',
    ],

  mounted(){
    var ctx = this.$refs.barChart;
    
    var myChart = new this.$_Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: this.propsdata,
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            onClick(){
                // this.$emit('refresh:chart');        
            },
        }
    });
  }, //mounted

}
</script>

<style>

</style>
