'use strict';
/* global _, Modernizr */
/* jshint camelcase: false */

$(function(){

	// Get Query String
	function queryString() {
		return location.search.slice(1).split('&');
	}
	// <=IE8 polyfill
	if ( !Array.prototype.forEach ) {
	    Array.prototype.forEach = function(fn, scope) {
	        for(var i = 0, len = this.length; i < len; ++i) {
	            fn.call(scope, this[i], i, this);
	        }
	    };
	}

	function randomVal(range,min){
		return Math.ceil(Math.random()*range) + min;
	}
	function plusOrMinus(){
		return Math.random()<0.5 ? -1 : 1;
	}

	var dogeInit = false;
	(function doge(){
		dogeInit = true;
		// var svgTemplate = _.template(
		// 	$('#svgTemplate').html()
		// );
		var wowTemplate = _.template(
			$('#wowTemplate').html()
		);

		var textSolo = [
			'wow',
			'excite'
		];
		var q =  _.compact(queryString());
		var nouns = q.length > 0 ? q : ['doge'];
		var textCompound = [
			'v',
			'much',
			'so',
			'such'
		];
		var combinedText = [];
		_.each(nouns,function(n){
			combinedText = _.union(combinedText, _.map(textCompound,function(d){
				return d + ' ' + decodeURIComponent(n);
			}));
		});
		console.log(combinedText);
		var text =  _.union(textSolo,combinedText);

		var $doge = $('.doge'),
			dogeOn = false;

		var playDoge = function(){
			return true;
		};
		var colours = ['lime','cyan','lime','cyan','yellow','pink','blue','red','purple','green','orange','brown','teal'];
		var suchWow = function(duration){
			var ml = randomVal(50,0) * plusOrMinus(),
				mt = randomVal(50,0) * plusOrMinus() + 2,
				id = 'wow'+Math.ceil(Math.random()*999999);
		    var wow = wowTemplate({
				'text': _.sample(text),
				'ml': ml,
				'mt': mt,
				'c': _.sample(colours),
				'id': id
		    });
		    $doge.append(wow);
			$('#'+id)
				.fadeIn(400)
				.css({'margin-top': mt - 3 +'%' })
				.delay(duration)
				.fadeOut(500,function(){
					$(this).remove();
				});
		};
		
		function loop(){
			var duration = 1000,
				interval = randomVal(200,0);
			setTimeout(function(){
				suchWow(duration);
				if (playDoge()){
					loop();
				} else {
					dogeOn = false;
				}
			},interval);
		}
		loop();
		// $window.scroll(function(){
			// if (playDoge() && !dogeOn) {
			// 	dogeOn = true;
			// 	loop();
			// }
		// });
	})();

	$('#suchForm').on('submit',function(e){
		e.preventDefault();
		var words = $(this).find('#suchInput').val().split(',').join('&');
		window.open('?'+words,'_self');
		console.log(words);
	});


	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function(){
			var ph = $(this).attr('placeholder');
			$(this).val(ph);
			$(this).focus(function(){
				if (this.value === ph) {this.value = '';}
			});
			$(this).blur(function(){
				if (this.value === '') {this.value = ph;}
			});
		});
	}
});