//initialize a detector tag with a single view; <name> == detector name, 
//<channelNames> == array of channel names in the order they are to be drawn,
//<headline> == title of display, <URL> == array of URLs to add to the periodic fetch
function initializeSingleViewDetector(name, channelNames, headline, URL){
    var headWrapper = document.createElement('div')
    ,   title = document.createElement('h1')
    ,   viewTitles = ['HV', 'Threshold', 'Rate']
    ,   drawTarget = document.createElement('div')
    ,   plotControlWrap = document.createElement('form')
    ,   plotControlTitle = document.createElement('h3')
    ,   plotControlMinLabel = document.createElement('label')
    ,   plotControlMaxLabel = document.createElement('label')
    ,   plotControlMin = document.createElement('input')
    ,   plotControlMax = document.createElement('input')
    ,   plotScale = document.createElement('select')
    ,   plotScaleLin = document.createElement('option')
    ,   plotScaleLog = document.createElement('option')
    //image has aspect ratio 3:2 and tries to be 80% of the window width, but not more than 80% of the window height
    ,   width = this.offsetWidth
    ,   height = 2*width/3
    ,   i, subdetectorNav, subdetectorNavLabel

    this.name = name;

    //set up data store for detectors
    if(!window.currentData)
        window.currentData = {};
    window.currentData.HV = {};
    window.currentData.threshold = {};
    window.currentData.rate = {};

    //////////////////////
    //Build DOM
    //////////////////////
    //the DOM layout for a detector view is roughly:

    //-----------------------------------
    // h1 Title
    //-----------------------------------
    // input[radio] HV / Thresh / Rate
    //-----------------------------------
    // div drawing area for Kinetic plot
    //
    //
    //
    //-----------------------------------
    // form plot control widget
    //-----------------------------------


    headWrapper.setAttribute('id', this.id+'titleWrapper');
    headWrapper.setAttribute('class', 'subdetectorHeadlineWrap')
    this.appendChild(headWrapper);
    //top nav title
    title.setAttribute('id', this.id+'title');
    title.setAttribute('class', 'subdetectorTitle');
    document.getElementById(this.id+'titleWrapper').appendChild(title);
    document.getElementById(this.id+'title').innerHTML = headline;
    //state nav radio
    for(i=0; i<viewTitles.length; i++){
        subdetectorNav = document.createElement('input')
        subdetectorNav.setAttribute('id', this.id+'goto'+viewTitles[i]);
        subdetectorNav.setAttribute('class', 'subdetectorNavRadio');
        subdetectorNav.setAttribute('type', 'radio');
        subdetectorNav.setAttribute('name', this.id+'Nav');
        subdetectorNav.setAttribute('value', viewTitles[i]);
        subdetectorNav.onchange = this.trackView.bind(this);
        if(i==2) subdetectorNav.setAttribute('checked', true); //default to rate view
        document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNav);
        subdetectorNavLabel = document.createElement('label');
        subdetectorNavLabel.setAttribute('id', this.id+'goto'+viewTitles[i]+'Label');
        subdetectorNavLabel.setAttribute('class', 'subdetectorNavLabel');
        subdetectorNavLabel.setAttribute('for', this.id+'goto'+viewTitles[i]);
        document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNavLabel);
        document.getElementById(this.id+'goto'+viewTitles[i]+'Label').innerHTML = viewTitles[i];
    }
    //div to paint detector in
    drawTarget.setAttribute('id', this.id+'Draw');
    this.appendChild(drawTarget);
    //plot control widget
    plotControlWrap.setAttribute('id', this.id+'PlotControl');
    plotControlWrap.setAttribute('class', 'plotControlWidget');
    this.appendChild(plotControlWrap);
    document.getElementById(this.id+'PlotControl').onchange = this.updatePlotParameters.bind(this);

    plotControlTitle.setAttribute('id', this.id+'PlotControlTitle');
    plotControlWrap.appendChild(plotControlTitle);
    document.getElementById(this.id + 'PlotControlTitle').innerHTML = 'Scale Control'

    plotControlMinLabel.setAttribute('id', this.id+'PlotControlMinLabel');
    plotControlWrap.appendChild(plotControlMinLabel)
    document.getElementById(this.id+'PlotControlMinLabel').innerHTML = 'Min: ';
    plotControlMin.setAttribute('id', this.id + 'PlotControlMin');
    plotControlMin.setAttribute('type', 'number');
    plotControlMin.setAttribute('step', 'any');
    plotControlWrap.appendChild(plotControlMin);

    plotControlMaxLabel.setAttribute('id', this.id+'PlotControlMaxLabel');
    plotControlWrap.appendChild(plotControlMaxLabel)    
    document.getElementById(this.id+'PlotControlMaxLabel').innerHTML = 'Max: ';
    plotControlMax.setAttribute('id', this.id + 'PlotControlMax');
    plotControlMax.setAttribute('type', 'number');
    plotControlMax.setAttribute('step', 'any');
    plotControlWrap.appendChild(plotControlMax);

    plotScale.setAttribute('id', this.id+'PlotControlScale');
    plotControlWrap.appendChild(plotScale);

    plotScaleLin.setAttribute('id', this.id+'PlotScaleLin');
    plotScaleLin.setAttribute('value', 'lin');
    plotScale.appendChild(plotScaleLin);
    document.getElementById(this.id+'PlotScaleLin').innerHTML = 'Linear';

    plotScaleLog.setAttribute('id', this.id+'PlotScaleLog');
    plotScaleLog.setAttribute('value', 'log');
    plotScale.appendChild(plotScaleLog);
    document.getElementById(this.id+'PlotScaleLog').innerHTML = 'Log';

    ///////////////////////
    //State variables
    ///////////////////////
    this.currentView = 'Rate';
    this.currentUnit = 'Hz';

    ////////////////////////////
    //Define Channels
    ////////////////////////////
    //declare the detector cell names for this detector:
    this.channelNames = channelNames; //['DEMOCHAN00'];
    this.cells = {};

    ////////////////////////////
    //Drawing parameters
    ////////////////////////////
    this.frameLineWidth = 2;
    this.frameColor = '#999999';
    this.width = width;
    this.height = height;

    ///////////////////////////
    //Scale Parameters
    ///////////////////////////
    this.scale = 'ROOT Rainbow';
    this.min = {HV: canHas(localStorage.getItem(name+'HVmin'), 0), 
                Threshold: canHas(localStorage.getItem(name+'Thresholdmin'), 0), 
                Rate: canHas(localStorage.getItem(name+'Ratemin'), 0)
            };
    this.max = {HV: canHas(localStorage.getItem(name+'HVmax'), 3000), 
                Threshold: canHas(localStorage.getItem(name+'Thresholdmax'), 1000),
                Rate: canHas(localStorage.getItem(name+'Ratemax'), 10000)
            };
    this.scaleType = {  HV: canHas(localStorage.getItem(name+'HVscaleType'), 'lin'),
                        Threshold: canHas(localStorage.getItem(name+'ThresholdscaleType'), 'lin'), 
                        Rate: canHas(localStorage.getItem(name+'RatescaleType'), 'lin')
                    };

    //if anything was in local storage, communicate this to the UI:
    plotControlMin.value = this.min[this.currentView];
    plotControlMax.value = this.max[this.currentView];
    plotScale.value = this.scaleType[this.currentView];

    ///////////////////////////
    //Tooltip state
    ///////////////////////////
    this.lastTTindex = -1;

    ////////////////////////////
    //Kinetic.js setup
    ////////////////////////////
    //point kinetic at the div and set up the staging and layers:
    this.stage = new Kinetic.Stage({
        container: this.id+'Draw',
        width: width,
        height: height
    });
    this.mainLayer = new Kinetic.Layer();       //main rendering layer
    this.tooltipLayer = new Kinetic.Layer();    //layer for tooltip info

    //tooltip background:
    this.TTbkg = new Kinetic.Rect({
        x:60,
        y:0,
        width:100,
        height:100,
        fill:'rgba(0,0,0,0.8)',
        stroke: 'rgba(0,0,0,0)',
        listening: false
    });
    this.tooltipLayer.add(this.TTbkg);

    //tooltip text:
    this.text = new Kinetic.Text({
        x: 70,
        y: 10,
        fontFamily: 'Arial',
        fontSize: 16,
        text: '',
        lineHeight: 1.2,
        fill: '#EEEEEE',
        listening: false
    });
    this.tooltipLayer.add(this.text);

    this.errorPattern = new Image();
    this.errorPattern.src = 'static.gif'

    //append data location information to list of URLs to fetch from:
    if(!window.fetchURL)
        window.fetchURL = [];
    for(i=0; i<URL.length; i++){
        if(URL[i] && window.fetchURL.indexOf(URL[i]) == -1){
            window.fetchURL[window.fetchURL.length] = URL[i];
        }
    }
    
    //let repopulate know that the status bar would like to be updated every loop:
    if(!window.refreshTargets)
        window.refreshTargets = [];
    window.refreshTargets[window.refreshTargets.length] = this;
}


