/**
* Pointer Filter Plugin
* @module Kiwi
* @submodule Plugins
* @namespace Kiwi.Plugins
* @class PointerFilter
*/
Kiwi.Plugins.PointerFilter = {
	/**
	* The name of this plugin.
	* @property name
	* @type String
	* @default "PointerFilter"
	* @public
	*/
	name:"PointerFilter",

	/**
	* The version of this plugin.
	* @property version
	* @type String
	* @default "0.1.0"
	* @public
	*/
	version:"0.1.0"
};

/**
* Registers this plugin with the Global Kiwi Plugins Manager if it is avaiable.
* 
*/
Kiwi.PluginManager.register( Kiwi.Plugins.PointerFilter );

/**
* This create method is executed when Kiwi Game that has been told
* to use this plugin reaches the boot stage of the game loop.
* @method create
* @param game{Kiwi.Game} The game that is current in the boot stage.
* @private 
*/
Kiwi.Plugins.PointerFilter.create = function(game) {
	console.log( "Pointer Filter plugin created in game", game.name );
};


/**
* @module Kiwi.Plugins
* @namespace Kiwi.Plugins.PointerFilter
*/


/**
* This object allows you to filter pointer behaviour as it happens.
* <br><br>
* You must pass this function a pointer. If you are using a mouse, you can
*	access this at "game.input.pointers[ 10 ]"
*	(where "game" is your game object). If you are using a touch
*	device, you can access 10 fingers from "game.input.pointers[ 0...9 ]".
* <br><br>
* To activate or deactivate any filter, set its flag to true or false.
*	Available filter flags are "filterMove", "filterStart", "filterStop", and
*	"filterWheel".
* <br><br>
* Each filter calls a specific method before activating the default behaviour.
*	These methods are empty by default.
*	Override "onMove" to filter any movement events.
*	Override "onStart" and "onStop" to filter any press/unpress events.
*	Override "onWheel" to filter mouse wheel activity.
*	These functions execute in the scope of the Pointer object.
* <br><br>
* All filter methods have access to an argument called "event".
*	This contains a copy of all the mouse event data.
*	It also contains "x" and "y" values which alias seamlessly
*	to the mouse event data, but exist in game space.
* <br><br>
* Note that "onDown" and "onUp" events will fire whenever the mouse button is
*	pressed or released, regardless of filters. Please consult the Kiwi.js
*	API on the topic of Signals to see how you can prioritise, interrupt,
*	or simulate these events.
*
* @class PointerFilter
* @constructor
* @param pointer {Kiwi.Input.Pointer} Pointer to filter
* @return Kiwi.Plugins.PointerFilter.PointerFilter
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter = function( pointer ) {
	/**
	* Pointer to filter
	* @property pointer
	* @type {Kiwi.Input.Pointer}
	* @public
	* @since 0.1.0
	*/
	this.pointer = pointer;

	this._init();

	return this;
};


/**
* Whether the pointer.move method should be filtered
* @property filterMove
* @type Boolean
* @default false
* @public
* @since 0.1.0
*/
Object.defineProperty( Kiwi.Plugins.PointerFilter.PointerFilter.prototype,
		"filterMove", {
	get: function() {
		return this._filterMove;
	},
	set: function( value ) {
		if ( value ) {
			this._enableFilterMove();
		} else {
			this._disableFilterMove();
		}
		this._filterMove = value;
	}
} );


/**
* Whether the pointer.start method should be filtered
* @property filterStart
* @type Boolean
* @default false
* @public
* @since 0.1.0
*/
Object.defineProperty( Kiwi.Plugins.PointerFilter.PointerFilter.prototype,
		"filterStart", {
	get: function() {
		return this._filterStart;
	},
	set: function( value ) {
		if ( value ) {
			this._enableFilterStart();
		} else {
			this._disableFilterStart();
		}
		this._filterStart = value;
	}
} );


/**
* Whether the pointer.stop method should be filtered
* @property filterStop
* @type Boolean
* @default false
* @public
* @since 0.1.0
*/
Object.defineProperty( Kiwi.Plugins.PointerFilter.PointerFilter.prototype,
		"filterStop", {
	get: function() {
		return this._filterStop;
	},
	set: function( value ) {
		if ( value ) {
			this._enableFilterStop();
		} else {
			this._disableFilterStop();
		}
		this._filterStop = value;
	}
} );


