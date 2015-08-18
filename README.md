# RootClass
This is a utility class that makes creating class structures with extension easy.
Class supports module registration in node, amd and lack of either attaches to the window.

```
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
```