function initializeDetector(name, channelNames, headline, URL, viewNames){
    var headWrapper = document.createElement('div')
    ,   title = document.createElement('h1')
    ,   viewTitles = ['HV', 'Threshold', 'Rate']
    ,   drawTarget = document.createElement('div')
    ,   plotControlWrap = document.createElement('form')
    ,   plotControlTitle = document.createElement('h3')
    ,   plotControlMinLabel = document.createElement('label')
    ,   plotControlMaxLabel = document.createElement('label')
    ,   plotControlMin = document.createElement('input')
    ,   plotControlMax = document.createElement('input')
    ,   plotScale = document.createElement('select')
    ,   plotScaleLin = document.createElement('option')
    ,   plotScaleLog = document.createElement('option')
    ,   deckWrap = document.createElement('div')
    ,   plotDeck //= document.createElement('x-deck')
    ,   plotCard //= document.createElement('x-card')
    ,   xString
    ,   deckNavigator
    //image has aspect ratio 3:2 and tries to be 80% of the window width, but not more than 80% of the window height
    ,   width = this.offsetWidth
    ,   height = 2*width/3
    ,   i, subdetectorNav, subdetectorNavLabel

    this.name = name;

    //set up data store for detectors
    if(!window.currentData)
        window.currentData = {};
    window.currentData.HV = {};
    window.currentData.threshold = {};
    window.currentData.rate = {};

    //////////////////////
    //Build DOM
    //////////////////////
    //the DOM layout for a detector view is roughly:

    //-----------------------------------
    // h1 Title
    //-----------------------------------
    // input[radio] HV / Thresh / Rate
    //-----------------------------------
    // x-deck for detector views; each
    // card contains a Kinetic drawing
    // context
    //
    //-----------------------------------
    // x-deck navigation if required
    //-----------------------------------
    // form plot control widget
    //-----------------------------------


    headWrapper.setAttribute('id', this.id+'titleWrapper');
    headWrapper.setAttribute('class', 'subdetectorHeadlineWrap')
    this.appendChild(headWrapper);
    //top nav title
    title.setAttribute('id', this.id+'title');
    title.setAttribute('class', 'subdetectorTitle');
    document.getElementById(this.id+'titleWrapper').appendChild(title);
    document.getElementById(this.id+'title').innerHTML = headline;
    //state nav radio
    for(i=0; i<viewTitles.length; i++){
        subdetectorNav = document.createElement('input')
        subdetectorNav.setAttribute('id', this.id+'goto'+viewTitles[i]);
        subdetectorNav.setAttribute('class', 'subdetectorNavRadio');
        subdetectorNav.setAttribute('type', 'radio');
        subdetectorNav.setAttribute('name', this.id+'Nav');
        subdetectorNav.setAttribute('value', viewTitles[i]);
        subdetectorNav.onchange = this.trackView.bind(this);
        if(i==2) subdetectorNav.setAttribute('checked', true); //default to rate view
        document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNav);
        subdetectorNavLabel = document.createElement('label');
        subdetectorNavLabel.setAttribute('id', this.id+'goto'+viewTitles[i]+'Label');
        subdetectorNavLabel.setAttribute('class', 'subdetectorNavLabel');
        subdetectorNavLabel.setAttribute('for', this.id+'goto'+viewTitles[i]);
        document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNavLabel);
        document.getElementById(this.id+'goto'+viewTitles[i]+'Label').innerHTML = viewTitles[i];
    }
    //plot deck wrapper:
    deckWrap.setAttribute('id', this.id+'DeckWrap');
    this.appendChild(deckWrap);

    //declaring x-tags from within other x-tags needs special treatment via innerHTML; must build HTML string and set it.
    xString = '<x-deck id="' + this.id + 'Deck" selected-index=0>';
    for(i=0; i<viewNames.length; i++){
        xString += '<x-card id="' + this.id+viewNames[i] + 'Card"></x-card>';
    }
    deckWrap.innerHTML = xString;

    //plot buffers
    for(i=0; i<viewNames.length; i++){
        //divs to hold kinetic contexts
        drawTarget = document.createElement('div');
        drawTarget.setAttribute('id', this.id+viewNames[i]+'Draw');
        document.getElementById(this.id+viewNames[i] + 'Card').appendChild(drawTarget);
    }

    //x-deck navigation
    if(viewNames.length > 1){
        deckNavigator = document.createElement('button');
        deckNavigator.innerHTML = 'cycle deck';
        var testID = this.id+'Deck';
        deckNavigator.onclick = function(){
            document.getElementById(testID).shuffleNext();
        }
    }

    //plot control widget
    plotControlWrap.setAttribute('id', this.id+'PlotControl');
    plotControlWrap.setAttribute('class', 'plotControlWidget');
    this.appendChild(plotControlWrap);
    document.getElementById(this.id+'PlotControl').onchange = this.updatePlotParameters.bind(this);

    plotControlTitle.setAttribute('id', this.id+'PlotControlTitle');
    plotControlWrap.appendChild(plotControlTitle);
    document.getElementById(this.id + 'PlotControlTitle').innerHTML = 'Scale Control'

    plotControlMinLabel.setAttribute('id', this.id+'PlotControlMinLabel');
    plotControlWrap.appendChild(plotControlMinLabel)
    document.getElementById(this.id+'PlotControlMinLabel').innerHTML = 'Min: ';
    plotControlMin.setAttribute('id', this.id + 'PlotControlMin');
    plotControlMin.setAttribute('type', 'number');
    plotControlMin.setAttribute('step', 'any');
    plotControlWrap.appendChild(plotControlMin);

    plotControlMaxLabel.setAttribute('id', this.id+'PlotControlMaxLabel');
    plotControlWrap.appendChild(plotControlMaxLabel)    
    document.getElementById(this.id+'PlotControlMaxLabel').innerHTML = 'Max: ';
    plotControlMax.setAttribute('id', this.id + 'PlotControlMax');
    plotControlMax.setAttribute('type', 'number');
    plotControlMax.setAttribute('step', 'any');
    plotControlWrap.appendChild(plotControlMax);

    plotScale.setAttribute('id', this.id+'PlotControlScale');
    plotControlWrap.appendChild(plotScale);

    plotScaleLin.setAttribute('id', this.id+'PlotScaleLin');
    plotScaleLin.setAttribute('value', 'lin');
    plotScale.appendChild(plotScaleLin);
    document.getElementById(this.id+'PlotScaleLin').innerHTML = 'Linear';

    plotScaleLog.setAttribute('id', this.id+'PlotScaleLog');
    plotScaleLog.setAttribute('value', 'log');
    plotScale.appendChild(plotScaleLog);
    document.getElementById(this.id+'PlotScaleLog').innerHTML = 'Log';

    ///////////////////////
    //State variables
    ///////////////////////
    this.currentView = 'Rate';
    this.currentUnit = 'Hz';

    ////////////////////////////
    //Define Channels
    ////////////////////////////
    //declare the detector cell names for this detector:
    this.channelNames = channelNames; //['DEMOCHAN00'];
    this.cells = {};

    ////////////////////////////
    //Drawing parameters
    ////////////////////////////
    this.frameLineWidth = 2;
    this.frameColor = '#999999';
    this.width = width;
    this.height = height;

    ///////////////////////////
    //Scale Parameters
    ///////////////////////////
    this.scale = 'ROOT Rainbow';
    this.min = {HV: canHas(localStorage.getItem(name+'HVmin'), 0), 
                Threshold: canHas(localStorage.getItem(name+'Thresholdmin'), 0), 
                Rate: canHas(localStorage.getItem(name+'Ratemin'), 0)
            };
    this.max = {HV: canHas(localStorage.getItem(name+'HVmax'), 3000), 
                Threshold: canHas(localStorage.getItem(name+'Thresholdmax'), 1000),
                Rate: canHas(localStorage.getItem(name+'Ratemax'), 10000)
            };
    this.scaleType = {  HV: canHas(localStorage.getItem(name+'HVscaleType'), 'lin'),
                        Threshold: canHas(localStorage.getItem(name+'ThresholdscaleType'), 'lin'), 
                        Rate: canHas(localStorage.getItem(name+'RatescaleType'), 'lin')
                    };

    //if anything was in local storage, communicate this to the UI:
    plotControlMin.value = this.min[this.currentView];
    plotControlMax.value = this.max[this.currentView];
    plotScale.value = this.scaleType[this.currentView];

    ///////////////////////////
    //Tooltip state
    ///////////////////////////
    this.lastTTindex = -1;

    ////////////////////////////
    //Kinetic.js setup
    ////////////////////////////
    //point kinetic at the div and set up the staging and layers:
    this.stage = new Kinetic.Stage({
        container: this.id+'Draw',
        width: width,
        height: height
    });
    this.mainLayer = new Kinetic.Layer();       //main rendering layer
    this.tooltipLayer = new Kinetic.Layer();    //layer for tooltip info

    //tooltip background:
    this.TTbkg = new Kinetic.Rect({
        x:60,
        y:0,
        width:100,
        height:100,
        fill:'rgba(0,0,0,0.8)',
        stroke: 'rgba(0,0,0,0)',
        listening: false
    });
    this.tooltipLayer.add(this.TTbkg);

    //tooltip text:
    this.text = new Kinetic.Text({
        x: 70,
        y: 10,
        fontFamily: 'Arial',
        fontSize: 16,
        text: '',
        lineHeight: 1.2,
        fill: '#EEEEEE',
        listening: false
    });
    this.tooltipLayer.add(this.text);

    this.errorPattern = new Image();
    this.errorPattern.src = 'static.gif'

    //append data location information to list of URLs to fetch from:
    if(!window.fetchURL)
        window.fetchURL = [];
    for(i=0; i<URL.length; i++){
        if(URL[i] && window.fetchURL.indexOf(URL[i]) == -1){
            window.fetchURL[window.fetchURL.length] = URL[i];
        }
    }
    
    //let repopulate know that the status bar would like to be updated every loop:
    if(!window.refreshTargets)
        window.refreshTargets = [];
    window.refreshTargets[window.refreshTargets.length] = this;

}