/**
* Whether the pointer.wheel method should be filtered
* @property filterWheel
* @type Boolean
* @default false
* @public
* @since 0.1.0
*/
Object.defineProperty( Kiwi.Plugins.PointerFilter.PointerFilter.prototype,
		"filterWheel", {
	get: function() {
		return this._filterWheel;
	},
	set: function( value ) {
		if ( value ) {
			this._enableFilterWheel();
		} else {
			this._disableFilterWheel();
		}
		this._filterWheel = value;
	}
} );



/**
* Set internal properties
* @method _init
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._init = function() {

	// Methods to override
	// Pointer:
	//	start
	//	stop
	//	move
	// Mouse:
	//	start (super)
	//	stop (super)
	//	wheel

	/**
	* Whether the pointer.move method should be filtered
	* @property _filterMove
	* @type Boolean
	* @default false
	* @private
	* @since 0.1.0
	*/
	this._filterMove = false;

	/**
	* Whether the pointer.start method should be filtered
	* @property _filterStart
	* @type Boolean
	* @default false
	* @private
	* @since 0.1.0
	*/
	this._filterStart = false;

	/**
	* Whether the pointer.stop method should be filtered
	* @property _filterStop
	* @type Boolean
	* @default false
	* @private
	* @since 0.1.0
	*/
	this._filterStop = false;

	/**
	* Whether the pointer.wheel method should be filtered
	* @property _filterWheel
	* @type Boolean
	* @default false
	* @private
	* @since 0.1.0
	*/
	this._filterWheel = false;

	/**
	* The original function of pointer.move
	* @method _defaultMove
	* @private
	* @since 0.1.0
	*/
	this._defaultMove = function(){};

	/**
	* The original function of pointer.start
	* @method _defaultStart
	* @private
	* @since 0.1.0
	*/
	this._defaultStart = function(){};

	/**
	* The original function of pointer.stop
	* @method _defaultStop
	* @private
	* @since 0.1.0
	*/
	this._defaultStop = function(){};

	/**
	* The original function of pointer.wheel
	* @method _defaultWheel
	* @private
	* @since 0.1.0
	*/
	this._defaultWheel = function(){};

	/**
	* User-defined filter for pointer.move. Override this with your code.
	*	When filterMove is true, this filter will execute
	*	directly before pointer.move, allowing you to edit
	*	the pointer event.
	* <br><br>
	* The event has the extra properties "x" and "y", which correspond
	*	to the game area.
	* @method onMove
	* @param event {Event} User-editable event
	* @public
	* @since 0.1.0
	*/
	this.onMove = function(){};

	/**
	* User-defined filter for pointer.start. Override this with your code.
	*	When filterStart is true, this filter will execute
	*	directly before pointer.start, allowing you to edit
	*	the pointer event.
	* <br><br>
	* The event has the extra properties "x" and "y", which correspond
	*	to the game area.
	* @method onStart
	* @param event {Event} User-editable event
	* @public
	* @since 0.1.0
	*/
	this.onStart = function(){};

	/**
	* User-defined filter for pointer.stop. Override this with your code.
	*	When filterStop is true, this filter will execute
	*	directly before pointer.stop, allowing you to edit
	*	the pointer event.
	* <br><br>
	* The event has the extra properties "x" and "y", which correspond
	*	to the game area.
	* @method onStop
	* @param event {Event} User-editable event
	* @public
	* @since 0.1.0
	*/
	this.onStop = function(){};

	/**
	* User-defined filter for pointer.wheel. Override this with your code.
	*	When filterWheel is true, this filter will execute
	*	directly before pointer.wheel, allowing you to edit
	*	the pointer event.
	* <br><br>
	* The event has the extra properties "x" and "y", which correspond
	*	to the game area.
	* <br><br>
	* Note that touch pointers do not process wheel events, as fingers do not
	*	have wheels.
	* @method onWheel
	* @param event {Event} User-editable event
	* @public
	* @since 0.1.0
	*/
	this.onWheel = function(){};
};


