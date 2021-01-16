anychart.onDocumentReady(function () {

  // load data
  anychart.data.loadCsvFile("data.json", function (data) {

    // create a data table
    var dataTable = anychart.data.table(0, 'MMM d, yyyy');
    dataTable.addData(data);

    // map data
    var mapping = dataTable.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4 });

    // set the chart type
    var chart = anychart.stock();

    // set the series
    var series = chart.plot(0).candlestick(mapping);
    series.name("EUR USD Trade Data");

    // set the chart title
    chart.title("EUR USD Historical Trade Data");

    // set the container id
    chart.container('container');

    // draw the chart
    chart.draw();

  });

});