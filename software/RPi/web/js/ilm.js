/**
 * This meteogram source code is taken from http://www.highcharts.com/demo/combo-meteogram
 * Heavily modified for www.ilmateenistus.ee
 *
 * @author <tarmo.poldme@brainart.ee>
 */

function Meteogram(xml, container) {
    // Parallel arrays for the chart data, these are populated as the XML/JSON file 
    // is loaded
    this.phenomenClasses = [];
    this.phenomenTexts = {'et': [], 'en': [], 'ru': []};
    this.precipitations = [];
    this.windDirections = [];
    this.windDirectionNames = [];
    this.windDirectionIcons = [];
    this.windSpeeds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.xml = xml;
    this.container = container;

    // Run
    this.parseData();
}

/**
 * Function to smooth the temperature line. The original data provides only whole degrees,
 * which makes the line graph look jagged. So we apply a running mean on it, but preserve
 * the unaltered value in the tooltip.
 */
Meteogram.prototype.smoothLine = function (data) {
    var i = data.length,
        sum,
        value;

    while (i--) {
        data[i].value = value = data[i].y; // preserve value for tooltip

        // Set the smoothed value to the average of the closest points, but don't allow
        // it to differ more than 0.5 degrees from the given value
        sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
        data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
    }
};

/**
 * Callback function that is called from Highcharts on hovering each point and returns
 * HTML for the tooltip.
 */
Meteogram.prototype.tooltipFormatter = function (tooltip) {

    // Create the header with reference to the time interval
    var index = tooltip.points[0].point.index,
        ret = '<small>' + Highcharts.dateFormat('%A, %e. %b, %H:%M', tooltip.x) + ' - ' +
            Highcharts.dateFormat('%H:%M', tooltip.points[0].point.to) + '</small><br>';

    // Symbol text
    //ret += '<b>' + this.phenomenTexts[_var.activeLocale][index] + '</b>';

    ret += '<table>';

    // Add all series
    Highcharts.each(tooltip.points, function (point) {
        var series = point.series;
        ret += '<tr><td><span style="color:' + series.color + '">\u25CF</span> ' + series.name +
            ': </td><td style="white-space:nowrap">' + Highcharts.pick(point.point.value, point.y) + ' ' +
            series.options.tooltip.valueSuffix + '</td></tr>';
    });

    // Add wind
    ret += '<tr><td style="vertical-align: top"><span style="color:#2F5DAB">\u25CF</span> ' + _var.translations.wind + ':</td><td style="white-space:nowrap">' + this.windDirectionNames[index] +
        ' (' + Highcharts.numberFormat(this.windSpeeds[index], 1) + ' m/s)</td></tr>';

    // Close
    ret += '</table>';


    return ret;
};

/**
 * Draw the wind arrows. Each arrow path is generated by the windArrow function above.
 */
Meteogram.prototype.drawWindData = function (chart) {
    var meteogram = this;

    $.each(chart.series[0].data, function (i, point) {
        var sprite, arrow, x, y;

        if (meteogram.resolution > 36e5 || i % 2 === 0) {

            // Draw the wind arrows
            x = point.plotX + chart.plotLeft;
            y = 360;

            chart.renderer.image(_var.windIconsPath + meteogram.windDirectionIcons[i], x-10, y-10, 32, 32)
                .attr({
                        title: meteogram.windDirections[i] + ' �'
                    }
                )
                .add();

            chart.renderer.text('<span style="color:#87CEFA; font-size: 14px; letter-spacing: 0">' + Highcharts.numberFormat(meteogram.windSpeeds[i], 1, '.') + '</span>', x + 1, y - 12)
                .attr({
                        title: meteogram.windDirections[i] + ' �'
                    }
                )
                .add();

        }
    });
};

/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    var xAxis = chart.xAxis[0],
        x,
        pos,
        max,
        isLong,
        isLast,
        i;

    for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i++) {

        // Get the X position
        isLast = pos === max + 36e5;
        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        if (this.resolution > 36e5) {
            isLong = pos % this.resolution === 0;
        } else {
            isLong = i % 2 === 0;
        }
        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 48),
            'L', x, chart.plotTop + chart.plotHeight + 32 + 20, 'Z', 'Y', x, x + 50, 'H'])
            .attr({
                'stroke': chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
        if (!isLast) {
            chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + 25, 'H', x + 20]).attr({
                'stroke': chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
                .add();
        }
    }


};

