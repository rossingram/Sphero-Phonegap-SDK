/*globals mySphero, Hammer */
$(function(){

  var Drive = window.Drive = function(){

    this.red   = $('#red');
    this.green = $('#green');
    this.blue  = $('#blue');

    this.init();

    this.roll();

    this.aim();

    this.controlPanel();

    this.colors();

  };

  Drive.prototype.init = function(){

    var _this = this;

    mySphero.setupRobot(

      ["sphero"],

      function( result ){
        $('#notice').text('Sphero Connected').addClass('ui-hidden');
        _this.setColor();
      },

      function(error){
        $('#notice').text('Error connecting to Sphero').addClass('ui-hidden');
      }

    );

    // Prevent scrolling when touching the main container
    $('#main').bind('touchmove', function(e){
      e.preventDefault();
    });

  };

  // Joystick Controls
  Drive.prototype.roll = function(){

    var elem = $('#controller');
    var controller = new Hammer( elem[0] );

    var x, y, heading, speed;

    controller.ondragstart = function( e ){
      // console.log('drag started');
      speed = ( $('#speed').val() / 10 ) + "";
    };

    controller.ondrag = function( e ){

      x = e.position.x;
      y = e.position.y;

      elem.css({ top: y +'px', left: x +'px' });

      heading = Math.atan2( y, x ) * 180 / Math.PI;
      heading = ( heading < 0 ? heading + 360: heading );

      // console.log( "h: "+ heading +" x: "+ x +" y: "+ y  );
      //var velocity = Math.sqrt( x * x + y * y  )+"";

      mySphero.roll([ heading + "", speed || "0.6" ]);

    };

    controller.ondragend = function( e ){
      // console.log('drag end');

      elem.css({ top: 0, left: 0 });
      mySphero.roll([ heading +"", "0"]);
    };

  };

  // Control Panel fly-in
  Drive.prototype.controlPanel = function(){

    var toggle = new Hammer( $('.toggle-controls')[0] );

    var controls = $('.controls');

    toggle.ontap = function( e ){
      controls.css({ left: ( controls.css('left') == '0px' ? '-320px' : 0 ) });
    };

    var sleep = new Hammer( $('.sleep')[0] );

    sleep.ontap = function( e ){
      mySphero.sleep(['sphero']);
    };

  };

  Drive.prototype.setColor = function(){
    mySphero.rgb([
      ( this.red.val() / 255 )   + "",
      ( this.green.val() / 255 ) + "",
      ( this.blue.val() / 255 )  + ""
    ]);

    $('#sphero').css({ background: 'rgb('+ this.red.val() +','+ this.green.val() +','+ this.blue.val() +')' });
  };

  // Color Control
  Drive.prototype.colors = function(){

    var sphero = $('#sphero');
    var _this = this;

    $('.color-control').on('change', 'input', function(){
      _this.setColor();
    });

  };

  // Multi-touch Aiming
  Drive.prototype.aim = function(){

    var _this = this;

    var aim = new Hammer( $('#main')[0] );

    var left = $('#aim-l');
    var right = $('#aim-r');

    var scale;

    aim.ontransformstart = function( e ){
      // console.log('transform start');
      $('body').addClass('aim');
      mySphero.backLED(['0.9']);
      mySphero.rgb([ "0.0", "0.0", "0.0" ]);

      scale = e.scale;
    };

    aim.ontransform = function( e ){
      var pos = e.touches;

      left.css({ top: pos[0].y +'px', left: pos[0].x +'px' });
      right.css({ top: pos[1].y +'px', left: pos[1].x +'px' });

      var heading = ( e.scale >= scale ? 20 * e.scale : - ( 20 * e.scale ) );
      heading = ( heading < 0 ? heading + 360: heading );

      mySphero.calibrate(["0.0"]);
      mySphero.roll([ heading + "", "0.1"]);

      // console.log( heading );
    };

    aim.ontransformend = function( e ){
      $('body').removeClass('aim');
      mySphero.backLED(['0.0']);
      _this.setColor();
    };

  };

});
