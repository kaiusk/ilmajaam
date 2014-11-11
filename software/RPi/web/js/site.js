function HashtagService(){var callbacks={"navigation":[]};var pub={};var args={};var retainHashNavigation=true;function construct(){pub.updateArgs();window.onhashchange=function(){pub.onHashChange();};return this;}
pub.on=function(event,fn){callbacks[event].push(fn);}
pub.trigger=function(event,parameters){for(var i in callbacks[event]){if(typeof parameters!=="undefined"){callbacks[event][i](parameters);}else{callbacks[event][i]();}}}
pub.onHashChange=function(){if(window.location.hash.substr(1)!==pub.getHash()){var oldHash=pub.argsFromHash(pub.getHash());var newHash=pub.argsFromHash(window.location.hash.substr(1));pub.trigger("navigation",{oldHash:oldHash,newHash:newHash});}}
pub.updateArgs=function(){args=this.argsFromHash(window.location.hash);return this;}
pub.argsFromHash=function(hash){if(typeof hash!=="string"||!hash)return{};if(hash.substr(0,1)==="#"){hash=hash.substr(1);}
hash=hash.split("/");var length=hash.length;var arguments={};var values=false;for(var i=0;i<length;i+=2){if(hash[i]==="")continue;values=hash[i+1].split(",");arguments[hash[i]]=values;}
return arguments;}
pub.updateHash=function(){var hash=this.getHash();if(hash==""){this.removeHash();}else{window.location.hash=this.getHash();}
return this;}
pub.removeHash=function(){var scrollV,scrollH;scrollV=document.body.scrollTop;scrollH=document.body.scrollLeft;window.location.hash="";document.body.scrollTop=scrollV;document.body.scrollLeft=scrollH;}
pub.hashFromArgs=function(arguments){if(typeof arguments==="undefined"||!arguments)arguments=args;var hash=[];for(var i in arguments){if(typeof arguments[i]==="string"){if(arguments[i]!==""){hash.push(i+"/"+arguments[i]);}}else if(typeof arguments[i]==="object"){if(arguments[i].length>0){hash.push(i+"/"+arguments[i].join(","));}}}
return hash.join("/");}
pub.getHash=function(){return this.hashFromArgs(args);}
pub.getArgs=function(){return args;}
pub.set=function(argument,value){args[argument]=value;this.updateHash();return this;}
pub.get=function(argument){pub.updateArgs();if(typeof args[argument]==="undefined")return false;return args[argument];}
pub.retainHashNavigation=function(bool){if(typeof bool!=="undefined"){retainHashNavigation=bool;}else{return retainHashNavigation;}}
construct();return pub;}
function Slider(jQueryObject,properties){this.slider=false;this.activeIndex=0;this.callbacks={'slide':[],'play':[],'pause':[]};this.init=function(jQueryObject,properties){var self=this;if(typeof jQueryObject!=="object")return false;if(typeof jQueryObject.length=="undefined"||jQueryObject.length<1)return false;this.imageSlider=jQueryObject;this.controls=this.imageSlider.find(".controls");this.sliderDOM=this.imageSlider.find(".bar");this.slides=properties.slides||false;this.markers={};this.markers.type=this.imageSlider.data("markertype")||"none";this.markers.start=this.imageSlider.data("start")||properties.min||0;this.markers.count=properties.max||54;this.markers.step=this.imageSlider.data("step")||3600;this.controls.show();this.slider=this.sliderDOM.slider({orientation:properties.orientation,value:properties.value,min:properties.min,max:properties.max,slide:function(event,ui){self.slideEvent(event,ui);}});this.setupMarkers();return this;}
this.on=function(event,fn){this.callbacks[event].push(fn);return this;}
this.trigger=function(event,args){for(var i in this.callbacks[event]){if(typeof args!=="undefined"){this.callbacks[event][i](args);}else{this.callbacks[event][i]();}}
return this;}
this.slideEvent=function(event,ui){this.slideTo(ui.value)}
this.slideTo=function(index){this.activeIndex=index;this.slider.slider("value",index);this.trigger("slide",index);}
this.nextSlide=function(){var next=this.activeIndex+1;if(this.slider.slider("option","max")<next)
next=this.slider.slider("option","min");this.slideTo(next);}
this.togglePlay=function(){if(this.playing){this.pause();}else{this.play();}}
this.play=function(){var self=this;this.playing=true;this.playInterval=setInterval(function(){self.nextSlide();},1000/2);this.controls.find(".animate").removeClass("play").addClass("pause");this.trigger("play");}
this.pause=function(){this.playing=false;clearInterval(this.playInterval);this.controls.find(".animate").removeClass("pause").addClass("play");this.trigger("pause");}
this.pad=function(n,width,z){z=z||'0';n=n+'';return n.length>=width?n:new Array(width-n.length+1).join(z)+n;}
this.setupMarkers=function(){var markers=this.imageSlider.find(".markers");var fullWidth=markers.width();var start=this.markers.start;var step=this.markers.step;var count=this.markers.count;var lang=window.icl_language_code||"et";var time,localHours;var max=start+(step*count);var nth=0;var positionLeft=0;switch(this.markers.type){case"midnightDate":for(var i=start;i<=max;i+=step){positionLeft=nth*(fullWidth/count);time=moment(i*1000).tz(_var.timezone);localHours=time.hours();localMins=time.minutes();if(nth==0||(localHours==0&&localMins==0)){markers.append('<div style="left:'+positionLeft+'px" class="marker emphasis marker-i-'+nth+'"><span class="mark"></span><time>'+moment.weekdaysShort(time.day())+'</time></div>');}else if(localHours==12||localHours==6||localHours==18){markers.append('<div style="left:'+positionLeft+'px" class="marker small-emphasis marker-i-'+nth+'"><span class="mark"></span><time>'+localHours+':'+this.pad(localMins,2)+'</time></div>');}else{markers.append('<div style="left:'+positionLeft+'px" class="marker tiny-emphasis marker-i-'+nth+'"><span class="mark"></span></div>');}
nth+=1;}
break;case"elementsDate":for(var i=0;i<=this.slides.length-1;i+=1){positionLeft=nth*(fullWidth/count);time=moment(this.slides.eq(i).data("datetime")*1000).tz(_var.timezone);localHours=time.hours();localMins=time.minutes();if(nth==0||(localHours==0&&localMins==0)){markers.append('<div style="left:'+positionLeft+'px" class="marker emphasis marker-i-'+nth+'"><span class="mark"></span><time>'+moment.weekdaysShort(time.day())+'</time></div>');}else if(localHours==12||localHours==6||localHours==18){markers.append('<div style="left:'+positionLeft+'px" class="marker small-emphasis marker-i-'+nth+'"><span class="mark"></span><time>'+localHours+':'+this.pad(localMins,2)+'</time></div>');}else{markers.append('<div style="left:'+positionLeft+'px" class="marker small-emphasis marker-i-'+nth+'"><span class="mark"></span><time>'+localHours+':'+this.pad(localMins,2)+'</time></div>');}
nth+=1;}
break;default:for(var i=start;i<=max;i+=step){positionLeft=nth*(fullWidth/count);markers.append('<div style="left:'+positionLeft+'px" class="marker small-emphasis marker-i-'+nth+'"><span class="mark"></span></div>');nth+=1;}
break;}}
this.timeValueAtIndex=function(index){var start=this.markers.start;var step=this.markers.step;return moment(1000*(start+index*step)).tz(_var.timezone);}
this.nearestIndexForDate=function(unixTimestamp){var start=this.markers.start;var step=this.markers.step;var count=this.markers.count;var max=start+(step*count);var goal=unixTimestamp;var closest=null;for(var i=start;i<=max;i+=step){if(closest==null||Math.abs(i-goal)<Math.abs(closest-goal)){closest=i;}}
return(closest-start)/step;}
return this.init(jQueryObject,properties);}
Date.prototype.getMonthName=function(lang){lang=lang&&(lang in Date.locale)?lang:'en';return Date.locale[lang].month_names[this.getMonth()];};Date.prototype.getMonthNameShort=function(lang){lang=lang&&(lang in Date.locale)?lang:'en';return Date.locale[lang].month_names_short[this.getMonth()];};Date.prototype.getDayName=function(lang){lang=lang&&(lang in Date.locale)?lang:'en';return Date.locale[lang].day_names[this.getDay()];};Date.prototype.getDayNameShort=function(lang){lang=lang&&(lang in Date.locale)?lang:'en';return Date.locale[lang].day_names_short[this.getDay()];};Date.locale={en:{day_names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],day_names_short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],month_names:['January','February','March','April','May','June','July','August','September','October','November','December'],month_names_short:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']},et:{day_names:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"],day_names_short:["P","E","T","K","N","R","L"],month_names:['Jaanuar','Veebruar','Märts','Aprill','Mai','Juuni','Juuli','August','September','Oktoober','November','Detsember'],month_names_short:['Jaan','Veeb','Mär','Apr','Mai','Juun','Juul','Aug','Sept','Okt','Nov','Dets']},ru:{month_names:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],month_names_short:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],day_names:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],day_names_short:['вск','пнд','втр','срд','чтв','птн','сбт']}};var SliderMap=Class.extend({init:function(jQueryObject){this.imageSlider=jQueryObject;this.imageContainer=this.imageSlider.find(".images");this.images=this.imageContainer.find("img");this.playButton=this.imageSlider.find(".animate");this.animation=false;this.activeIndex=0;this.slider=false;this.sliderDOM=this.imageSlider.find(".common-slider");},slideTo:function(index){this.imageContainer.find("img").hide().removeClass("active").eq(index).show().addClass("active");this.activeIndex=index;return this;},adjustHeight:function(){this.imageContainer.height(this.imageContainer.find(".active").height());},setUpSlider:function(){var self=this;this.slider=new Slider(this.sliderDOM,{orientation:"horizontal",value:0,min:0,max:this.images.length-1});this.slider.on("slide",function(index){self.slideTo(index);});if(this.sliderDOM.data("start")){this.setUpTimeInfo();this.slider.slideTo(this.slider.nearestIndexForDate(_var.unixTimestamp));}else{this.slider.slideTo(this.images.length-1);}},setUpPlayButton:function(){var self=this;this.playButton.click(function(e){e.preventDefault();self.slider.togglePlay();});},setUpTimeInfo:function(){var self=this;this.imageSlider.find(".timeinfo").removeClass("hidden");this.leftTimeUI=new TimeInfo(this.imageSlider.find(".timeinfo .utc"));this.rightTimeUI=new TimeInfo(this.imageSlider.find(".timeinfo .local"));this.leftTimeUI.show();this.rightTimeUI.show();this.slider.on("slide",function(index){self.refreshUI();});self.refreshUI();},refreshUI:function(){var date1=this.slider.timeValueAtIndex(this.activeIndex);var date2=this.slider.timeValueAtIndex(this.activeIndex);this.leftTimeUI.setTime(date1);this.rightTimeUI.setTime(date2);}});jQuery(document).ready(function($){$('.debug div, .debug section, .debug hgroup').each(function(){var label=$(this).prop("tagName");if($(this).attr("id")){label+="#"+$(this).attr("id");}
$(this).append($('<div />').addClass('debugtag').text(label));});});var EmhiMap=Class.extend({"init":function(element){this.element=element;this.loadedStations=false;this.stations="49, 61";this.lat_start=59.58;this.long_start=21.6;this.lat_end=57.54;this.long_end=28.2;this.width=element.width();this.height=element.height();this.lat_ratio=this.height/Math.abs(this.lat_start-this.lat_end);this.long_ratio=this.width/Math.abs(this.long_start-this.long_end);this.loadStations();},"loadStations":function(){var self=this;$.get(template_root+'/api.php',{'get':'stations','include':this.stations},function(stations){self.loadedStations=stations;self.paintStationsToMap();});},"paintStationsToMap":function(){var stations=this.loadedStations;for(var i in stations){station=stations[i];var latitude=this.DMStoDEC(parseFloat(station["LaiusKraad"]),parseFloat(station["LaiusMinut"]),parseFloat(station["LaiusSekund"]));var longitude=this.DMStoDEC(parseFloat(station["PikkusKraad"]),parseFloat(station["PikkusMinut"]),parseFloat(station["PikkusSekund"]));var pos_y=Math.round((this.lat_start-latitude)*this.lat_ratio);var pos_x=Math.round((longitude-this.long_start)*this.long_ratio);try{this.element.append($("<div />").addClass("point").css({"left":pos_x,"top":pos_y}));}catch(e){alert(e);}}},"DMStoDEC":function(deg,min,sec){return deg+(((min*60)+(sec))/3600);}});var Sprite=function(src,settings){this.src=src;this.image=null;this.numFrames=null;this.timeout=null;this.startTime=null;this.callbacks={};this.width=56;this.height=57;this.container=null;this.currentFrame=0;this.animSpeed=30;this.on=function(name,event){if(typeof this.callbacks[name]==="undefined"){this.callbacks[name]=[];}
this.callbacks[name].push(event);return this;}
this.trigger=function(name){if(!this.callbacks[name])return false;for(var i in this.callbacks[name]){this.callbacks[name][i].apply(this);}
return this;}
this.load=function(){var self=this;if(!this.image){this.image=new Image();this.image.src=this.src;this.startTime=new Date().getTime();}
if(this.timeout){clearTimeout(this.timeout);this.timeout=null;}
this.timeout=setTimeout(function(){if(self.isImageLoaded()){self.loaded();}else{self.load();}},10);this.trigger("load");return this;}
this.isImageLoaded=function(){if(!this.image.complete){return false;}
if(typeof this.image.naturalWidth!="undefined"&&this.image.naturalWidth==0){return false;}
return true;}
this.loaded=function(){this.imageWidth=this.image.naturalWidth||this.image.width;this.imageHeight=this.image.naturalHeight||this.image.height;this.trigger("complete");return this;}
this.startAnimation=function(){this.columns=this.imageWidth/this.width;this.rows=this.imageHeight/this.height;if(!this.container){console.error("Sprite container not set: "+this.src);return false;}
this.container.width(this.width);this.container.height(this.height);this.container.css({width:this.width,height:this.height,background:"url('"+this.src+"') no-repeat"});var self=this;this.animInterval=setInterval(function(){self.loop()},1000/this.animSpeed);return this;}
this.stopAnimation=function(){var self=this;clearInterval(this.animInterval);this.animInterval=null;return this;}
this.loop=function(){this.nextFrame();this.trigger("update");return this;}
this.nextFrame=function(){this.currentFrame+=1;if(this.currentFrame>(this.frames-1))this.currentFrame=0;var posLeft=(this.currentFrame*this.width)%this.imageWidth;var posTop=this.height*Math.floor(this.currentFrame*this.width/this.imageWidth);var cssString=posLeft*(-1)+"px "+posTop*(-1)+"px";this.container[0].style.backgroundPosition=cssString;return this;}
this.load();return this;}
var World=function(){this.entities=[];this.addEntity=function(entity){this.entities.push(entity);return this;}
this.stopAllAnimations=function(){for(var i in this.entities){this.entities[i].stopAnimation();}
return this;}}
function TimeInfo(jQueryObject){this.dom=jQueryObject;this.utc=false;this.format="YYYY-MM-DD";this.init=function(){if(this.dom.hasClass("utc")){this.utc=true;}
if(this.dom.data("format")){this.format=this.dom.data("format");}
return this;}
this.setText=function(text){this.dom.text(text);}
this.setTime=function(DateObject){var text;if(this.utc){text=DateObject.utc().format('YYYY-MM-DDTH:mm')+" UTC";}else{if(this.format=="calendar"){}else{text=DateObject.format(this.format);}}
this.setText(text);}
this.show=function(){this.dom.removeClass("hidden");}
this.hide=function(){this.dom.addClass("hidden");}
this.convertDateToUTC=function(DateObject){return new Date(DateObject.getUTCFullYear(),DateObject.getUTCMonth(),DateObject.getUTCDate(),DateObject.getUTCHours(),DateObject.getUTCMinutes(),DateObject.getUTCSeconds());}
return this.init();}
function HirlamImage(url){this.x=0;this.y=0;this.url=false;this.imageLoaded=false;this.image=false;this.init=function(url){this.url=url;}
this.load=function(callback){var self=this;this.image=new Image();this.image.onload=function(){self.loaded(callback)};this.image.src=this.url;this.show();this.hide();}
this.loaded=function(callback){this.imageLoaded=true;if(typeof callback!=="undefined"){callback();}}
this.isLoaded=function(){return this.imageLoaded;}
this.hide=function(){this.image.style.visibility="hidden";}
this.show=function(){this.image.style.visibility="visible";}
this.init(url);}
function HirlamLayer(){this.images=[];this.visible=false;this.name="";this.imagesLoaded=false;this.nrOfImagesLoaded=0;this.callbackComplete=null;this.loading=false;this.index=0;this.category=false;this.category_default=false;this.load=function(callbackUpdate,callbackComplete){var self=this;this.loading=true;if(typeof callbackComplete!=="undefined")this.callbackComplete=callbackComplete;for(var i in this.images){this.images[i].load(function(){self.checkLoaded();if(typeof callbackUpdate!=="undefined")callbackUpdate(this);});}}
this.loaded=function(){this.loading=false;this.imagesLoaded=true;if(this.callbackComplete)this.callbackComplete(this);}
this.checkLoaded=function(){var count=0;for(var i in this.images){if(!this.images[i].isLoaded())continue;count+=1;}
if(count>=this.images.length){this.loaded();}
this.nrOfImagesLoaded=count;return this;}
this.show=function(){this.visible=true;return this;}
this.hide=function(){this.visible=false;return this;}
this.hideAll=function(){for(var i in this.images){this.images[i].hide();}
this.hide();return this;}
this.showAll=function(){for(var i in this.images){this.images[i].show();}
this.show();return this;}
this.addImage=function(hirlamImage){this.images.push(hirlamImage);return this;}
this.setName=function(name){this.name=name;return this;}
this.getName=function(){return this.name;}
this.setCategory=function(name){this.category=name;}
this.getCategory=function(){return this.category;}
this.setIndex=function(index){this.index=index;}
this.getIndex=function(){return this.index;}
this.isCategoryDefault=function(bool){if(typeof bool=="undefined")return this.category_default;this.category_default=(bool);return this;}
this.isVisible=function(){return this.visible;}
this.isLoaded=function(){return this.imagesLoaded;}
this.isLoading=function(){return this.loading;}
this.getImageCount=function(){return this.images.length;}
this.getLoadedImagesCount=function(){return this.nrOfImagesLoaded;}
this.getImageByIndex=function(index){if(typeof index!=="undefined"){return this.images[index];}}}
function HirlamLegend(settings){this.dom=null;this.code=settings.code;this.init=function(settings){this.dom=$("<div />");this.dom.addClass("legend hidden");this.dom.addClass("legend_"+settings.code);this.image=$("<img />");this.image.attr("src",settings.image);this.src=settings.image;this.title=$("<p />").addClass("title");this.title.text(settings.title);this.dom.append(this.title);this.dom.append(this.image);return this;}
this.getjQueryObject=function(){return this.dom;}
this.show=function(){this.dom.removeClass("hidden");}
this.hide=function(){this.dom.addClass("hidden");}
return this.init(settings);}
function HirlamLegends(jQueryObject,settings){this.legends=[];this.settings=settings;this.dom=jQueryObject;this.init=function(jQueryObject){this.dom=jQueryObject;return this;}
this.showLegend=function(code){var legend=this.getLegendByCode(code);if(!legend){this.createLegend(code);legend=this.getLegendByCode(code);}
if(legend)
legend.show();}
this.hideLegend=function(code){var legend=this.getLegendByCode(code);if(legend){legend.hide();}}
this.createLegend=function(code){if(typeof this.settings[code]!=="undefined"){var settings=this.settings[code];var newLegend=new HirlamLegend(settings);this.legends.push(newLegend);this.dom.append(newLegend.getjQueryObject());}}
this.getLegendByCode=function(code){for(var i in this.legends){if(this.legends[i].code==code)return this.legends[i];}
return false;}
return this.init(jQueryObject);}
function HirlamMap(jQueryObject){this.element=null;this.layers=[];this.legends=null;this.imageBaseURL="";this.activeIndex=0;this.playing=false;this.slider=false;this.imagesToLoadUI=0;this.totalImagesLoaded=0;this.hashtagService={set:function(){}};this.doHashUpdate=true;this.callbacks={"loadComplete":[],"layerLoadComplete":[]};this.init=function(jQueryObject){if(typeof jQueryObject!=="undefined"){this.element=jQueryObject;}
if(typeof window.hashtagService!=="undefined"){this.hashtagService=window.hashtagService;}
this.setupEventListeners();return this;}
this.on=function(event,fn){this.callbacks[event].push(fn);}
this.trigger=function(event,parameters){for(var i in this.callbacks[event]){if(typeof parameters!=="undefined"){this.callbacks[event][i](parameters);}else{this.callbacks[event][i]();}}}
this.setupUI=function(){var self=this;this.leftTimeUI=new TimeInfo(this.element.find(".timeinfo .utc"));this.rightTimeUI=new TimeInfo(this.element.find(".timeinfo .local"));this.element.find(".timeinfo").removeClass("hidden");this.leftTimeUI.show();this.rightTimeUI.show();this.slider.on("slide",function(index){self.refreshUI();});this.refreshUI();}
this.refreshUI=function(){var date1=this.slider.timeValueAtIndex(this.activeIndex);var date2=this.slider.timeValueAtIndex(this.activeIndex);this.leftTimeUI.setTime(date1);this.rightTimeUI.setTime(date2);}
this.setupLegends=function(legendSettings){this.legends=new HirlamLegends(this.element.find(".legends_container"),legendSettings);return this;}
this.setupLayers=function(layers){var index=1;var length=0;for(var i in layers)length+=1;for(var i in layers){var new_layer=new HirlamLayer();var imageCount=0;for(var j in layers[i].images)imageCount+=1;for(var j=0;j<imageCount;j++){new_layer.addImage(new HirlamImage(this.getImageBaseURL()+"/"+layers[i].images[j]));new_layer.setName(i);if(layers[i]["index"]>0){new_layer.setIndex(layers[i]["index"]);}else{new_layer.setIndex(index);}
if(jQuery.inArray("category_default",layers[i].behaviour)>-1)
new_layer.isCategoryDefault(true);}
new_layer.setCategory(layers[i].category);this.addLayer(new_layer);index+=1;}
return this;}
this.toggleLayer=function(layerName){var self=this;var layer=this.getLayerByName(layerName);if(!layer)return false;if(layer.isVisible()){this.hideLayer(layer);}else{this.showLayer(layer);}
return this;}
this.showLayer=function(layer){var self=this;if(typeof layer=="string"){layer=this.getLayerByName(layer);}
if(layer.isLoaded()){layer.show();layer.getImageByIndex(this.activeIndex).show();this.legends.showLegend(layer.getName());}else{this.showLoadingBar();this.imagesToLoadUI+=layer.images.length;layer.load(function(){self.updateLoadingBar(true);},function(layer){self.layerLoadComplete(layer);});this.updateLoadingBar();}
this.updateHash();this.updateMenu();}
this.hideLayer=function(layer){if(typeof layer=="string"){layer=this.getLayerByName(layer);}
if(layer.isVisible()){layer.hide();layer.getImageByIndex(this.activeIndex).hide();this.legends.hideLegend(layer.getName());this.updateHash();this.updateMenu();}}
this.hideAllLayers=function(){for(var i in this.layers){this.hideLayer(this.layers[i]);}}
this.getLayerByName=function(layerName){for(var i in this.layers){if(this.layers[i].getName()==layerName)return this.layers[i];}
return false;}
this.addLayer=function(hirlamLayer){this.layers.push(hirlamLayer);return this;}
this.setupEventListeners=function(){var self=this;this.element.find(".layercontrol").click(function(e){e.preventDefault();e.stopPropagation();var name=$(this).data("name");if(name=="_hideAll"){self.hideAllLayers();}else{self.toggleLayer($(this).data("name"));}});this.element.find(".animate").click(function(e){e.preventDefault();self.slider.togglePlay();});this.element.find(".category-button").click(function(e){e.preventDefault();var isActive=$(this).hasClass("active");self.hideCategory($(this).data("name"));if(!isActive){self.showCategoryDefaults($(this).data("name"));}});return this;}
this.hideCategory=function(name){for(var i in this.layers){if(this.layers[i].getCategory()!=name||!this.layers[i].isVisible())continue;this.hideLayer(this.layers[i]);}
this.updateMenu();this.updateHash();return this;}
this.showCategoryDefaults=function(name){for(var i in this.layers){if(this.layers[i].getCategory()!=name||this.layers[i].isVisible()||!this.layers[i].isCategoryDefault())continue;this.toggleLayer(this.layers[i].getName());}
this.updateMenu();this.updateHash();};this.updateMenu=function(){this.element.find(".category-button").removeClass("active");this.element.find(".layercontrol").removeClass("active");for(var i in this.layers){if(this.layers[i].isVisible()){var layerName=this.layers[i].getName();var node=this.element.find('.layercontrol[data-name="'+layerName+'"]');node.addClass("active");node.parents(".category").find(".category-button").addClass("active");}}
return this;}
this.updateHash=function(){if(this.hashUpdating()){var visibleLayers=[];for(var i in this.layers){if(this.layers[i].isVisible()){visibleLayers.push(this.layers[i].getName());}}
this.hashtagService.set("layers",visibleLayers);}}
this.hashUpdating=function(bool){if(typeof bool!=="undefined"){this.doHashUpdate=bool;return this;}
return this.doHashUpdate;}
this.setImageBaseURL=function(url){if(typeof url!=="string")return false;if(url.substr(-1)=='/')url=url.substr(0,url.length-1);this.imageBaseURL=url;return this;}
this.getImageBaseURL=function(){return this.imageBaseURL;}
this.showLoadingBar=function(){this.element.find(".loadingbar").fadeIn(200);}
this.hideLoadingBar=function(){var self=this;setTimeout(function(){self.element.find(".loadingbar").fadeOut(200);},500);}
this.updateLoadingBar=function(imageLoaded){var imagesToLoad=0;var imagesLoaded=0;if(typeof imageLoaded!=="undefined"){this.totalImagesLoaded+=1;}
for(var i in this.layers){if(this.layers[i].isLoading()){imagesToLoad+=this.layers[i].getImageCount();imagesLoaded+=this.layers[i].getLoadedImagesCount();}}
if(imagesToLoad===0){this.imagesToLoadUI=0;this.totalImagesLoaded=0;var percentage=100;this.element.find(".loadingbar .header span").text("100%");this.hideLoadingBar();this.trigger("loadComplete");}else{var percentage=Math.floor(this.totalImagesLoaded/this.imagesToLoadUI*100);this.element.find(".loadingbar .header span").text(this.totalImagesLoaded+" / "+this.imagesToLoadUI);}
this.element.find(".progress .bar").css("width",percentage+"%");}
this.layerLoadComplete=function(layer){this.addLayerToDOM(layer);layer.show();layer.getImageByIndex(this.activeIndex).show();this.legends.showLegend(layer.getName());this.updateMenu();this.updateHash();this.trigger("layerLoadComplete",layer);}
this.addLayerToDOM=function(layer){var new_layer=$("<div />").attr("id","layer_"+layer.getName()).css({"z-index":layer.getIndex()}).addClass("layer");for(var i in layer.images){new_layer.append(layer.images[i].image);}
new_layer.appendTo(this.element.find("#hirlam_layers"));layer.domReference=new_layer;}
this.getMaxImageCount=function(){var max=0;for(var i in this.layers){if(this.layers[i].images.length>max){max=this.layers[i].images.length;}}
return max;}
this.setupSlider=function(){this.imageSlider=this.element.find("#hirlam_slider");this.controls=this.imageSlider.find(".controls");this.controls.show();var self=this;this.slider=new Slider(this.imageSlider,{orientation:"horizontal",value:0,min:0,max:this.getMaxImageCount()-1});this.slider.on("slide",function(index){self.slideTo(index);});this.slider.slideTo(this.slider.nearestIndexForDate(_var.unixTimestamp));return this;}
this.slideTo=function(index){for(var i in this.layers){if(!this.layers[i].isVisible())continue;if(this.layers[i].getImageByIndex(index)){if(!this.layers[i].imagesLoaded)continue;this.layers[i].getImageByIndex(this.activeIndex).hide();this.layers[i].getImageByIndex(index).show();}}
this.activeIndex=index;}
return this.init(jQueryObject);}
function ImageLens(src){var pub={}
var original,imageSize,naturalSize,offset,ready,root,lens,bgPos,visible,pos=false;var lensSize={"x":300,"y":300};pub.init=function(element){var element=element||false;root=$("body");if(element){original=element;}
this.image(element);return this;}
pub.image=function(element){if(typeof element==="undefined")return original;if(element===false)return false;if(element.length<1||!element.attr("src")){return false;}
var self=this;original=element;this.imageOffset();this.createLens();original.mousemove(function(e,proxyEvent){if(typeof proxyEvent!=="undefined"){e.pageX=proxyEvent.pageX;e.pageY=proxyEvent.pageY;}
self.onMouseMove({"x":e.pageX,"y":e.pageY});});original.hover(function(){self.onMouseIn();},function(){self.onMouseOut();});lens.mousemove(function(e){original.trigger("mousemove",e);});lens.hover(function(){original.trigger("mouseenter");},function(){original.trigger("mouseleave");});$(window).resize(function(){self.imageOffset();});return original;}
pub.createLens=function(){if(!root||!original)return false;lens=$("<a />");lens.css({"display":"block","position":"absolute","width":lensSize.x,"height":lensSize.y,"background-color":"#fff","background-image":"url("+original.attr("src")+")","background-repeat":"no-repeat","background-position":"0px 0px"});lens.attr("href",original.attr("src"));lens.addClass("image-lens");root.css({"position":"relative"})
root.append(lens);this.hide();}
pub.imageSizes=function(){if(!original)return false;var naturalWidth=original[0].naturalWidth;var naturalHeight=original[0].naturalHeight;if(naturalWidth&&naturalHeight){naturalSize={"x":naturalWidth,"y":naturalHeight};imageSize={"x":original.width(),"y":original.height()};ready=true;}
return naturalSize;}
pub.imageOffset=function(){offset=original.offset();offset={"x":Math.round(offset.left),"y":Math.round(offset.top)};return offset;}
pub.pos=function(vector){if(typeof vector==="undefined")return pos;if(typeof vector.x==="undefined"||typeof vector.y==="undefined")return false;vector.x=vector.x>>0;vector.y=vector.y>>0;pos=vector;var mouse={"x":vector.x-offset.x,"y":vector.y-offset.y};var ratio={"x":mouse.x/imageSize.x,"y":mouse.y/imageSize.y}
bgPos={"x":-Math.round(naturalSize.x*ratio.x-(lensSize.x/2)),"y":-Math.round(naturalSize.y*ratio.y-(lensSize.y/2))}
return this;}
pub.onImage=function(vector){if(vector.x<offset.x)return false;if(vector.x>offset.x+imageSize.x)return false;if(vector.y<offset.y)return false;if(vector.y>offset.y+imageSize.y)return false;return true;}
pub.update=function(){lens.css({"left":pos.x-(lensSize.x/2)+"px","top":pos.y-(lensSize.y/2)+"px","background-position":bgPos.x+"px "+bgPos.y+"px"});return this;}
pub.onMouseMove=function(vector){if(ready){if(this.onImage(vector)){this.pos(vector);this.show();this.update();}else{this.hide();}}else{this.imageSizes();}
return this;}
pub.onMouseIn=function(e){if(ready){this.show();this.update();}
return this;}
pub.onMouseOut=function(e){if(ready){this.hide();this.update();}
return this;}
pub.show=function(e){if(!visible){lens.show();visible=true;}}
pub.hide=function(e){if(visible){lens.hide();visible=false;}}
pub.init(src);return pub;}
function supportsSvg(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1");}
if(supportsSvg()){}
$(document).ready(function(event){$(".area, .waterbody").hover(function(){var text=$("#tooltip_"+$(this).attr("id")).html();if(text){$("#map_tooltip").html(text).show();}},function(){$("#map_tooltip").empty().hide();});$(".area, .waterbody").mousemove(function(event){var parentOffset=$('#warnings_map').offset();var relX=event.pageX-parentOffset.left;var relY=event.pageY-parentOffset.top;$("#map_tooltip").css({left:relX-$("#map_tooltip").outerWidth()-10,top:relY-($("#map_tooltip").outerHeight()/2)});});});function observationNetworkControl(controls,map){var classes=[];var buttons=controls.find("a");buttons.each(function(){classes.push($(this).data("name"));});buttons.click(function(e){var name=$(this).data("name");buttons.removeClass("active");$(this).addClass("active");map.removeClass(classes.join(" ")).addClass(name);e.preventDefault();});}
function stationsTooltip(){$('#observation-network .station').tooltip({"delay":100});}
jQuery(document).ready(function($){stationsTooltip();});function substringMatcher(strs){return function findMatches(q,cb){var matches,substringRegex;matches=[];substrRegex=new RegExp(q,'i');$.each(strs,function(i,str){if(substrRegex.test(str)){if(matches.length>7)return false;matches.push({value:str});}});console.log(matches)
cb(matches);};};function redirectToFirstLocation(inputElement){if(inputElement.val()===''){inputElement.parent().addClass('not-found');inputElement.tooltip({'title':window._var.locality_notfound_string});inputElement.tooltip('show');return;}
var finder=locationAutocomplete(window._var.locality_autocomplete_url);finder(inputElement.val(),function(locations){if(locations.length>0){var a=document.createElement('a');var glue;var value=locations[0];a.href=window._var.locality_redirect_url;glue='?';if(a.search){glue='&';}
window.location=window._var.locality_redirect_url
+glue
+window._var.locality_request_parameter
+'='
+value.id;}else{inputElement.parent().addClass('not-found');inputElement.tooltip({'title':window._var.locality_notfound_string});inputElement.tooltip('show');}});}
var AjaxForm=function(form){var callbacks=new Array();this.getContainer=function(){return form.parents().find('.ajx-container').first();}
this.showLoader=function(){this.getContainer().prepend(''+'<div style="position:relative;" id="ajax-loader">'+'<div style="z-index:1;position:absolute;right:0;">'+'<img title="Laadin" src="'+_var.template_dir_path+'/images/ajax-loader.gif" />'+'</div>'+'</div>');}
this.hideLoader=function(){$('#ajax-loader').remove();}
this.addToCallbackQueue=function(callback){callbacks.push(callback);}
this.triggerCallbacks=function(context,data){for(var i in callbacks){if(typeof callbacks[i]=='function'){callbacks[i](context,data);}}}
this.submit=function(e){e.preventDefault();this.showLoader();var _this=this;$.ajax({type:form.attr('method'),url:form.attr('action'),dataType:"json",data:form.serialize(),success:function(data){if(data['redirect']){window.location.href=data['redirect'];}
if(data['content']){_this.getContainer().html(data['content']);}
_this.hideLoader();_this.triggerCallbacks($(this),data);}});}}
var AjaxLink=function(link){var callbacks=new Array();this.getContainer=function(){return link.parents().find('.ajx-container').first();}
this.showLoader=function(){this.getContainer().prepend(''+'<div style="position:relative;" id="ajax-loader">'+'<div style="z-index:1;position:absolute;right:0;">'+'<img title="Laadin" src="'+_var.template_dir_path+'/images/ajax-loader.gif" />'+'</div>'+'</div>');}
this.hideLoader=function(){$('#ajax-loader').remove();}
this.addToCallbackQueue=function(callback){callbacks.push(callback);}
this.triggerCallbacks=function(context,data){for(var i in callbacks){if(typeof callbacks[i]=='function'){callbacks[i](context,data);}}}
this.call=function(e){e.preventDefault();var d=new Date();var ajaxUrl=link.attr('href')+'&ajax='+d.getTime();if(link.attr('href').indexOf('-')===-1)
{ajaxUrl=link.attr('href')+'?ajax='+d.getTime();}
this.showLoader();var _this=this;$.ajax({url:ajaxUrl,dataType:"json",success:function(data){if(data['redirect']){window.location.href=data['redirect'];}
if(data['content']){_this.getContainer().html(data['content']);}
_this.hideLoader();_this.triggerCallbacks($(this),data);}});}}
var template_root=window.template_root;var hashtagService=new HashtagService();if(typeof icl_language_code!=="undefined"&&typeof moment!=="undefined"){moment.lang(icl_language_code);}
function animateIcons(){$(".weather-icon, .around_north, .around_south, .around_east, .around_west, .variable_clockwise, .variable_anticlockwise, .variable_winds").each(function(i,icon){var background=$(icon).css("background-image");var width=50;var height=50;var speed=30;var url,canvas,frames,filename,name,sprite=false;background=background.replace(/"/g,"");if(background&&background.slice(0,3)==="url"){url=background.slice(4,-1);}
if(!url)return;if(typeof window.world==="undefined")window.world=new World();filename=url.split("/").pop();name=filename.substr(0,filename.indexOf("."));if($(icon).data("frames")){frames=$(icon).data("frames");}else{frames=parseInt(name.split("-").pop().substring(1));}
if(!frames){console.error("Sprite error: frames not set.");}
sprite=new Sprite(url).on("complete",function(){this.frames=frames;this.container=$(icon);this.width=width;this.height=height;this.animSpeed=speed;this.startAnimation();});});}
function getTextExtractor()
{return(function(){var patternLetters=/[õ]/g;var lookupLetters={"õ":"o"};var letterTranslator=function(match){return lookupLetters[match]||match;}
return function(node){var text=$.trim($(node).text());return text.replace(patternLetters,letterTranslator);}})();}
jQuery(".article_content").ready(function($){$(".tab-navigation a").click(function(e){e.preventDefault();$(this).tab("show");var name=$(this).attr("href").substr(1);var activeTab=hashtagService.set("tab",name);});if(hashtagService.get("tab")){var name=hashtagService.get("tab")[0];$('a[href="#'+name+'"]').tab("show");}
hashtagService.on("navigation",function(){var name=hashtagService.get("tab")[0];$('a[href="#'+name+'"]').tab("show");});});jQuery(document).ready(function($){if(typeof SyntaxHighlighter!=="undefined"){SyntaxHighlighter.all()}
$('input[type="text"]').placeholderFix();if(typeof substringMatcher!=="undefined"&&typeof window.typeaheadPages!=="undefined"){$('#s').typeahead({'hint':false,'highlight':true,'minLength':1,'limit':8},{'name':'header-search','displayKey':'value','source':substringMatcher(window.typeaheadPages)});}
var test_audio=document.createElement("audio");var audio_supported=(test_audio.play)?true:false;if(!audio_supported||(jQuery.browser.msie&&jQuery.browser.version=='9.0')){var player=$(".audioplayer");var width=player.width();var height=Math.ceil((20/200)*width);var src=player.find("source").attr("src");if(src){$(".audioplayer").replaceWith("<object class=\"audioplayer\" type=\"application/x-shockwave-flash\" data=\""+_var.theme_url+"/player/player.swf\" width=\""+width+"\" height=\""+height+"\"><param name=\"movie\" value=\""+_var.theme_url+"/player/player.swf\" /><param name=\"bgcolor\" value=\"#475c90\" /><param name=\"FlashVars\" value=\"mp3="+src+"&amp;showstop=1&amp;showvolume=1&amp;volumewidth=50&amp;volumeheight=10&amp;loadingcolor=66CCFF&amp;bgcolor=003399&amp;bgcolor1=3399FF&amp;bgcolor2=003399&amp;slidercolor1=66CCFF&amp;slidercolor2=3399FF&amp;sliderovercolor=99FFFF&amp;buttoncolor=66CCFF&amp;buttonovercolor=99FFFF&amp;\" /></object>");}}
$('audio').css('visibility','visible');$('.definition').popover({"trigger":"hover","placement":"bottom"});$('.warnings_key').popover({"html":true,"placement":"bottom","content":$(".warnings_key_content").html()});$("#definition-nav a").click(function(e){$("dt, dd").css("background-color","transparent");$($(this).attr("href")+", "+$(this).attr("href")+" + dd").css("background-color","#fafafa");});$('.map .point').tooltip({"delay":100});$('.layercontrol').tooltip({"placement":"bottom"});$(".daytime a").click(function(e){e.preventDefault();var id=$(this).attr("href");$(".tabs a").removeClass("active");$(this).addClass("active");$(".daydata").removeClass("active");$(id).addClass("active");});$("#observation-network-control").each(function(){var control=new observationNetworkControl($(this),$("#observation-network"));});animateIcons();$.tablesorter.addParser({id:'ilmateenistus',is:function(s){return false;},format:function(s){return s.replace('õ','z').replace(/,/g,'');},type:'numeric'});$("table.table").addClass('sortable sorter-ilmateenistus').tablesorter({emptyTo:'bottom',textExtraction:getTextExtractor()});$(".datepicker").datepicker({"dateFormat":"yy-mm-dd"});$(".hourpicker").timepicker({timeFormat:"hh"});$("form.data-time input").change(function(e){$(this).parents("form").submit();});var sliders=$(".slider");window.maps=[];sliders.each(function(index){var slider=new SliderMap($(this));slider.adjustHeight();slider.setUpSlider();slider.setUpPlayButton();window.maps.push(slider);});$(".hirlam_app").each(function(){if(typeof window.hirlam_maps==="undefined")
window.hirlam_maps=[];if(typeof hirlam_layers==="undefined"||hirlam_layers===null)
return false;var type=$(this).data("type");if(!type)return false;var hirlam_map=new HirlamMap($(this));window.hirlam_maps.push(hirlam_map);hirlam_map.hashUpdating(false);hirlam_map.setImageBaseURL(hirlam_layers[type]["layerBaseURL"]).setupLayers(hirlam_layers[type]["layers"]).setupLegends(hirlam_layers[type]["legends"]).setupSlider().setupUI();var layers=hashtagService.get("layers");hirlam_map.on("loadComplete",function(){hirlam_map.hashUpdating(true);hirlam_map.updateHash();});if(layers){for(var i in layers){hirlam_map.toggleLayer(layers[i]);}}else{$(".layercontrol.default").each(function(){hirlam_map.toggleLayer($(this).data("name"));});}
hashtagService.on("navigation",function(hashes){console.log(hashes);var oldHash=hashes.oldHash.layers;var newHash=hashes.newHash.layers;for(var i in oldHash){var layerName=oldHash[i];if(newHash.indexOf(layerName)==-1){hirlam_map.hideLayer(layerName);}}});});var iceMap=$(".static-map-ice img");if(iceMap){var imageLens=new ImageLens(iceMap);}
$('table.table tr').click(function(){$(this).toggleClass('selected');});$('table.table').stickyTableHeaders();});$(function(){if(!(document.documentElement&&document.documentElement.currentStyle&&document.documentElement.runtimeStyle)){return;}
var fixImage=function(imgElement){var image=$(imgElement),height=image.height(),width=imgElement.currentStyle.width;if(/^[\d.]+(px)?$/i.test(width)){width=parseInt(width,10);}else if(/^\d/.test(width)){var left=imgElement.style.left;var rsLeft=imgElement.runtimeStyle.left;imgElement.runtimeStyle.left=imgElement.currentStyle.left;imgElement.style.left=width||0;width=imgElement.style.pixelLeft;imgElement.style.left=left;imgElement.runtimeStyle.left=rsLeft;}
if(width&&height){var ratio=height/width,maxwidth=image.css('max-width'),maxheight=Math.round(parseFloat(maxwidth)*ratio)
+maxwidth.match(/[\d.]+([^\d.]*)$/)[1];image.css('max-height',maxheight);if(/[\d.]+%/.test(imgElement.currentStyle.maxWidth)){image.resize(function(){maxwidth=image.css('max-width');maxheight=Math.round(parseFloat(maxwidth)*ratio)
+maxwidth.match(/[\d.]+([^\d.]*)$/)[1];image.css('max-height',maxheight);});}}};$('img').filter(function(){var isAffected=(this.currentStyle.width!=='inherit'&&this.currentStyle.height==='auto'&&this.currentStyle.maxWidth!=='none'&&this.currentStyle.maxHeight==='none');return(isAffected);}).each(function(){$(this).load(function(){fixImage(this);});if(this.complete)fixImage(this);});});