/**
 * Get the title based on the XML data
 */
Meteogram.prototype.getTitle = function () {
    return this.xml.location;
};

/**
 * Build and return the Highcharts options structure
 */
Meteogram.prototype.getChartOptions = function () {
    var meteogram = this;
    var tempSeriesCounter = 0;

    return {
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 65,
            plotBorderWidth: 1,
            width: 1300,
            height: 400
            //backgroundColor: 'transparent'
        },
        title: {
            text: '48 tunni ennustus', //this.getTitle(),
            align: 'left'
        },
        subtitle: {
            text: ' '
        },
        credits: {
            enabled: false
        },

        tooltip: {
            enabled: false
            /*shared: true,
             borderWidth: 0,
             borderRadius: 0,
             shadow: false,
             useHTML: true,
             backgroundColor: "rgba(255,255,255,0.9)",
             formatter: function () {
             return meteogram.tooltipFormatter(this);
             },
             borderColor: '#666666'*/
        },

        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 2 * 36e5, // two hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 50,
            showLastLabel: true,
            labels: {
                format: '{value:%H}',
                style: {
                    fontSize: '14px'
                }
            }
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 20px; letter-spacing: 0px; color: #aaa">%A</span>}',
                align: 'left',
                //x: 3,
                //y: -5
            },
            opposite: true,
            tickLength: 30,
            gridLineWidth: 2
        }],

        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '14px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            // Custom positioner to provide even temperature ticks from top down
            tickPositioner: function () {
                var max = Math.ceil(this.max) + 1,
                    pos = max - 12, // start
                    ret;

                if (pos < this.min) {
                    ret = [];
                    while (pos <= max) {
                        ret.push(pos++);
                    }
                } // else return undefined and go auto

                return ret;

            },
            maxPadding: 0.3,
            tickInterval: 1,
            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0'

        }, { // precipitation axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0

        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'hPa',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '14px',
                    color: '#339900'
                },
                textAlign: 'left',
                x: 3,
                y: 10
            },
            labels: {
                style: {
                    fontSize: '14px',
                    color: '#339900'
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },


        series: [{
            name: _var.translations.temperature,
            data: this.temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                valueSuffix: '�C'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8',
            dataLabels: {
                enabled: true,
                useHTML: true,
                formatter: function () {

                    let marker;
                    const hour = parseInt(Highcharts.dateFormat('%H', this.x), 10);
                    let style = "";
                    //console.log(hour)
                    if (typeof meteogram.phenomenClasses[tempSeriesCounter] != 'undefined' && meteogram.phenomenClasses[tempSeriesCounter] !== "" && hour % 3 === 0) {
                        const title = meteogram.phenomenTexts[_var.activeLocale][tempSeriesCounter];
                        if (hour >= 7 && hour <= 23) {
                            if (tempSeriesCounter === 0) {
                                style = 'margin-left: -10px;';
                            }
                            if ((tempSeriesCounter + 1) === meteogram.phenomenClasses.length) {
                                style = 'margin-right: -15px;';
                            }
                            marker = '<div style="' + style + '" title="' + title + '" class="weather-icon ' + meteogram.phenomenClasses[tempSeriesCounter] + '"/>';
                        } else {
                            marker = '<div style="' + style + '" title="' + title + '" class="night"><div class="weather-icon ' + meteogram.phenomenClasses[tempSeriesCounter] + '"/></div>';
                        }

                    }
                    tempSeriesCounter++;
                    return marker;
                }
            }
        }, {
            name: _var.translations.precipitation,
            data: this.precipitations,
            type: 'column',
            color: '#68CFE8',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            borderWidth: 1,
            borderColor: '#666666',
            shadow: false,
            dataLabels: {
                useHTML: true,
                enabled: true,

                formatter: function () {
                    var marker;
                    if (this.y > 0) {
                        marker = '<div style="z-index: 9000; letter-spacing: 0;">' + Highcharts.numberFormat(this.y, 1, '.') + '</div>';
                    }
                    return marker;
                },
                style: {
                    fontSize: '9px',
                    color: '#000000',
                    zIndex: 9000000
                },
                zIndex: 9000000
            },
            tooltip: {
                valueSuffix: 'mm'
            }
        }, {
            name: _var.translations.pressure,
            color: '#339900',
            data: this.pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' hPa'
            },
            /*dashStyle: 'shortdot',*/
            yAxis: 2
        }]
    }
};

