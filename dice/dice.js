
/** @jsx React.DOM */
var Intro = React.createClass({
  index : 1,
  history : [
    ['dice', 'times']
  ],

  getInitialState : function() {
    return {
      result : ''
    }
  },

  getRandomIntInclusive: function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    this.history.push([this.index,value])
    this.index++;
    return value;
  },

  calculate : function(str) {
    var str = str.split('d');
    if(str.length != 2) {
      return 'Error';
    }
    var times = str[0],
        dice  = str[1];

    var r = 0;
    for(var i=0; i<times; i++) {
      r += this.getRandomIntInclusive(1,dice);
    }
    return r;
  },

  update: function(e) {
    var sum = this.calculate(this.refs.diceValue.getDOMNode().value);
    this.replaceState({
      result : sum
    });
    this.renderChart();
  },

  renderChart: function() {
    var data = google.visualization.arrayToDataTable(this.history);
    var options = {
      title: 'd20 calculator',
      hAxis: {title: 'Roll'},
      vAxis: {title: 'Value'},
      legend: 'none',
      trendlines: { 0: {} }
    };
    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  },

  render: function() {
    return (
      <div>
        <h4>testing</h4>
        <input placeholder='1d20' ref='diceValue'/>
        <input className='btn btn-sm' type='submit' onClick={this.update}/>
        <br />
        {this.state.result}
        <br />
        <div id='chart_div'></div>
      </div>
    );
  }
});


React.render(
  <div>
    <Intro/>
  </div>
  ,
  document.getElementById('example')
  );
