Template.postPage.helpers({
	niceDate: function(){
		return this.published.toLocaleDateString();
	},
	testJS: function(){
		return "banana"
	}
});

Template.postPage.onRendered(function(){
	$('body').scrollTop(0);
	
	Chart.defaults.global.responsive = true;
	//Chart.defaults.global.animation = false;
	
	if(this.data.datas){
		var width = $('article').innerWidth();
		_.each(this.data.datas, function(chart){
			var ctx = document.getElementById(chart.id).getContext("2d");
			var ctz = new Chart(ctx);
			switch(chart.type){
				case 'line':
					ctz.Line(chart.data);
					break;
				case 'bar':
					ctz.Bar(chart.data);
					break;
				case 'radar':
					ctz.Radar(chart.data);
					break;
				case 'polar':
					ctz.PolarArea(chart.data);
					break;
				case 'pie':
					ctz.Pie(chart.data);
			}
		});
	}
	
})