/**
 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {

    this.drawWindData(chart);
    this.drawBlocksForWindArrows(chart);
    animateIcons(); //this comes from init.js and I didn't want to duplicate this code here
};

/**
 * Create the chart. This function is called async when the data file is loaded and parsed.
 */
Meteogram.prototype.createChart = function () {
    var meteogram = this;

    //locale options must be set before chart object is initiated
    Highcharts.setOptions(_var.chartLocaleSettings);

    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
        meteogram.onChartLoad(chart);
    });
};

/**
 * Handle the data.
 * specific data format
 */
Meteogram.prototype.parseData = function () {

    var meteogram = this,
        xml = this.xml,
        pointStart;

    if (!xml || !xml.location.length) {
        $('#graph-loading').hide();
        $('#graph-loading-failed').show();
        return;
    }

    // The returned xml variable is a JavaScript representation of the provided XML, 
    // generated on the server by running PHP simple_load_xml and converting it to 
    // JavaScript by json_encode.
    $.each(xml.forecast.tabular.time, function (i, time) {
        // Get the times - only Safari can't parse ISO8601 so we need to do some replacements 
        var from = time['@attributes'].from + ' UTC',
            to = time['@attributes'].to + ' UTC';

        from = from.replace(/-/g, '/').replace('T', ' ');
        from = Date.parse(from);
        to = to.replace(/-/g, '/').replace('T', ' ');
        to = Date.parse(to);

        if (to > pointStart + 4 * 24 * 36e5) {
            return;
        }

        // If it is more than an hour between points, show all symbols
        if (i === 0) {
            meteogram.resolution = to - from;
        }

        // Populate the parallel arrays
        meteogram.phenomenClasses.push(time.phenomen['@attributes'].className);
        meteogram.phenomenTexts.et.push(time.phenomen['@attributes'].et);
        meteogram.phenomenTexts.en.push(time.phenomen['@attributes'].en);
        meteogram.phenomenTexts.ru.push(time.phenomen['@attributes'].ru);

        meteogram.temperatures.push({
            x: from,
            y: parseInt(time.temperature['@attributes'].value),
            // custom options used in the tooltip formatter
            to: to,
            index: i
        });

        meteogram.precipitations.push({
            x: from,
            y: parseFloat(time.precipitation['@attributes'].value)
        });
        meteogram.windDirections.push(parseFloat(time.windDirection['@attributes'].deg));
        meteogram.windDirectionNames.push(time.windDirection['@attributes'].name);
        meteogram.windDirectionIcons.push(time.windDirection['@attributes'].icon);
        meteogram.windSpeeds.push(parseFloat(time.windSpeed['@attributes'].mps));

        meteogram.pressures.push({
            x: from,
            y: parseFloat(time.pressure['@attributes'].value)
        });

        if (i == 0) {
            pointStart = (from + to) / 2;
        }
    });

    this.smoothLine(this.temperatures);

    this.createChart();
};


$(function () {

    var meteogram = null;

    $.getJSON(
        _var.meteogramDataUri + '&callback=?',
        function (xml) {
            console.log(xml);
            meteogram = new Meteogram(xml, 'graph-container');
        }
    );

    //re-create chart on window resize to render html tooltips correctly
    $(window).on('resize', function () {
        meteogram.createChart();
    });

    /*$('#pikse_kaart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        "dataDateFormat": "HH:NN:SS",
        xAxis: {
            type: 'datetime',
            tickInterval: 60,
            labels: {
                enabled: false
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Kaugus (km)'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            type: 'column',
            data: pikne_data,
            color: "#ffff00",
            pointWidth: 5
        }]
    });*/
});
