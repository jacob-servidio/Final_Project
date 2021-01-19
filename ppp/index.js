anychart.onDocumentReady(function () {

  // load data
  anychart.data.loadCsvFile("candle.csv", function (data) {

    // create a data table
    var dataTable = anychart.data.table(0, 'yyyy-mm-dd');
    dataTable.addData(data);

    // map data
    var mapping = dataTable.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4 });

    // set the chart type
    var chart = anychart.stock();

    // set the series
    var series = chart.plot(0).candlestick(mapping);
    series.name("FDX");

    // set the chart title
    chart.title("Stock Over Time");

    // set the container id
    chart.container('candle');

    // draw the chart
    chart.draw();

  });

});