/**
 * This is a utility class that makes creating class structures with extension easy.
 * Class supports module registration in node, amd and lack of either
 * See example implementation below
 */
(function(){
	// Create local var for this
	var window		= this;
	// Setup the constructor and call initialize
	var RootClass	= function () {
		this.initialize.apply(this, arguments);
	};
	function extend(source, additional){
		if (source && additional) {
			for (var propName in additional) source[propName] = additional[propName];
		}
	}
	// Add extended calls
	extend(RootClass.prototype, {
		initialize : function() {},

		callSuper : function(superClass, methodName, methodArgs){
			return superClass.prototype[methodName].apply(this, methodArgs);
		}
	});
	// Setup extension prototype manipulation
	RootClass.extend = function(instanceProps, staticProps) {
		var parent	= this;
		var child;
		if (instanceProps && instanceProps.hasOwnProperty("constructor")) {
			child	= instanceProps.constructor;
		} else {
			child	= function(){ parent.apply(this, arguments); };
		}
		extend(child, parent);
		extend(child, staticProps);
		var Surrogate		= function(){ this.constructor = child; };
		Surrogate.prototype	= parent.prototype;
		child.prototype		= new Surrogate;

		if (instanceProps) extend(child.prototype, instanceProps);
		child.__super__		= parent.prototype;
		return child;
	};

	// Node module definition
	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = RootClass;
	}
	// AMD module definition
	else if (typeof define === "function" && define.amd){
		define(function () { return RootClass; } );
	}
	// Standard window definition
	else if (typeof window === "object" && typeof window.document === "object") {
		window.RootClass = RootClass;
	}
}).call(this);


/*
// Example Implementation
// ----------------------

// Extend the RootClass to create a new class
var Fruit = RootClass.extend(
	// These are all the instance methods and properties for this class.
	{
		// Its important to NEVER initialize properties upfront as they will then be
		// shared between all instances, rather initialize in the initialize method
		name: null,
		isRipe: false,

		// This method is called once when a new instance of the class is created
		// All arguments passed to the instance creation are passed to this method
		// Used as a type of constructor
		initialize: function(isRipe){
			this.name = "general fruit";
			if (isRipe) this.isRipe = isRipe;
		},

		// By convention methods and properties starting with an underscore are private
		_clickListener : function(){
		}
	},
	// These are all the static methods and properties for this class.
	{
		// Random static method that creates a new instance of itself
		createInstance: function(){
			return new Fruit();
		}
	}
);

// Basic instance creation example
new Fruit();

// Instance with arguments, true is passed to the initialize method
new Fruit(true);

// Static method implementation creates a new instance
Fruit.createInstance();

// Extend the fruit class
var Apple = Fruit.extend(
	{
		initialize: function(isRipe){
			// Call utility method that calls the super method of initialize
			// This will set the name and isRipe
			this.callSuper(Fruit, "initialize", arguments);

			// Alternatively you can call it manually
			Fruit.prototype.initialize.apply(Fruit, arguments);

			// Now re set the name to relate to this class
			this.name = "Apple";
		}
	},
	{
		// You can also override static methods
		createInstance : function(){
			return new Apple();
		}
	}
);
*/