/**
* Creates an interception method
* @method createIntercept
* @param userFunction {Function} User-defined filter function
*	which takes a writable event as its parameter
* @param defaultFunction {Function} The default pointer method
*	which is called after the filter
* @public
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype.createIntercept =
		function( userFunction, defaultFunction ) {
	var cloneEvent = this.cloneEvent.bind( this.pointer ),
		intercept = (function( realEvent ) {
			// Create synthetic event
			var event = cloneEvent( realEvent );

			// Run user function
			userFunction( event );

			// Call super
			defaultFunction( event );
		}).bind( this.pointer );
	return intercept;
};


/**
* Copies all properties of an event into a malleable object.
*	This also provides convenient access to "x" and "y" coordinates
*	in game space. If the xy coordinates on the event are altered,
*	they will automatically be applied to the mouse coordinates.
* @method cloneEvent
* @param realEvent {Event} A pointer event
* @return Object
* @public
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype.cloneEvent =
		function( realEvent ) {
	var key,
		event = {},
		pointer = this;

	for ( key in realEvent ) {
		event[ key ] = realEvent[ key ];
	}

	// Rebind preventDefault to run in the correct context
	event.preventDefault = function() {
		realEvent.preventDefault();
	};

	// Create getters/setters for virtual x and y
	Object.defineProperty( event, "x", {
		get: function() {
			return (this.pageX - pointer.game.stage.offset.x) *
				pointer.game.stage.scaleX;
		},
		set: function( value ) {
			this.pageX = value / pointer.game.stage.scaleX +
				pointer.game.stage.offset.x;
		}
	} );

	Object.defineProperty( event, "y", {
		get: function() {
			return (this.pageY - pointer.game.stage.offset.y) *
				pointer.game.stage.scaleY;
		},
		set: function( value ) {
			this.pageY = value / pointer.game.stage.scaleY +
				pointer.game.stage.offset.y;
		}
	} );

	return event;
};


/**
* Returns the type of object that this is.
* @method objType
* @return {string}
* @public
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype.objType = function() {
	return "PointerFilter";
};


/**
* Enables filtering on pointer.move
* @method _enableFilterMove
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._enableFilterMove =
		function() {
	if ( !this._filterMove ) {
		this._defaultMove = this.pointer.move;
		this.pointer.move = this.createIntercept(
			this.onMove.bind( this.pointer ),
			this._defaultMove.bind( this.pointer ) );
		this._filterMove = true;
	}
};


/**
* Enables filtering on pointer.start
* @method _enableFilterStart
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._enableFilterStart =
		function() {
	if ( !this._filterStart ) {
		this._defaultStart = this.pointer.start;
		this.pointer.start = this.createIntercept(
			this.onStart.bind( this.pointer ),
			this._defaultStart.bind( this.pointer ) );
		this._filterStart = true;
	}
};


/**
* Enables filtering on pointer.stop
* @method _enableFilterStop
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._enableFilterStop =
		function() {
	if ( !this._filterStop ) {
		this._defaultStop = this.pointer.stop;
		this.pointer.stop = this.createIntercept(
			this.onStop.bind( this.pointer ),
			this._defaultStop.bind( this.pointer ) );
		this._filterStop = true;
	}
};


/**
* Enables filtering on pointer.wheel
* @method _enableFilterWheel
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._enableFilterWheel =
		function() {
	if ( !this._filterWheel ) {
		this._defaultWheel = this.pointer.wheel;
		this.pointer.wheel = this.createIntercept(
			this.onWheel.bind( this.pointer ),
			this._defaultWheel.bind( this.pointer ) );
		this._filterWheel = true;
	}
};


/**
* Disables filtering on pointer.move
* @method _disableFilterMove
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._disableFilterMove =
		function() {
	if ( this._filterMove ) {
		this.pointer.move = this._defaultMove.bind( this.pointer );
		this._filterMove = false;
	}
};


/**
* Disables filtering on pointer.start
* @method _disableFilterStart
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._disableFilterStart =
		function() {
	if ( this._filterStart ) {
		this.pointer.start = this._defaultStart.bind( this.pointer );
		this._filterStart = false;
	}
};


/**
* Disables filtering on pointer.stop
* @method _disableFilterStop
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._disableFilterStop =
		function() {
	if ( this._filterStop ) {
		this.pointer.stop = this._defaultStop.bind( this.pointer );
		this._filterStop = false;
	}
};


/**
* Disables filtering on pointer.wheel
* @method _disableFilterWheel
* @private
* @since 0.1.0
*/
Kiwi.Plugins.PointerFilter.PointerFilter.prototype._disableFilterWheel =
		function() {
	if ( this._filterWheel ) {
		this.pointer.wheel = this._defaultWheel.bind( this.pointer );
		this._filterWheel = false;
	}
};