//stick the ODB equipment directory into its local slot:
function fetchODBEquipment(returnObj){
    if(!window.currentData.ODB)
        window.currentData.ODB = {};
    window.currentData.ODB.Equipment = returnObj;
}

//callback for fetching from the scalar service:
function parseRate(data){
    var key, subkey;

    if(!window.currentData.rate)
        window.currentData.rate = {};

    for(key in data){
        if (data.hasOwnProperty(key)) {
            for(subkey in data[key]){
                if(data[key].hasOwnProperty(subkey)){
                    window.currentData.rate[subkey.toUpperCase().slice(0,10)] = data[key][subkey].TRIGREQ;
                }
            }
        }
    }
}

//similar function for the threshold service:
function parseThreshold(data){
    var key;
    if(!window.currentData.threshold)
        window.currentData.threshold = {};

    if(data['parameters']['thresholds']){
        for(key in data['parameters']['thresholds']){
            window.currentData.threshold[key.toUpperCase().slice(0,10)] = data['parameters']['thresholds'][key];
        }        
    }    
}

//function to make a reasonable decision on how many decimal places to show, whether to to use 
//sci. notation on an axis tick mark, where <min> and <max> are the axis minimum and maximum,
//<nTicks> is the number of tickmarks on the axis, and we are returning the label for the <n>th
//tick mark
function generateTickLabel(min, max, nTicks, n){
    var range = max - min,
        smallestPrecision = range / (nTicks-1),
        tickValue = min + (max-min)/(nTicks-1)*n;

    //tickmark needs to be labeled to enough precision to show the difference between subsequent ticks:
    smallestPrecision = Math.floor(Math.log(smallestPrecision) / Math.log(10));


    if(smallestPrecision < 0)
        return tickValue.toFixed(-smallestPrecision)

    tickValue = Math.floor(tickValue/Math.pow(10, smallestPrecision)) * Math.pow(10, smallestPrecision);
    return tickValue+'';

}