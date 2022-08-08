/*

Script file to handle API ajax requests and drawing of the grpah every 5 minutes.

*/

var data_ = []
var chart = null;

$( document ).ready(function() {
    refresh_weather_data()
    setInterval(function() { refresh_weather_data() }, 300000);
});

function refresh_weather_data() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=51.455&lon=-0.942&appid=005464511ba0ae8fc0ba04ad5c34c7d4",
        dataType: 'json',
        success: function(raw){
            temp = parseFloat(((raw.main.temp) - 273.15).toPrecision(4))
            date = Date.now()
            data_.push([date, temp])
            console.log(data_)
            plot_chart()
        }
    })
};

function plot_chart(){
    Highcharts.setOptions({
        global : {
            useUTC : true
        }
    });
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart-container-1',
            type: 'line'
        },
        title: {
            text: 'Live, 5-minutely temperature visualisation (Reading) '
        },
        subtitle: {
            text: 'Source: https://home.openweathermap.org/'
        },
        yAxis: {
            title: {
                text: 'Temperature (Celsius)'
            },
            min: 0,
        },
        xAxis: {
            type: "datetime",
            title: {text: "Datetime"},
            labels: {
                rotation: -60,
                align: "right",
                format: '{value:%Y-%m-%d %H:%M}',
            },
            tickPixelInterval: 50,
            tickmarkPlacement: "on",
            id: 'x-axis',
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            data: data_,
            name: "5-min temperature",
            type: undefined
        }],
    });
}
